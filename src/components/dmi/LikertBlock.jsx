// src/components/dmi/LikertBlock.jsx
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export function LikertBlock({ questions = [], scale = 5 }){
  const { control } = useFormContext();
  const steps = Array.from({ length: scale }, (_, i) => i + 1);
  const EMOJI = ["🤔","😟","😐","🙂","🥳"]; // left→right (1..5)

  return (
    <div className="likert-rows">
      {questions.map((q, i) => (
        <div key={q.id} className="likert-row">
          <div className="likert-label">
            <span className="row-num">{i + 1}</span>
            <span>{q.text}</span>
          </div>
          <Controller
            control={control}
            name={q.id}
            render={({ field }) => (
              <div className="likert5">
                {steps.map((val, idx) => {
                  const active = field.value === val;
                  return (
                    <button
                      key={val}
                      type="button"
                      aria-label={`${val} of ${scale}`}
                      onClick={() => field.onChange(val)}
                      className={`emoji-btn ${active ? "active" : ""}`}
                    >
                      {EMOJI[idx]}
                    </button>
                  );
                })}
              </div>
            )}
          />
        </div>
      ))}
    </div>
  );
}