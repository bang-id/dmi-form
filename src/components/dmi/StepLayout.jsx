import React from "react";
import ProgressBar from "./ProgressBar";
import { STEPS } from "../../config/dmiSchema";
import { useIframeHeight } from "../../hooks/useIframeHeight.js";

export default function StepLayout({ title, subtitle, children, onBack, onNext, isFirst, isLast, footerNote }){
  useIframeHeight();
  
  const idx = STEPS.findIndex(s => s.title === title);
  const pct = Math.max(0, (idx + 1) / STEPS.length);

  return (
    <div className="page">
      <section className="hero">
        <div className="hero__inner">
          <div className="form-header">
            <div className="form-header-content">
              <h2 className="form-h2">{title}</h2>
              <img src="/assets/bangstar.svg" alt="Bang" className="form-logo" />
            </div>
            {subtitle && <p className="form-sub">{subtitle}</p>}
          </div>

          <div className="form-content">
            <div className="form-wrap">{children}</div>
          </div>

          <div className="form-footer">
            <ProgressBar value={pct} />
            <div className="form-cta-wrap">
              {footerNote && <div className="form-feedback" role="status" aria-live="polite">{footerNote}</div>}
              <div className="form-cta">
                <button type="button" className="btn ghost" onClick={onBack} disabled={isFirst}>Back</button>
                <button type="button" className="btn primary" onClick={onNext}>{isLast ? "Finish" : "Next"}</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
