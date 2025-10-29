import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import DMIStart from "./pages/DMIStart.jsx";
import DMIWizard from "./pages/DMIWizard.jsx";
import DMIResult from "./pages/DMIResult.jsx";
import DMIResultPreview from "./pages/DMIResultPreview.jsx";
import { useIframeHeight } from "./hooks/useIframeHeight.js";
import ExitIntentModal from "./components/dmi/ExitIntentModal";
import { STEPS } from "./config/dmiSchema";
import { supabase } from "./lib/supabase";

function HomePage() {
  useIframeHeight();
  return (
    <div className="page">
      <section className="hero hero--start">
        <div className="hero__inner">
          <img src="/assets/bang-lm.svg" alt="Bang" className="hero__logo" />
          <h1 className="hero__title">Get your DMI assessed,<br /> it only takes 2 minutes.</h1>
          <Link to="/dmi/start" className="cta-button">Start The DMI Assessment</Link>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [exitOpen, setExitOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function loadDraft(step){
    try{
      const saved = localStorage.getItem(`dmi_draft_${step}`);
      return saved ? JSON.parse(saved) : {};
    }catch{ return {}; }
  }

  async function saveAndQuit(){
    try{
      const allData = {};
      STEPS.forEach(stepCfg => {
        Object.assign(allData, loadDraft(stepCfg.id));
      });

      const likertAnswers = {};
      STEPS.forEach(stepCfg => {
        if (stepCfg.type === 'likert') {
          stepCfg.questions.forEach(q => { likertAnswers[q.id] = allData[q.id] ?? null; });
        } else if (stepCfg.fields) {
          stepCfg.fields.forEach(f => { if (f.type === 'likert') likertAnswers[f.id] = allData[f.id] ?? null; });
        }
      });

      const payload = {
        created_at: new Date().toISOString(),
        session_id: (typeof localStorage !== 'undefined' && localStorage.getItem('dmi_session_id')) || null,
        is_draft: true,
        score: 0,
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

      await supabase.from('dmi_responses').upsert(payload, { onConflict: 'session_id' });
    }catch(err){
      console.warn('[ExitIntent] saveAndQuit failed', err);
    }finally{
      setExitOpen(false);
      navigate('/');
    }
  }
  useEffect(() => {
    // Disable exit-intent on start and result/preview screens
    const disabledRoutes = ['/', '/dmi/result', '/preview-results'];
    if (disabledRoutes.includes(location.pathname)) return;
    let exited = false;
    function onMouseOut(e) {
      if (exited || exitOpen) return;
      if (!e.relatedTarget && e.clientY < 8) {
        exited = true;
        setExitOpen(true);
      }
    }
    document.addEventListener('mouseout', onMouseOut);
    return () => document.removeEventListener('mouseout', onMouseOut);
  }, [exitOpen, location.pathname]);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dmi/start" element={<DMIStart />} />
        <Route path="/dmi/org" element={<DMIWizard step="org" />} />
        <Route path="/dmi/vision" element={<DMIWizard step="vision" />} />
        <Route path="/dmi/leadership" element={<DMIWizard step="leadership" />} />
        <Route path="/dmi/people" element={<DMIWizard step="people" />} />
        <Route path="/dmi/research" element={<DMIWizard step="research" />} />
        <Route path="/dmi/ops" element={<DMIWizard step="ops" />} />
        <Route path="/dmi/innovation" element={<DMIWizard step="innovation" />} />
        <Route path="/dmi/result" element={<DMIResult />} />
        <Route path="/preview-results" element={<DMIResultPreview />} />
      </Routes>
      <Analytics />
      <ExitIntentModal
        open={exitOpen}
        onContinue={() => setExitOpen(false)}
        onSaveQuit={saveAndQuit}
      />
    </>
  );
}

export default App;
