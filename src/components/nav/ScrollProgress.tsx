import { useEffect, useState } from 'react';
import { motion, reduced } from '../../lib/motion';

/** Thin top progress bar driven by document scroll. */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? el.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (reduced) {
    return (
      <div className="scroll-progress" aria-hidden="true">
        <div className="scroll-progress-bar" style={{ transform: `scaleX(${progress})` }} />
      </div>
    );
  }

  return (
    <div className="scroll-progress" aria-hidden="true">
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX: progress, transformOrigin: '0% 50%' }}
      />
    </div>
  );
}
