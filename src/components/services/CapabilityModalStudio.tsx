import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Code2,
  Layout,
  Server,
  Smartphone,
  Network,
  Cloud,
  Cpu,
  Database,
  RefreshCw,
  LucideIcon,
  ArrowLeft
} from 'lucide-react';
import { ServiceItem } from '../../types';
import { formatINR } from '../../data/pricing';
import { QuickFeasibilityForm } from '../forms/QuickFeasibilityForm';

interface CapabilityModalStudioProps {
  services: ServiceItem[];
  isOpen: boolean;
  onClose: () => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  Layout,
  Server,
  Smartphone,
  Network,
  Cloud,
  Cpu,
  Database,
  CheckCircle2,
  RefreshCw
};

export const CapabilityModalStudio: React.FC<CapabilityModalStudioProps> = ({
  services,
  isOpen,
  onClose,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  // viewMode: 'cards' (horizontal scrollable card stream) or 'split' (card clicked, now showing left card + right feasibility form)
  const [viewMode, setViewMode] = useState<'cards' | 'split'>('cards');

  if (!isOpen) return null;

  const handleCardClick = (service: ServiceItem) => {
    setSelectedService(service);
    setViewMode('split');
  };

  const handleBackToCards = () => {
    setViewMode('cards');
  };

  const activeService = selectedService || services[0];
  const ActiveIcon = ICON_MAP[activeService.iconName] || Code2;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative bg-gradient-to-b from-[#0a1538] via-[#070e24] to-[#040816] border-2 border-blue-500/40 w-full max-w-6xl rounded-3xl shadow-[0_0_80px_rgba(37,99,235,0.35)] p-5 sm:p-8 animate-popup-in text-left overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header of Popup */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-blue-900/60 shrink-0">
          <div className="flex items-center gap-3">
            {viewMode === 'split' && (
              <button
                type="button"
                onClick={handleBackToCards}
                className="p-2 rounded-xl bg-blue-950/80 hover:bg-blue-900 border border-blue-500/30 text-blue-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to All Cards</span>
              </button>
            )}

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300 text-[11px] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>NaveenSolutions Capability Studio</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
                {viewMode === 'cards' 
                  ? 'Click Any Capability Card to Evaluate' 
                  : `Evaluate Feasibility: ${activeService.name}`}
              </h2>
            </div>
          </div>

          {/* Close popup button */}
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-blue-950/80 hover:bg-red-950/60 border border-blue-500/30 hover:border-red-500/40 text-blue-300 hover:text-red-300 transition-colors"
            aria-label="Close capability popup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="overflow-y-auto pr-1 flex-1">
          
          {/* VIEW 1: HORIZONTALLY SCROLLABLE CARDS (LEFT TO RIGHT, NO ARROWS, CLICK CARD DIRECTLY) */}
          {viewMode === 'cards' && (
            <div className="space-y-4 animate-popup-in">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs text-blue-300/85">
                  ← Scroll horizontally to explore all {services.length} capabilities. <strong>Click any card</strong> to analyze feasibility. →
                </span>
                <span className="text-[11px] text-orange-400 font-semibold hidden sm:inline">
                  Click card to begin
                </span>
              </div>

              {/* Horizontal Scrollable Track */}
              <div className="flex gap-5 overflow-x-auto pb-5 pt-1 px-1 snap-x snap-mandatory scroll-smooth">
                {services.map((service, index) => {
                  const Icon = ICON_MAP[service.iconName] || Code2;
                  return (
                    <div
                      key={service.id}
                      onClick={() => handleCardClick(service)}
                      className="group cursor-pointer shrink-0 w-[300px] sm:w-[350px] snap-center rounded-3xl p-6 bg-gradient-to-br from-[#0e1d44]/95 via-[#091535]/95 to-[#05091a] border-2 border-blue-500/40 hover:border-orange-500/70 shadow-xl hover:shadow-[0_0_35px_rgba(249,115,22,0.25)] transition-all duration-300 flex flex-col justify-between hover:scale-[1.02] active:scale-[0.99] select-none text-left"
                    >
                      <div className="space-y-4">
                        {/* Header icon and category */}
                        <div className="flex items-start justify-between">
                          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-orange-500/20 via-blue-500/20 to-blue-600/30 border border-blue-400/40 text-blue-300 flex items-center justify-center p-3 group-hover:scale-105 group-hover:border-orange-400/60 transition-transform">
                            <Icon className="w-6 h-6 text-blue-400 group-hover:text-orange-400 transition-colors" />
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
                            {service.categoryLabel}
                          </span>
                        </div>

                        {/* Title & Short Description */}
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                            {service.name}
                          </h3>
                          <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                            {service.shortDescription}
                          </p>
                        </div>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {service.techTags.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded-md bg-blue-950/80 border border-blue-500/30 text-blue-200 text-[11px] font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Key Capabilities Bullet Points */}
                        <div className="pt-2 border-t border-blue-900/50 space-y-1.5">
                          {service.capabilities.slice(0, 2).map((cap, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Footer with Indicative Scope and Click Indicator */}
                      <div className="mt-5 pt-3 border-t border-blue-900/60 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block">Indicative Budget</span>
                          <span className="font-bold text-white">
                            {formatINR(service.indicativeBudget.min)}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-orange-400 font-bold group-hover:translate-x-1 transition-transform">
                          <span>Click to Analyze</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW 2: SPLIT SCREEN (LEFT: SELECTED CARD, RIGHT: FEASIBILITY FORM) */}
          {viewMode === 'split' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-popup-in">
              
              {/* Left Column: Selected Capability Card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#0c183a]/90 via-[#0a132c]/95 to-[#05091a] border-2 border-blue-500/50 rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between text-left space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center p-2.5">
                        <ActiveIcon className="w-6 h-6 text-blue-400" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30">
                        {activeService.categoryLabel}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleBackToCards}
                      className="text-xs text-orange-400 hover:underline font-semibold"
                    >
                      Change Capability
                    </button>
                  </div>

                  <h3 className="text-2xl font-extrabold text-white">
                    {activeService.name}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeService.fullDescription}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-blue-900/60">
                    <h4 className="text-[11px] uppercase tracking-wider font-bold text-orange-400">
                      Standard Capabilities & Architecture:
                    </h4>
                    <div className="space-y-1.5">
                      {activeService.capabilities.map((cap, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <h4 className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1.5">
                      Core Technologies:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeService.techTags.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-blue-950/80 border border-blue-500/30 text-blue-200 text-xs font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-blue-900/60 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/20">
                    <span className="text-[10px] text-slate-400 block">Indicative Budget</span>
                    <span className="font-bold text-white text-xs sm:text-sm">
                      {formatINR(activeService.indicativeBudget.min)} – {formatINR(activeService.indicativeBudget.max)}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/20">
                    <span className="text-[10px] text-slate-400 block">Delivery Velocity</span>
                    <span className="font-bold text-white text-xs sm:text-sm">
                      {activeService.indicativeTimelineWeeks.min}–{activeService.indicativeTimelineWeeks.max} wks
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Feasibility Form */}
              <div className="lg:col-span-7">
                <QuickFeasibilityForm selectedService={activeService} />
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
