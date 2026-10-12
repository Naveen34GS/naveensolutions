import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MOCK_SCHEDULE_SLOTS } from '../data/company';
import { isSlotTaken, saveBooking } from '../lib/storage';
import { ConsultationBooking } from '../types';
import { 
  Calendar, 
  Clock, 
  ShieldCheck, 
  User, 
  Mail, 
  Building, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle,
  Video,
  PhoneCall
} from 'lucide-react';

export const BookingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const assessmentId = searchParams.get('assessmentId') || undefined;
  const projectTitleParam = searchParams.get('projectTitle') || 'Custom Engineering Initiative';

  // Booking Form State
  const [clientName, setClientName] = useState(user?.fullName || '');
  const [businessEmail, setBusinessEmail] = useState(user?.email || '');
  const [companyName, setCompanyName] = useState(user?.companyName || '');
  const [projectName, setProjectName] = useState(projectTitleParam);

  // Set default consultation date to tomorrow (YYYY-MM-DD)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [consultationDate, setConsultationDate] = useState(defaultDateStr);
  const [timeSlot, setTimeSlot] = useState(MOCK_SCHEDULE_SLOTS[0]);
  const [meetingPreference, setMeetingPreference] = useState<'Online' | 'Phone'>('Online');
  const [agenda, setAgenda] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!clientName.trim() || !businessEmail.trim() || !companyName.trim() || !projectName.trim()) {
      setError('Please provide all mandatory booking fields.');
      return;
    }

    if (!consultationDate) {
      setError('Please select a preferred consultation date.');
      return;
    }

    // Check duplicate slot in local storage
    if (isSlotTaken(consultationDate, timeSlot)) {
      setError(`The selected slot "${timeSlot}" on ${consultationDate} has already been reserved. Please pick another time.`);
      return;
    }

    const bookingRef = `DMK-CONS-${Math.floor(100000 + Math.random() * 900000)}`;

    const newBooking: ConsultationBooking = {
      id: `book_${Date.now()}`,
      bookingRef,
      userId: user?.id || 'usr_guest',
      assessmentId,
      clientName,
      businessEmail,
      companyName,
      projectName,
      consultationDate,
      timeSlot,
      timeZone: 'Asia/Kolkata (IST)',
      meetingPreference,
      agenda,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    saveBooking(newBooking);

    // Navigate to confirmation page
    navigate(`/booking-confirmation?ref=${bookingRef}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-3">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>Technical Discovery Session</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Book a 45-Minute Technical Consultation
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Discuss technical architecture tradeoffs, API authentication models, security frameworks, and implementation phases with a Lead Solutions Architect.
        </p>
      </div>

      {/* Demo Notice */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-400 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          <strong>Interactive Demo Schedule:</strong> Slots are managed directly in browser storage. Booking will reserve your chosen slot and prevent duplicate reservations within this demo session.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Client Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Business Email *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Company Name *
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Project Name *
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Date & Slot Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Preferred Date *
            </label>
            <input
              type="date"
              value={consultationDate}
              onChange={(e) => setConsultationDate(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Time Slot (IST) *
            </label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            >
              {MOCK_SCHEDULE_SLOTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Meeting Format */}
        <div className="pt-2">
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Meeting Format
          </label>
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            <button
              type="button"
              onClick={() => setMeetingPreference('Online')}
              className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                meetingPreference === 'Online'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Google Meet (Online)</span>
            </button>

            <button
              type="button"
              onClick={() => setMeetingPreference('Phone')}
              className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                meetingPreference === 'Phone'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <PhoneCall className="w-4 h-4" />
              <span>Direct Phone Call</span>
            </button>
          </div>
        </div>

        {/* Agenda */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Specific Discussion Topics or Architecture Questions (Optional)
          </label>
          <textarea
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
            rows={3}
            placeholder="e.g. Review database sharding tradeoffs, discuss webhook retry idempotency, evaluate AWS vs Azure costs..."
            className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-end">
          <button
            type="submit"
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all hover:scale-[1.01]"
          >
            <span>Confirm & Reserve Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
};
