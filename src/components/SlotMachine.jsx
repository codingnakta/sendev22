import { useState, useEffect } from 'react';
import { SlotReel } from './SlotReel';

export function SlotMachine({ spinning, winners, allNames, onAllStopped }) {
  const [stoppedCount, setStoppedCount] = useState(0);

  useEffect(() => {
    if (spinning) setStoppedCount(0);
  }, [spinning]);

  function handleReelStop() {
    setStoppedCount(c => {
      const next = c + 1;
      if (next >= winners.length) onAllStopped?.();
      return next;
    });
  }

  return (
    <div className="slot-machine">
      <div className="machine-frame">
        <div className="machine-lights">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="light-dot" style={{ animationDelay: `${i * 0.12}s` }} />
          ))}
        </div>
        <div className="reels-container">
          {winners.map((winner, i) => (
            <SlotReel
              key={i}
              allNames={allNames}
              winner={winner}
              spinning={spinning}
              spinDuration={2500 + i * 700}
              onStopped={handleReelStop}
            />
          ))}
        </div>
        <div className="machine-lights bottom">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="light-dot" style={{ animationDelay: `${i * 0.12 + 0.06}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
