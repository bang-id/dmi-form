import React, { useMemo, useEffect } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { STEPS } from "../config/dmiSchema";
import { supabase } from "../lib/supabase";
import StepLayout from "../components/dmi/StepLayout";
import { OrgFields } from "../components/dmi/OrgFields";
import { LikertBlock } from "../components/dmi/LikertBlock";

// Zod schema for organization step validation
const orgSchema = z.object({
  country: z.string().min(1, "Country is required"),
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  workEmail: z.string()
    .min(1, "Work email is required")
    .email("Enter a valid email")
    .refine(val => !/@(gmail|yahoo|hotmail|outlook|live|icloud|aol|protonmail|pm\.me)\./i.test(val), {
      message: "Use your work email (no personal domains)",
    }),
  companyType: z.string().min(1, "Company type is required"),
  industry: z.string().min(1, "Industry is required"),
  selfDesignUnderstanding: z.number().min(1).max(5),
  companyMaturitySelf: z.number().min(1).max(5),
});

// Load draft data from localStorage
function loadDraft(step) {
  try {
    const saved = localStorage.getItem(`dmi_draft_${step}`);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

// Save draft data to localStorage
function saveDraftLocal(step, data) {
  try {
    localStorage.setItem(`dmi_draft_${step}`, JSON.stringify(data));
  } catch {
    // Silently fail if localStorage is not available
  }
}

export default function DMIWizard({ step = "org" }){
  const navigate = useNavigate();
  const cfg = useMemo(() => STEPS.find(s => s.id === step), [step]);

  const methods = useForm({
    resolver: step === "org" ? zodResolver(orgSchema) : undefined,
    mode: "onChange",
    defaultValues: loadDraft(step),
  });

  const { handleSubmit, watch, formState } = methods;
  useEffect(()=>{ saveDraftLocal(step, watch()); }, [step, watch]);

  // Debounced autosave for Org step (drafts)
  useEffect(() => {
    if (step !== 'org') return;
    let timer;
    const subscription = watch((values) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        persistDraftOrg(values).catch(() => {});
      }, 1000);
    });
    return () => {
      clearTimeout(timer);
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
      }
    };
  }, [step, watch]);

  // Reset scroll position of the internal scroll container and window on step change
  useEffect(() => {
    try {
      const scroller = document.querySelector('.form-content');
      if (scroller && typeof scroller.scrollTo === 'function') {
        scroller.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    } catch {}
    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [step]);

  const onNext = handleSubmit((data) => {
    console.log('Form submitted successfully:', data);
    const i = STEPS.findIndex(s => s.id === step);
    const next = STEPS[i+1];
    
    // If we're on the org step, persist the data immediately
    if (step === 'org') {
      persistOrgDataNow(data).finally(() => {
        // Navigate to next step after persisting
        if (next) {
          navigate(`/dmi/${next.id}`);
        }
      });
    } else if (next) {
      navigate(`/dmi/${next.id}`);
    } else {
      // Calculate final score (raw and percentage) and persist submission
      const { raw, percent } = calculateFinalScore();
      persistSubmission(raw).finally(() => {
        navigate('/dmi/result', { state: { score: percent, rawScore: raw } });
      });
    }
  }, (errors) => {
    console.log('Form validation errors:', errors);
  });

  const calculateFinalScore = () => {
    // Collect all form data from localStorage
    const allData = {};
    STEPS.forEach(stepConfig => {
      const stepData = loadDraft(stepConfig.id);
      Object.assign(allData, stepData);
    });

    // Calculate score based on all Likert responses (1-5 scale)
    const likertFields = [];
    STEPS.forEach(stepConfig => {
      if (stepConfig.type === 'likert') {
        stepConfig.questions.forEach(q => likertFields.push(q.id));
      } else if (stepConfig.fields) {
        stepConfig.fields.forEach(f => {
          if (f.type === 'likert') likertFields.push(f.id);
        });
      }
    });

    const responses = likertFields.map(field => allData[field] || 1);
    const raw = responses.reduce((sum, score) => sum + score, 0);

    // Convert to percentage where 0% = all 1s, 100% = all 5s
    const minPossible = likertFields.length * 1;
    const maxPossible = likertFields.length * 5;
    const percent = maxPossible > minPossible
      ? Math.round(((raw - minPossible) / (maxPossible - minPossible)) * 100)
      : 0;

    return { raw, percent: Math.max(0, Math.min(100, percent)) };
  };

  // Persist the entire submission + score to Supabase
  async function persistSubmission(totalScore){
    try{
      // Reconstruct all form data similar to calculateFinalScore
      const allData = {};
      STEPS.forEach(stepConfig => {
        const stepData = loadDraft(stepConfig.id);
        Object.assign(allData, stepData);
      });

      // Flatten likert answers into a compact object
      const likertAnswers = {};
      STEPS.forEach(stepConfig => {
        if (stepConfig.type === 'likert') {
          stepConfig.questions.forEach(q => { likertAnswers[q.id] = allData[q.id] ?? null; });
        } else if (stepConfig.fields) {
          stepConfig.fields.forEach(f => {
            if (f.type === 'likert') likertAnswers[f.id] = allData[f.id] ?? null;
          });
        }
      });

      const payload = {
        created_at: new Date().toISOString(),
        score: totalScore,
        org_country: allData.country ?? null,
        org_company: allData.company ?? null,
        org_role: allData.role ?? null,
        work_email: allData.workEmail ?? null,
        org_company_type: allData.companyType ?? null,
        org_industry: allData.industry ?? null,
        self_design_understanding: allData.selfDesignUnderstanding ?? null,
        company_maturity_self: allData.companyMaturitySelf ?? null,
        answers: likertAnswers,
        session_id: (typeof localStorage !== 'undefined' && localStorage.getItem('dmi_session_id')) || null,
        is_draft: false,
      };

      const { error } = await supabase
        .from('dmi_responses')
        .upsert(payload, { onConflict: 'session_id' });

      if (error) {
        console.warn('[Supabase] insert failed', error);
      }
    }catch(err){
      console.warn('[Supabase] unexpected error', err);
    }
  }

  // Persist org data immediately when user clicks Next (not a draft)
  async function persistOrgDataNow(data) {
    try {
      const sessionId = (typeof localStorage !== 'undefined' && localStorage.getItem('dmi_session_id')) || null;
      
      const payload = {
        created_at: new Date().toISOString(),
        session_id: sessionId,
        is_draft: false, // This is a committed submission
        org_country: data.country ?? null,
        org_company: data.company ?? null,
        org_role: data.role ?? null,
        work_email: data.workEmail ?? null,
        org_company_type: data.companyType ?? null,
        org_industry: data.industry ?? null,
        self_design_understanding: data.selfDesignUnderstanding ?? null,
        company_maturity_self: data.companyMaturitySelf ?? null,
        answers: {
          selfDesignUnderstanding: data.selfDesignUnderstanding ?? null,
          companyMaturitySelf: data.companyMaturitySelf ?? null,
        },
      };

      const { error } = await supabase
        .from('dmi_responses')
        .upsert(payload, { onConflict: 'session_id' });

      if (error) {
        console.warn('[Supabase] persist org data failed', error);
      } else {
        console.log('[Supabase] Org data persisted successfully');
      }
    } catch (err) {
      console.warn('[Supabase] unexpected error persisting org data', err);
    }
  }

  // Persist draft for Org step only
  async function persistDraftOrg(values){
    try {
      const sessionId = (typeof localStorage !== 'undefined' && localStorage.getItem('dmi_session_id')) || null;
      if (!sessionId) return;
      const payload = {
        created_at: new Date().toISOString(),
        session_id: sessionId,
        is_draft: true,
        org_country: values.country ?? null,
        org_company: values.company ?? null,
        org_role: values.role ?? null,
        work_email: values.workEmail ?? null,
        org_company_type: values.companyType ?? null,
        org_industry: values.industry ?? null,
        self_design_understanding: values.selfDesignUnderstanding ?? null,
        company_maturity_self: values.companyMaturitySelf ?? null,
        answers: {
          selfDesignUnderstanding: values.selfDesignUnderstanding ?? null,
          companyMaturitySelf: values.companyMaturitySelf ?? null,
        },
      };
      const { error } = await supabase
        .from('dmi_responses')
        .upsert(payload, { onConflict: 'session_id' });
      if (error) {
        console.warn('[Supabase] upsert draft failed', error);
      }
    } catch (err) {
      console.warn('[Supabase] unexpected error', err);
    }
  }

  const onBack = () => {
    const i = STEPS.findIndex(s=>s.id===step);
    const prev = STEPS[i-1];
    if(prev) {
      navigate(`/dmi/${prev.id}`);
    } else {
      navigate('/');
    }
  };

  return (
    <FormProvider {...methods}>
      <StepLayout
        title={cfg?.title ?? "DMI"}
        subtitle={cfg?.subtitle}
        onBack={onBack}
        onNext={onNext}
        isFirst={STEPS[0].id===step}
        isLast={STEPS.at(-1).id===step}
        footerNote={
          step === 'org' && formState.isSubmitted && !formState.isValid
            ? 'Please answer all questions to continue.'
            : undefined
        }
      >
        {cfg?.type === "form"   && <OrgFields fields={cfg.fields} />}
        {cfg?.type === "likert" && <LikertBlock questions={cfg.questions} />}
      </StepLayout>
    </FormProvider>
  );
}
