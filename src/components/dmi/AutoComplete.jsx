import React from "react";

export default function AutoComplete({ value = "", onChange, options = [], placeholder = "Type to search…" }){
  const ref = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function onDoc(e){ if(!ref.current) return; if(!ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', onDoc);
    return ()=> document.removeEventListener('mousedown', onDoc);
  },[]);

  const q = (value || "").trim();
  const filtered = q
    ? options.filter(o => o.toLowerCase().includes(q.toLowerCase())).slice(0, 50)
    : options.slice(0, 50);

  return (
    <div ref={ref} className={`autocomplete ${open ? 'open' : ''}`}>
      <div className="ac-control input-underline">
        <input
          className="ac-input"
          placeholder={placeholder}
          value={value || ""}
          onChange={(e)=> { onChange(e.target.value); setOpen(true); }}
          onFocus={()=> setOpen(true)}
        />
        <span className="chev">▾</span>
      </div>

      {open && filtered.length > 0 && (
        <div className="cs-panel">
          <ul className="cs-list" role="listbox">
            {filtered.map(opt => (
              <li key={opt} className="cs-item" onClick={()=> { onChange(opt); setOpen(false); }}>
                {opt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


