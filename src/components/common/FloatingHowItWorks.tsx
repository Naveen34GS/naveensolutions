import React, { useState } from 'react';
import { 
  Info, 
  X, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle,
  Code,
  Layers,
  Cpu,
  ShieldCheck
} from 'lucide-react';

export const FloatingHowItWorks: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Animated Widget at Right-Hand Bottom (Down Side) */}
      <aside aria-label="How it works assistant" className="fixed bottom-6 right-6 z-50 flex items-center">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="animate-floating group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-semibold text-xs shadow-2xl border border-blue-400/50 transition-transform active:scale-95"
          aria-label="How it works floating guide"
        >
          {/* Glowing info badge */}
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center font-bold text-xs shadow-md">
            <Info className="w-3.5 h-3.5" />
          </div>
          <span className="tracking-wide">How It Works</span>
        </button>
      </aside>

      {/* Floating Modal / Slide-up Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
          <div 
            className="relative bg-gradient-to-b from-[#0e1e47] via-[#091433] to-[#060c20] border-2 border-blue-500/40 w-full max-w-2xl rounded-3xl shadow-[0_0_50px_rgba(37,99,235,0.35)] p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 space-y-6"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-blue-300 hover:text-white hover:bg-blue-900/40 border border-transparent hover:border-blue-500/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>NaveenSolutions Architecture Process</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                How NaveenSolutions Works
              </h2>
              <p className="text-xs sm:text-sm text-blue-200/80 mt-1 max-w-xl">
                We eliminated multi-week sales friction. Explore technical capabilities, submit your constraints, and receive an instant feasibility dossier.
              </p>
            </div>

            {/* 4 Interactive Process Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 space-y-2 hover:border-blue-400 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400 flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <span className="text-[10px] font-mono text-blue-300">Phase 1</span>
                </div>
                <h3 className="text-sm font-bold text-white">Select Capability</h3>
                <p className="text-xs text-blue-200/70 leading-relaxed">
                  Browse our modular practices: Custom Software, Cloud DevOps, AI Agents, APIs, or Mobile.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 space-y-2 hover:border-blue-400 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <span className="text-[10px] font-mono text-blue-300">Phase 2</span>
                </div>
                <h3 className="text-sm font-bold text-white">Specify Requirements</h3>
                <p className="text-xs text-blue-200/70 leading-relaxed">
                  Share target outcomes, existing database/API tools, delivery expectations, and budget in INR.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 space-y-2 hover:border-blue-400 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <span className="text-[10px] font-mono text-blue-300">Phase 3</span>
                </div>
                <h3 className="text-sm font-bold text-white">Instant Feasibility Score</h3>
                <p className="text-xs text-blue-200/70 leading-relaxed">
                  Our deterministic engine computes a 0–100 match, itemized 5-phase milestones, and cost range.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 space-y-2 hover:border-blue-400 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    04
                  </div>
                  <span className="text-[10px] font-mono text-blue-300">Phase 4</span>
                </div>
                <h3 className="text-sm font-bold text-white">Consult & Deliver</h3>
                <p className="text-xs text-blue-200/70 leading-relaxed">
                  Reserve a 45-min technical briefing with our Lead Solutions Architect or initiate sprint staging.
                </p>
              </div>

            </div>

            {/* Footer action */}
            <div className="pt-2 flex items-center justify-between border-t border-blue-900/60">
              <span className="text-[11px] text-blue-300">
                Interactive Feasibility Prototype
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
              >
                Got It
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
