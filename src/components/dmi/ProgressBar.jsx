import React from "react";
import { useNavigate } from "react-router-dom";
import { STEPS } from "../../config/dmiSchema";

export default function ProgressBar({ value = 0 }){
  const navigate = useNavigate();
  const pct = Math.min(100, Math.max(0, value * 100));
  // Discrete step colors from red -> green
  const steps = STEPS.filter(s => s.type !== 'form' || s.id === 'org');
  const palette = [
    '#ff4d4f', // red
    '#ff7a45', // reddish orange
    '#faad14', // orange/yellow
    '#fadb14', // yellow
    '#a0d911', // yellow-green
    '#73d13d', // light green
    '#52c41a', // green
  ];
  const stepIdx = Math.min(steps.length - 1, Math.max(0, Math.ceil((value * steps.length)) - 1));
  const fillColor = 'var(--color-black)';
  const total = Math.max(1, steps.length - 1);
  const targetPct = Math.min(100, Math.max(0, (stepIdx / total) * 100));
  const adjustedTargetPct = stepIdx === 0 ? Math.max(targetPct, 2) : targetPct; // ensure a small visible cap at step 1
  // Rail animation percent that we control (to stage forward/backward timing)
  const [barPct, setBarPct] = React.useState(adjustedTargetPct);
  // Delayed checkpoint fill only when moving forward; instant when moving back
  const [filledIdx, setFilledIdx] = React.useState(-1);
  const prevStepRef = React.useRef(stepIdx);
  React.useEffect(() => {
    const prev = prevStepRef.current;
    prevStepRef.current = stepIdx;
    if (stepIdx > prev) {
      // moving forward: briefly keep previous step filled, then fill current
      setFilledIdx(stepIdx - 1);
      setBarPct(adjustedTargetPct);
      const t = setTimeout(() => setFilledIdx(stepIdx), 220);
      return () => clearTimeout(t);
    } else {
      // moving backward: unfill current first, then retract the rail after delay
      setFilledIdx(stepIdx);
      const t = setTimeout(() => setBarPct(adjustedTargetPct), 220);
      return () => clearTimeout(t);
    }
  }, [stepIdx]);

  const goToStep = (index) => {
    const target = steps[index];
    if (!target) return;
    navigate(`/dmi/${target.id}`);
  };

  return (
    <div className="progress-rail" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(barPct)}>
      <div className="progress-fill" style={{ width: `${barPct}%`, background: fillColor }} />
      <ol className="progress-checkpoints">
        {steps.map((s, i) => {
          const reached = i <= filledIdx;
          // All reached checkpoints should adopt the current rail color (fillColor)
          return (
            <li
              key={s.id}
              className={`pc ${reached ? 'reached' : ''}`}
              role="button"
              tabIndex={0}
              aria-label={`Go to step ${i + 1}`}
              onClick={() => goToStep(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  goToStep(i);
                }
              }}
            >
              <span
                className="pc-dot"
                style={{
                  '--pc-color': 'var(--color-black)',
                  '--pc-fill-w': reached ? '100%' : '0%',
                  '--pc-fill-o': reached ? 1 : 0
                }}
              >
                <span className="pc-num">{i + 1}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
  