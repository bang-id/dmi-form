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
    if (next) {
      navigate(`/dmi/${next.id}`);
    } else {
      // Calculate final score and persist submission
      const totalScore = calculateFinalScore();
      persistSubmission(totalScore).finally(() => {
        navigate('/dmi/result', { state: { score: totalScore } });
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
    const totalPoints = responses.reduce((sum, score) => sum + score, 0);
    
    // Return raw score (not converted to 0-100 scale)
    return totalPoints;
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
      };

      const { error } = await supabase
        .from('dmi_responses')
        .insert(payload);

      if (error) {
        console.warn('[Supabase] insert failed', error);
      }
    }catch(err){
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
