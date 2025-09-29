import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import CustomSelect from "./CustomSelect";
import AutoComplete from "./AutoComplete";

const EMOJIS5 = ["🤔","😕","😐","🙂","🥳"]; // 1..5

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria","Azerbaijan",
  "Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia",
  "Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada",
  "Cape Verde","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Cote d'Ivoire",
  "Croatia","Cuba","Cyprus","Czechia","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt",
  "El Salvador","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia",
  "Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras",
  "Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica",
  "Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon",
  "Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives",
  "Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia",
  "Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua",
  "Niger","Nigeria","North Macedonia","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay",
  "Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia",
  "Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore",
  "Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan",
  "Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tonga",
  "Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States",
  "Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
];

export function OrgFields({ fields }){
  const { register, control } = useFormContext();

  // Split into the two columns and the two likert rows
  const baseFields = fields.slice(0, 5);
  const likertRows = fields.slice(5);

  return (
    <>
      {/* Country list for autocomplete (simple list) */}
      {/* Keep in component scope to avoid new file overhead */}
      {/* A compact list; expand as needed */}
      {null}
      {/* 2-column grid for the first 5 fields */}
      <ol className="grid2 numbered">
        {baseFields.map((f, i)=>(
          <li key={f.id} className="field">
            <span className="label">{f.label}</span>

            {f.type === "text" && f.id !== "country" && (
              <input {...register(f.id)} className="input-underline" placeholder="Type your text here…" />
            )}

            {f.type === "text" && f.id === "country" && (
              <Controller
                name={f.id}
                control={control}
                render={({ field }) => (
                  <AutoComplete
                    value={field.value || ""}
                    onChange={field.onChange}
                    options={COUNTRIES}
                    placeholder="Type your country…"
                  />
                )}
              />
            )}

            {f.type === "select" && f.id !== "industry" && f.id !== "companyType" && (
              <div className="select-wrap">
                <select {...register(f.id)} className="input-underline">
                  <option value="">Select an option…</option>
                  {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <span className="chev">▾</span>
              </div>
            )}

            {f.type === "select" && f.id === "companyType" && (
              <Controller
                name={f.id}
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    value={field.value || ""}
                    onChange={field.onChange}
                    options={f.options}
                    placeholder="Select company type…"
                    allowCustomWhenOther={true}
                    otherLabel="Other"
                    customPlaceholder="Type in your company type "
                  />
                )}
              />
            )}

            {f.type === "select" && f.id === "industry" && (
              <Controller
                name={f.id}
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    value={field.value || ""}
                    onChange={field.onChange}
                    options={f.options}
                    placeholder="Select an industry…"
                    allowCustomWhenOther={true}
                    otherLabel="Other"
                  />
                )}
              />
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
