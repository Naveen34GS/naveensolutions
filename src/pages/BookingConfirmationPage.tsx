import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getSavedBookings } from '../lib/storage';
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Video, 
  PhoneCall, 
  ArrowRight, 
  ShieldCheck, 
  LayoutDashboard,
  Copy
} from 'lucide-react';

export const BookingConfirmationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const ref = searchParams.get('ref') || 'DMK-CONS-DEMO';

  const allBookings = getSavedBookings();
  const booking = allBookings.find(b => b.bookingRef === ref) || allBookings[0];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-8">
      
      {/* Success Icon */}
      <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10 animate-in zoom-in-75 duration-300">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          Consultation Confirmed (Simulated)
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Discovery Slot Successfully Reserved
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Your 45-minute technical briefing slot is recorded in your client dashboard history.
        </p>
      </div>

      {/* Booking Details Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 text-left space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Booking Reference</div>
            <div className="text-base font-mono font-bold text-blue-400 mt-0.5">
              {booking?.bookingRef || ref}
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Confirmed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">Project Scope</span>
            <span className="font-semibold text-white">{booking?.projectName || 'Project Architecture'}</span>
          </div>

          <div>
            <span className="text-slate-400 block mb-0.5">Client & Organization</span>
            <span className="font-semibold text-white">{booking?.clientName} ({booking?.companyName})</span>
          </div>

          <div>
            <span className="text-slate-400 block mb-0.5">Scheduled Date & Time</span>
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              {booking?.consultationDate} • {booking?.timeSlot}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block mb-0.5">Meeting Preference</span>
            <span className="font-semibold text-white flex items-center gap-1.5">
              {booking?.meetingPreference === 'Online' ? (
                <>
                  <Video className="w-3.5 h-3.5 text-blue-400" />
                  <span>Google Meet Video Link</span>
                </>
              ) : (
                <>
                  <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
                  <span>Direct Inbound Phone</span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* Prototype simulation alert */}
        <div className="mt-4 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-400 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            <strong>Demonstration Notice:</strong> In this frontend prototype, no external calendar invites or automated emails are transmitted. The booking is persisted to your LocalStorage session.
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/dashboard"
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Return to Client Dashboard</span>
        </Link>
        <Link
          to="/assessment/new"
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
        >
          Evaluate Another Project
        </Link>
      </div>

    </div>
  );
};
