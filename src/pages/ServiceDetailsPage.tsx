import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { SERVICES_DATA } from '../data/services';
import { useAuth } from '../context/AuthContext';
import { formatINR } from '../data/pricing';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Banknote, 
  Code2, 
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const ServiceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, setPendingService } = useAuth();

  const service = SERVICES_DATA.find(s => s.id === id);

  if (!service) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Service Not Found</h2>
        <p className="text-slate-400 text-sm mb-6">The technical capability requested does not exist in our catalog.</p>
        <Link to="/services" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-xl text-white text-xs font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>
      </div>
    );
  }

  const handleEvaluate = () => {
    setPendingService(service.id);
    if (!isAuthenticated) {
      navigate(`/login?redirect=/assessment/new?serviceId=${service.id}`);
    } else {
      navigate(`/assessment/new?serviceId=${service.id}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/services" className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Services</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-300">{service.name}</span>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/40 border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <span>{service.categoryLabel}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {service.name}
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            {service.fullDescription}
          </p>

          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <button
              onClick={handleEvaluate}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>Evaluate This Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-400">Instant feasibility report in ~3 minutes</span>
          </div>
        </div>
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cost & Timeline */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Banknote className="w-5 h-5 text-emerald-400" />
            <span>Indicative Investment & Timelines</span>
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
              <div className="text-xs text-slate-400">Illustrative Budget Range</div>
              <div className="text-2xl font-bold text-white mt-1">
                {formatINR(service.indicativeBudget.min)} – {formatINR(service.indicativeBudget.max)}
              </div>
              <div className="text-xs text-slate-400 mt-1">{service.indicativeBudget.note}</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
              <div className="text-xs text-slate-400">Target Delivery Schedule</div>
              <div className="text-2xl font-bold text-white mt-1">
                {service.indicativeTimelineWeeks.min} – {service.indicativeTimelineWeeks.max} Weeks
              </div>
              <div className="text-xs text-slate-400 mt-1">Includes discovery, design, build, and QA stages</div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-blue-400" />
            <span>Supported Technologies</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {service.techTags.map(tag => (
              <span key={tag} className="px-3 py-1.5 rounded-lg bg-slate-800 text-blue-300 border border-slate-700 text-xs font-mono font-medium">
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800/80">
            <h4 className="text-xs uppercase font-semibold text-slate-400 mb-3">Architectural Pillars</h4>
            <div className="space-y-2">
              {service.capabilities.map((c, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-white">Representative Implementation Scenarios</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {service.useCases.map((uc, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
              <div className="text-xs font-semibold text-blue-400 mb-1">Scenario #{i + 1}</div>
              <p className="text-xs text-slate-300">{uc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
