import React from 'react';
import { X, CheckCircle, Clock, Banknote, ArrowRight, Layers } from 'lucide-react';
import { ServiceItem } from '../../types';
import { formatINR } from '../../data/pricing';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onEvaluate: (service: ServiceItem) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
  onEvaluate
}) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {service.categoryLabel}
          </span>
          <span className="text-xs text-slate-400">ID: {service.id}</span>
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">
          {service.name}
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {service.fullDescription}
        </p>

        {/* Indicative Benchmark Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-3.5 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Banknote className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Indicative Scope Range</div>
              <div className="text-sm font-semibold text-white">
                {formatINR(service.indicativeBudget.min)} – {formatINR(service.indicativeBudget.max)}
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-3.5 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Target Delivery Velocity</div>
              <div className="text-sm font-semibold text-white">
                {service.indicativeTimelineWeeks.min} – {service.indicativeTimelineWeeks.max} Weeks
              </div>
            </div>
          </div>
        </div>

        {/* Core Capabilities */}
        <div className="mb-6">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2.5">
            Technical Capabilities & Architectural Standards
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {service.capabilities.map((cap, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
            Standard Technology Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {service.techTags.map((tech) => (
              <span 
                key={tech} 
                className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-blue-300 border border-slate-700 font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Example Use Cases */}
        <div className="mb-8">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
            Representative Scenarios
          </h4>
          <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
            {service.useCases.map((uc, i) => (
              <li key={i}>{uc}</li>
            ))}
          </ul>
        </div>

        {/* Modal CTAs */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
              onEvaluate(service);
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            <span>Evaluate This Service</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
