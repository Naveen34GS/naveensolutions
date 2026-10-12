import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  Code2,
  Clock,
  Banknote,
  Layout,
  Server,
  Smartphone,
  Network,
  Cloud,
  Cpu,
  Database,
  RefreshCw,
  LucideIcon
} from 'lucide-react';
import { ServiceItem } from '../../types';
import { formatINR } from '../../data/pricing';

interface AnimatedCardCarouselProps {
  services: ServiceItem[];
  selectedIndex: number;
  onSelectService: (service: ServiceItem, index: number) => void;
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

export const AnimatedCardCarousel: React.FC<AnimatedCardCarouselProps> = ({
  services,
  selectedIndex,
  onSelectService,
}) => {
  const currentService = services[selectedIndex] || services[0];
  const IconComponent = ICON_MAP[currentService.iconName] || Code2;

  const handlePrev = () => {
    const nextIndex = selectedIndex === 0 ? services.length - 1 : selectedIndex - 1;
    onSelectService(services[nextIndex], nextIndex);
  };

  const handleNext = () => {
    const nextIndex = selectedIndex === services.length - 1 ? 0 : selectedIndex + 1;
    onSelectService(services[nextIndex], nextIndex);
  };

  return (
    <div className="w-full flex flex-col justify-between h-full space-y-4">
      
      {/* Top Carousel Navigation Bar */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping" />
          <span className="text-xs font-semibold text-slate-300">
            Capability <span className="text-orange-400 font-bold">{selectedIndex + 1}</span> of {services.length}
          </span>
        </div>

        {/* Swipe / Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="p-2.5 rounded-xl bg-blue-950/60 hover:bg-blue-900 border border-blue-500/30 text-blue-300 hover:text-white transition-all shadow-md active:scale-95"
            aria-label="Previous capability card"
            title="Swipe Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button
            type="button"
            onClick={handleNext}
            className="p-2.5 rounded-xl bg-blue-950/60 hover:bg-blue-900 border border-blue-500/30 text-blue-300 hover:text-white transition-all shadow-md active:scale-95"
            aria-label="Next capability card"
            title="Swipe Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3D Stack / Swiper Card Surface */}
      <div className="relative group rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0c183a]/90 via-[#0a132c]/95 to-[#05091a] border-2 border-blue-500/50 shadow-[0_0_40px_rgba(37,99,235,0.25)] transition-all duration-300 text-left overflow-hidden flex flex-col justify-between flex-1">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/15 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-5">
          {/* Top category badge & icon */}
          <div className="flex items-start justify-between">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500/20 via-blue-500/20 to-blue-600/30 border border-blue-400/40 text-blue-300 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <IconComponent className="w-7 h-7 text-blue-400" />
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                {currentService.categoryLabel}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">ID: {currentService.id}</span>
            </div>
          </div>

          {/* Name & full description */}
          <div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight mb-2">
              {currentService.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentService.fullDescription}
            </p>
          </div>

          {/* Architectural Capabilities Checklist */}
          <div className="space-y-2 pt-2 border-t border-blue-900/50">
            <h4 className="text-[11px] uppercase tracking-wider font-bold text-orange-400">
              Architectural Standards:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentService.capabilities.map((cap, i) => (
                <div key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Use Cases */}
          <div className="pt-2">
            <h4 className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1.5">
              Target Enterprise Scenarios:
            </h4>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside italic">
              {currentService.useCases.slice(0, 3).map((uc, i) => (
                <li key={i} className="truncate">{uc}</li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <h4 className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2">
              Core Tech Stack:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {currentService.techTags.map(tech => (
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

        {/* Indicative Scope Footer */}
        <div className="mt-6 pt-4 border-t border-blue-900/60 grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/20">
            <span className="text-[10px] text-slate-400 block mb-0.5">Indicative Investment</span>
            <span className="font-bold text-white text-sm">
              {formatINR(currentService.indicativeBudget.min)} – {formatINR(currentService.indicativeBudget.max)}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/20">
            <span className="text-[10px] text-slate-400 block mb-0.5">Estimated Velocity</span>
            <span className="font-bold text-white text-sm">
              {currentService.indicativeTimelineWeeks.min} – {currentService.indicativeTimelineWeeks.max} Weeks
            </span>
          </div>
        </div>

      </div>

      {/* Bottom Swiper Thumbnails / Dot Indicators */}
      <div className="flex items-center justify-center gap-1.5 pt-1 overflow-x-auto py-1">
        {services.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelectService(s, idx)}
            className={`transition-all rounded-full ${
              idx === selectedIndex 
                ? 'w-8 h-2.5 bg-gradient-to-r from-orange-400 to-blue-500 shadow-md' 
                : 'w-2.5 h-2.5 bg-slate-700 hover:bg-slate-500'
            }`}
            aria-label={`Select ${s.name}`}
            title={s.name}
          />
        ))}
      </div>

    </div>
  );
};
