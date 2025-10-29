import React from "react";

const TEXTS = [
  "You’ve come too far to ghost this survey.",
  "Your competitors are probably 3 questions ahead.",
  "Finish before your CEO asks about your design maturity.",
  "Every click takes you one step closer to outperforming your rivals.",
  "This is the part where heroes don’t quit.",
];

export default function ExitIntentModal({ open, onContinue, onSaveQuit }) {
  const [idx] = React.useState(() => Math.floor(Math.random() * TEXTS.length));

  if (!open) return null;
  return (
    <div className="dmi-exit-modal-bk">
      <div className="dmi-exit-modal">
        <div className="dmi-exit-head">
          <svg className="dmi-exit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 60" fill="none" aria-hidden="true" focusable="false">
            <circle cx="18.8847" cy="9.81978" r="9.81978" fill="black"/>
            <circle cx="55.4414" cy="9.81978" r="9.81978" fill="black"/>
            <path d="M4.51709 55.3132C4.51709 55.3132 13.8158 34.6924 37.1631 34.6924C60.5103 34.6924 69.809 55.3132 69.809 55.3132" stroke="black" strokeWidth="9.03184" strokeLinecap="round"/>
          </svg>
          <div className="dmi-exit-message">{TEXTS[idx]}</div>
        </div>
        <div className="dmi-exit-btns">
            <button className="btn ghost" onClick={onSaveQuit}>Save and Quit</button>
            <button className="btn primary" onClick={onContinue}>Keep Going</button>
        </div>
      </div>
    </div>
  );
}
