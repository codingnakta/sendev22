import { useState, useEffect, useRef } from 'react';

export function SlotReel({ allNames, winner, spinning, spinDuration, onStopped }) {
  const [display, setDisplay] = useState('?');
  const [phase, setPhase] = useState('idle');
  const timerRef = useRef(null);

  useEffect(() => {
    if (!spinning) return;

    setPhase('spinning');
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);

      if (progress >= 1) {
        setDisplay(winner);
        setPhase('stopped');
        onStopped?.();
        return;
      }

      // Fast 60ms spin → gradually slows to 500ms in final 40%
      let interval;
      if (progress < 0.6) {
        interval = 60;
      } else {
        const p = (progress - 0.6) / 0.4;
        interval = 60 + p * p * 480;
      }

      const pool = allNames.length > 1
        ? allNames.filter(n => n !== display)
        : allNames;
      setDisplay(pool[Math.floor(Math.random() * pool.length)]);
      timerRef.current = setTimeout(tick, interval);
    };

    timerRef.current = setTimeout(tick, 60);
    return () => clearTimeout(timerRef.current);
  }, [spinning]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`slot-reel ${phase}`}>
      <div className="reel-top-fade" />
      <div className="reel-name">{display}</div>
      <div className="reel-bottom-fade" />
      {phase === 'stopped' && (
        <>
          <div className="reel-winner-glow" />
          <div className="reel-stars">✦</div>
        </>
      )}
    </div>
  );
}
