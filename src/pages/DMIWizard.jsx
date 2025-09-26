import React, { useMemo, useEffect } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { STEPS } from "../config/dmiSchema";
import StepLayout from "../components/dmi/StepLayout";
import { OrgFields } from "../components/dmi/OrgFields";
import { LikertBlock } from "../components/dmi/LikertBlock";

// Zod schema for organization step validation
const orgSchema = z.object({
  country: z.string().min(1, "Country is required"),
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
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

  const { handleSubmit, watch } = methods;
  useEffect(()=>{ saveDraftLocal(step, watch()); }, [step, watch]);

  const onNext = handleSubmit((data) => {
    console.log('Form submitted successfully:', data);
    const i = STEPS.findIndex(s => s.id === step);
    const next = STEPS[i+1];
    if (next) {
      navigate(`/dmi/${next.id}`);
    } else {
      // Calculate final score and navigate to results
      const totalScore = calculateFinalScore();
      navigate('/dmi/result', { state: { score: totalScore } });
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
    const maxPoints = responses.length * 5;
    
    // Convert to 0-100 scale
    return Math.round((totalPoints / maxPoints) * 100);
  };

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
      >
        {cfg?.type === "form"   && <OrgFields fields={cfg.fields} />}
        {cfg?.type === "likert" && <LikertBlock questions={cfg.questions} />}
      </StepLayout>
    </FormProvider>
  );
}
