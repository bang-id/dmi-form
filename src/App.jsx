import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import DMIStart from "./pages/DMIStart.jsx";
import DMIWizard from "./pages/DMIWizard.jsx";
import DMIResult from "./pages/DMIResult.jsx";
import DMIResultPreview from "./pages/DMIResultPreview.jsx";
import { useIframeHeight } from "./hooks/useIframeHeight.js";

function HomePage() {
  useIframeHeight();
  
  return (
    <div className="page">
      <section className="hero hero--start">
        <div className="hero__inner">
          <img src="/assets/bang-lm.svg" alt="Bang" className="hero__logo" />
          <h1 className="hero__title">Get your DMI assessed,<br /> it only takes a few minutes.</h1>

          <Link to="/dmi/start" className="cta-button">Start The DMI Assessment</Link>


          {/**
           * Separator and fact section hidden on first screen per request.
           * Keeping markup commented out for potential future use.
           */}
          {/*
          <div className="separator"></div>

          <aside className="fact">
            <div className="fact__label">Fact:</div>
            <div className="fact__content">
              When a consumer-electronics client jumped 18 DMI points, their NPD cycle shrank from 14 months to 9. <br />
              <b>That's one extra product on the shelf every two years.</b>
            </div>
          </aside>
          */}
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
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
  );
}

export default App;
