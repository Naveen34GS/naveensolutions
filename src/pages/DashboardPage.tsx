import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SERVICES_DATA } from '../data/services';
import { formatINR } from '../data/pricing';
import { 
  Sparkles, 
  PlusCircle, 
  Calendar, 
  Clock, 
  ArrowRight, 
  FileCheck, 
  AlertCircle, 
  Building, 
  History,
  TrendingUp,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ConsultationBooking } from '../types';
import { getSavedBookings } from '../lib/storage';

export const DashboardPage: React.FC = () => {
  const { user, recentAssessments } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<ConsultationBooking[]>([]);

  useEffect(() => {
    if (user) {
      setBookings(getSavedBookings(user.id));
    }
  }, [user]);

  const likelyCount = recentAssessments.filter(a => a.outcome === 'Likely Feasible').length;
  const clarifyCount = recentAssessments.filter(a => a.outcome === 'Feasible With Clarifications').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
            <Building className="w-3.5 h-3.5" />
            <span>{user?.companyName} • Client Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Welcome back, {user?.fullName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track your technical feasibility reports, phase roadmaps, and scheduled consultation briefings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/assessment/new"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Start New Assessment</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Evaluations</div>
          <div className="text-2xl font-bold text-white mt-2">{recentAssessments.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">Generated project dossiers</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-emerald-400 uppercase tracking-wider font-semibold">Likely Feasible</div>
          <div className="text-2xl font-bold text-emerald-400 mt-2">{likelyCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">Immediate architecture fit</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-amber-400 uppercase tracking-wider font-semibold">Requires Clarification</div>
          <div className="text-2xl font-bold text-amber-400 mt-2">{clarifyCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">Pending discovery workshop</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-blue-400 uppercase tracking-wider font-semibold">Booked Consultations</div>
          <div className="text-2xl font-bold text-blue-400 mt-2">{bookings.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">Confirmed technical slots</div>
        </div>
      </div>

      {/* Main Grid: Assessments & Scheduled Briefings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recent Assessments */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <History className="w-5 h-5 text-blue-400" />
              <span>Project Assessment History</span>
            </h2>
            <Link to="/assessment/new" className="text-xs text-blue-400 hover:underline">
              + New Evaluation
            </Link>
          </div>

          {recentAssessments.length === 0 ? (
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <FileCheck className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm text-slate-300 font-medium">No Project Assessments Yet</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Submit your first technical requirements to receive an instant feasibility score, implementation roadmap, and cost estimation.
              </p>
              <Link
                to="/assessment/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-colors"
              >
                <span>Launch Feasibility Engine</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentAssessments.map((a) => (
                <div
                  key={a.id}
                  onClick={() => navigate(`/assessment/${a.id}`)}
                  className="group bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        a.outcome === 'Likely Feasible'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : a.outcome === 'Feasible With Clarifications'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : 'bg-red-500/10 text-red-400 border border-red-500/30'
                      }`}>
                        {a.outcome}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(a.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                      {a.projectTitle}
                    </h3>

                    <div className="text-xs text-slate-400 flex flex-wrap items-center gap-4">
                      <span>Service: <strong className="text-slate-300">{a.serviceName}</strong></span>
                      <span>Timeline: <strong className="text-slate-300">~{a.estimatedTotalWeeks} Weeks</strong></span>
                      <span>Indicative: <strong className="text-slate-300">{formatINR(a.estimatedCostRangeINR.min)} – {formatINR(a.estimatedCostRangeINR.max)}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Match Score</div>
                      <div className="text-xl font-extrabold text-blue-400">{a.matchScore}/100</div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-800 group-hover:bg-blue-600 text-slate-400 group-hover:text-white transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Bookings & Recommended Services */}
        <div className="space-y-6">
          {/* Scheduled Briefings */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>Upcoming Consultations</span>
            </h3>

            {bookings.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-800/40 text-center text-xs text-slate-400 space-y-2">
                <p>No active consultations booked.</p>
                <Link to="/book-appointment" className="text-blue-400 hover:underline inline-block font-medium">
                  Schedule a 45-min technical briefing
                </Link>
              </div>
            ) : (
              <div className="space-y-2.5">
                {bookings.map(b => (
                  <div key={b.id} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{b.projectName}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold">
                        {b.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 flex items-center gap-1.5 pt-1">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>{b.consultationDate} • {b.timeSlot}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Format: {b.meetingPreference} Video Conference
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 pt-1">
                      Ref: {b.bookingRef}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recommended Next Capabilities */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>Recommended Solutions</span>
            </h3>
            <div className="space-y-2">
              {SERVICES_DATA.slice(0, 3).map(s => (
                <div 
                  key={s.id} 
                  onClick={() => navigate(`/services/${s.id}`)}
                  className="p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/40 cursor-pointer transition-colors"
                >
                  <div className="text-xs font-semibold text-white">{s.name}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{s.shortDescription}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
