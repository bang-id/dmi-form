import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const EMOJIS5 = ["🤔","😕","😐","🙂","🥳"]; // 1..5

export function OrgFields({ fields }){
  const { register, control } = useFormContext();

  // Split into the two columns and the two likert rows
  const baseFields = fields.slice(0, 5);
  const likertRows = fields.slice(5);

  return (
    <>
      {/* 2-column grid for the first 5 fields */}
      <ol className="grid2 numbered">
        {baseFields.map((f, i)=>(
          <li key={f.id} className="field">
            <span className="label">{f.label}</span>

            {f.type === "text" && (
              <input {...register(f.id)} className="input-underline" placeholder="Type your text here…" />
            )}

            {f.type === "select" && (
              <div className="select-wrap">
                <select {...register(f.id)} className="input-underline">
                  <option value="">Select an option…</option>
                  {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <span className="chev">▾</span>
              </div>
            )}
          </li>
        ))}
      </ol>

      {/* Likert 5-emoji rows, aligned like the mock */}
      <div className="likert-rows">
        {likertRows.map((f, idx)=>(
          <div key={f.id} className="likert-row">
            <div className="likert-label">
              <span className="row-num">{5 + idx + 1}</span>
              <span className="label">{f.label}</span>
            </div>

            <Controller
              name={f.id}
              control={control}
              render={({ field })=>(
                <div className="likert5">
                  {EMOJIS5.map((e, i)=> {
                    const val = i+1;
                    const active = field.value === val;
                    return (
                      <button
                        key={val}
                        type="button"
                        aria-label={`${val} of 5`}
                        onClick={()=> field.onChange(val)}
                        className={`emoji-btn ${active ? "active" : ""}`}
                      >
                        {e}
                      </button>
                    );
                  })}
                </div>
              )}
            />
          </div>
        ))}
      </div>
    </>
  );
}
