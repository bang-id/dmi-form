import React from "react";

export default function CustomSelect({
  value,
  onChange,
  options = [],
  placeholder = "Select…",
  allowCustomWhenOther = true,
  otherLabel = "Other",
  customPlaceholder = "Type a custom value…",
}){
  const ref = React.useRef(null);
  const inputRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const isPreset = options.includes(value);
  const isCustom = value && !isPreset;
  const [customMode, setCustomMode] = React.useState(allowCustomWhenOther && isCustom);

  React.useEffect(()=>{
    setCustomMode(allowCustomWhenOther && (value ? !options.includes(value) : customMode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, options.join("|")]);

  React.useEffect(() => {
    function onDoc(e){
      if(!ref.current) return;
      if(!ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return ()=> document.removeEventListener('mousedown', onDoc);
  },[]);

  const handlePick = (opt) => {
    if (allowCustomWhenOther && opt === otherLabel) {
      setCustomMode(true);
      onChange("");
      setOpen(false);
      setTimeout(()=> inputRef.current?.focus(), 0);
      return;
    }
    setCustomMode(false);
    onChange(opt);
    setOpen(false);
  };

  const display = value || "";

  return (
    <div ref={ref} className={`custom-select ${open ? 'open' : ''}`}>
      <div className="cs-control input-underline" onClick={()=> setOpen(o=>!o)}>
        {allowCustomWhenOther && customMode ? (
          <input
            ref={inputRef}
            className="cs-inline-input"
            placeholder={customPlaceholder}
            value={value || ""}
            onChange={(e)=> onChange(e.target.value)}
            onClick={(e)=> e.stopPropagation()}
          />
        ) : (
          <span className={`cs-placeholder ${display ? 'has' : ''}`}>{display || placeholder}</span>
        )}
        <span className="chev">▾</span>
      </div>

      {open && (
        <div className="cs-panel">
          <ul className="cs-list" role="listbox">
            {options.map(opt => (
              <li
                key={opt}
                className={`cs-item ${opt===value ? 'active' : ''}`}
                role="option"
                aria-selected={opt===value}
                onClick={()=> handlePick(opt)}
              >
                {opt}
              </li>
            ))}
            {allowCustomWhenOther && !options.includes(otherLabel) && (
              <li className="cs-item" onClick={()=> handlePick(otherLabel)}>{otherLabel}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}


