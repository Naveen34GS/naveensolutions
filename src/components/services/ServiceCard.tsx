import React, { useState } from 'react';
import { 
  Code2, 
  Layout, 
  Server, 
  Smartphone, 
  Network, 
  Cloud, 
  Cpu, 
  Database, 
  CheckCircle2, 
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  LucideIcon 
} from 'lucide-react';
import { ServiceItem } from '../../types';
import { formatINR } from '../../data/pricing';

interface ServiceCardProps {
  service: ServiceItem;
  onSelect: (service: ServiceItem) => void;
  onViewDetails?: (service: ServiceItem) => void;
  isSelected?: boolean;
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

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  onSelect, 
  onViewDetails,
  isSelected = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = ICON_MAP[service.iconName] || Code2;

  return (
    <div 
      className={`group rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between ${
        isSelected 
          ? 'bg-blue-950/40 border-2 border-blue-500 shadow-xl shadow-blue-500/10' 
          : 'bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-slate-700 shadow-lg'
      }`}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:bg-blue-600/20 group-hover:scale-105 transition-all">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            {service.categoryLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
          {service.name}
        </h3>

        {/* Short Summary (Concise Teaser) */}
        <p className="text-sm text-slate-400 mb-4 leading-relaxed">
          {service.shortDescription}
        </p>

        {/* Core Tech Badges (Always visible minimal pill summary) */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {service.techTags.slice(0, 3).map((tech) => (
            <span 
              key={tech} 
              className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
            >
              {tech}
            </span>
          ))}
          {service.techTags.length > 3 && (
            <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-slate-800/40 text-slate-400">
              +{service.techTags.length - 3} more
            </span>
          )}
        </div>

        {/* Click to expand full capability details */}
        <div className="pt-2 mb-2">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-1.5 px-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-700/50 flex items-center justify-between transition-colors"
          >
            <span>{isExpanded ? 'Hide Capability Specs' : 'Click to View Full Capability Specs'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4 text-blue-400" /> : <ChevronDown className="w-4 h-4 text-blue-400" />}
          </button>
        </div>

        {/* Collapsible Full Information Section */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-4 animate-in fade-in duration-200">
            {/* Full Description */}
            <div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {service.fullDescription}
              </p>
            </div>

            {/* Architecture Standards */}
            <div>
              <div className="text-[10px] uppercase font-bold text-blue-400 tracking-wider mb-2">
                Architectural Capabilities:
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {service.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Representative Use Cases */}
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                Representative Use Cases:
              </div>
              <div className="space-y-1 text-xs text-slate-300 italic">
                {service.useCases.slice(0, 2).map((uc, i) => (
                  <div key={i}>• "{uc}"</div>
                ))}
              </div>
            </div>

            {/* Indicative Scope */}
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs flex justify-between items-center">
              <div>
                <span className="text-[10px] text-slate-400 block">Indicative Budget</span>
                <span className="font-semibold text-white">
                  {formatINR(service.indicativeBudget.min)} – {formatINR(service.indicativeBudget.max)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Delivery Window</span>
                <span className="font-semibold text-white">
                  {service.indicativeTimelineWeeks.min}–{service.indicativeTimelineWeeks.max} wks
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action CTA Buttons */}
      <div className="pt-4 mt-2 border-t border-slate-800/80 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onSelect(service)}
          className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold text-center shadow-md shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Check Feasibility</span>
        </button>

        {onViewDetails && (
          <button
            type="button"
            onClick={() => onViewDetails(service)}
            className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
          >
            Inspect
          </button>
        )}
      </div>
    </div>
  );
};
