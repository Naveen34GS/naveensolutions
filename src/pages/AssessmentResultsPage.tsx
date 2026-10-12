import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAssessmentById } from '../lib/storage';
import { formatINR } from '../data/pricing';
import { COMPANY_CONFIG } from '../data/company';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Calendar, 
  Mail, 
  Phone, 
  FileEdit, 
  ArrowLeft, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Clock, 
  Users, 
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell 
} from 'recharts';

export const AssessmentResultsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const assessment = id ? getAssessmentById(id) : null;

  if (!assessment) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Assessment Not Found</h2>
        <p className="text-slate-400 text-sm mb-6">
          The requested project assessment dossier could not be located in local storage.
        </p>
        <Link to="/dashboard" className="px-5 py-2.5 bg-blue-600 rounded-xl text-white text-xs font-semibold">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const handleCopySalesInfo = () => {
    navigator.clipboard.writeText(
      `Devmock Sales Desk: ${COMPANY_CONFIG.salesContact.name} | ${COMPANY_CONFIG.salesContact.email} | ${COMPANY_CONFIG.salesContact.phone}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Chart data for phases
  const chartData = assessment.implementationPhases.map((phase, idx) => ({
    name: `P${idx + 1}: ${phase.name.split(' ')[0]}`,
    fullName: phase.name,
    cost: phase.costAllocationINR,
    weeks: phase.durationWeeks
  }));

  const isLikelyFeasible = assessment.outcome === 'Likely Feasible';
  const isClarificationNeeded = assessment.outcome === 'Feasible With Clarifications';
  const isOutsideCapabilities = assessment.outcome === 'Outside Current Mock Capabilities';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Navigation / Breadcrumbs */}
      <div className="flex items-center justify-between">
        <Link 
          to="/dashboard" 
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard / Evaluations</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500 font-mono">Dossier ID: {assessment.id}</span>
        </div>
      </div>

      {/* Outcome Banner */}
      <div className={`rounded-3xl p-6 sm:p-8 border shadow-xl relative overflow-hidden ${
        isLikelyFeasible
          ? 'bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-500/30'
          : isClarificationNeeded
          ? 'bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border-amber-500/30'
          : 'bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border-rose-500/30'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                isLikelyFeasible
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : isClarificationNeeded
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
              }`}>
                {assessment.outcome}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {assessment.serviceName}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {assessment.projectTitle}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              {assessment.summary}
            </p>
          </div>

          {/* Feasibility Match Score Gauge */}
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex flex-col items-center justify-center shrink-0 min-w-[180px] text-center shadow-lg">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
              Match Score
            </div>
            <div className={`text-4xl font-extrabold tracking-tight ${
              isLikelyFeasible
                ? 'text-emerald-400'
                : isClarificationNeeded
                ? 'text-amber-400'
                : 'text-rose-400'
            }`}>
              {assessment.matchScore}
              <span className="text-sm font-normal text-slate-500">/100</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
              <div 
                className={`h-full rounded-full ${
                  isLikelyFeasible ? 'bg-emerald-500' : isClarificationNeeded ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${assessment.matchScore}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-2">Deterministic Match Model</span>
          </div>
        </div>

        {/* Prototype Disclaimer */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
          <span>
            {COMPANY_CONFIG.demoNotice}
          </span>
        </div>
      </div>

      {/* Primary Action Buttons Based on Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex flex-wrap items-center gap-3">
          {isLikelyFeasible && (
            <button
              onClick={() => navigate(`/book-appointment?assessmentId=${assessment.id}&projectTitle=${encodeURIComponent(assessment.projectTitle)}`)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Technical Consultation</span>
            </button>
          )}

          {isClarificationNeeded && (
            <button
              onClick={() => navigate(`/book-appointment?assessmentId=${assessment.id}&projectTitle=${encodeURIComponent(assessment.projectTitle)}`)}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs shadow-md flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Calendar className="w-4 h-4" />
              <span>Discuss Requirements With Our Team</span>
            </button>
          )}

          {isOutsideCapabilities && (
            <Link
              to="/contact-sales"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md flex items-center gap-2 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Solutions Manager (Alex Morgan)</span>
            </Link>
          )}

          <button
            onClick={() => navigate(`/assessment/new?serviceId=${assessment.serviceId}`)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <FileEdit className="w-3.5 h-3.5" />
            <span>Revise Requirements</span>
          </button>
        </div>

        <div className="text-xs text-slate-400">
          Generated on {new Date(assessment.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* CASE C: OUTSIDE CURRENT CAPABILITIES PANEL */}
      {isOutsideCapabilities && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <XCircle className="w-5 h-5 text-rose-400" />
              <span>Why This Project is Outside Our Standard Blueprint</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {assessment.unsupportedReasons?.map((reason, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h4 className="text-sm font-bold text-white">Recommended Architectural Alternatives</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {assessment.recommendedAlternatives?.map((alt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{alt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dedicated Sales Contact Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">Dedicated Solutions Escalation</h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">Demo Desk</span>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="font-semibold text-white">{COMPANY_CONFIG.salesContact.name}</div>
                <div className="text-slate-400">{COMPANY_CONFIG.salesContact.role}</div>
                <div className="flex items-center gap-2 text-blue-400 pt-2">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${COMPANY_CONFIG.salesContact.email}`} className="hover:underline">
                    {COMPANY_CONFIG.salesContact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-blue-400">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${COMPANY_CONFIG.salesContact.phone}`} className="hover:underline">
                    {COMPANY_CONFIG.salesContact.phone}
                  </a>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={handleCopySalesInfo}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Details' : 'Copy Contact Info'}</span>
                </button>
                <Link
                  to="/contact-sales"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors"
                >
                  Contact Form
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CASE B: CLARIFICATIONS REQUIRED BANNER */}
      {isClarificationNeeded && (
        <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>Questions & Dependencies to Clarify During Technical Discovery</span>
          </h3>
          <div className="space-y-2">
            {assessment.technicalClarifications.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FEASIBILITY CORE DETAILS (For Likely Feasible & Clarifications) */}
      {!isOutsideCapabilities && (
        <div className="space-y-8">
          
          {/* Indicative Budget & Velocity Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Indicative Investment
              </div>
              <div className="text-2xl font-bold text-white">
                {formatINR(assessment.estimatedCostRangeINR.min)} – {formatINR(assessment.estimatedCostRangeINR.max)}
              </div>
              <p className="text-[11px] text-slate-400">
                Phase-allocated cost model in INR subject to detailed sprint milestone sign-offs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Projected Duration
              </div>
              <div className="text-2xl font-bold text-white">
                ~{assessment.estimatedTotalWeeks} Weeks
              </div>
              <p className="text-[11px] text-slate-400">
                End-to-end delivery timeline covering discovery, staging, and production release.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Engineering Squad
              </div>
              <div className="text-xs text-slate-300 space-y-1 pt-1">
                {assessment.teamRoles.map((role, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Architecture & Tech Stack */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              <span>Recommended Architecture & Technology Stack</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {assessment.architectureOverview}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {assessment.recommendedTechStack.map(tech => (
                <span 
                  key={tech} 
                  className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-blue-300 text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Implementation Roadmap & Phase Allocations */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">Implementation Roadmap & Milestones</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Step-by-step phased engineering with verifiable milestone artifacts.
                </p>
              </div>
              <span className="text-xs text-blue-400 font-semibold">
                Total: {assessment.estimatedTotalWeeks} Weeks
              </span>
            </div>

            {/* Visual Phase Chart using Recharts */}
            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} tickFormatter={(val) => `₹${val/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                    formatter={(val: any) => [`${formatINR(Number(val))}`, 'Cost Allocation']}
                    labelFormatter={(label, items) => {
                      const item = items?.[0]?.payload;
                      return item ? `${item.fullName} (${item.weeks} wks)` : label;
                    }}
                  />
                  <Bar dataKey="cost" fill="#3b82f6" radius={[6, 6, 0, 0]}>
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#6366f1'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Itemized Phase Cards */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              {assessment.implementationPhases.map((phase, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-semibold text-white">{phase.name}</h4>
                    </div>
                    <p className="text-xs text-slate-400">{phase.description}</p>
                    <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-300">
                      <strong>Deliverables:</strong> {phase.deliverables.join(', ')}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-white">{formatINR(phase.costAllocationINR)}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{phase.durationWeeks} Weeks</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Mitigation & Assumptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>Technical Risk Assessment</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {assessment.keyRisks.map((risk, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Key Dependencies & Assumptions</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {assessment.dependenciesAndAssumptions.map((dep, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{dep}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
