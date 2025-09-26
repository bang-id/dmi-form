import React from "react";

export default function ProgressBar({ value = 0 }){
    return (
      <div className="progress-rail" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value*100)}>
        <div className="progress-fill" style={{ width: `${Math.min(100, Math.max(0, value*100))}%` }} />
      </div>
    );
  }
  