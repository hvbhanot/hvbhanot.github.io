import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="inline-flex items-center gap-2 border border-[#1f2a3f] px-4 py-1 text-[11px] font-mono tracking-[0.2em] text-[#4a5a70] mb-6">
        ERROR 404 — SIGNAL LOST
      </div>

      <h1 className="text-6xl md:text-7xl font-semibold tracking-[-0.03em]">Page not found</h1>
      
      <p className="max-w-sm mt-4 text-[#8a9ab0]">
        The requested module could not be located in the current operations manifest.
      </p>

      <div className="mt-8 flex gap-3">
        <Link to="/" className="btn btn-primary">Return to Overview</Link>
        <Link to="/contact" className="btn btn-ghost">Open Comms</Link>
      </div>

      <div className="mt-12 text-[10px] tracking-[0.15em] text-[#4a5a70]">
        HVB.SIGNAL — RESEARCH OPS TERMINAL
      </div>
    </div>
  );
}
