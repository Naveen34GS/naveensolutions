import React, { useState } from 'react';
import { COMPANY_CONFIG } from '../data/company';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  User, 
  MessageSquare, 
  ArrowRight, 
  ShieldCheck, 
  Copy, 
  Check, 
  Sparkles,
  FileText
} from 'lucide-react';

export const SalesContactPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${COMPANY_CONFIG.salesContact.name} | ${COMPANY_CONFIG.salesContact.email} | ${COMPANY_CONFIG.salesContact.phone}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Enterprise Solutions Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Connect With Our Solutions Leadership
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Have bespoke compliance requirements, proprietary legacy integrations, or need custom RFP reviews? Speak directly with our Solutions Engineering lead.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Column: Contact Card */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
              Direct Contact
            </div>
            <h2 className="text-xl font-bold text-white">
              {COMPANY_CONFIG.salesContact.name}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {COMPANY_CONFIG.salesContact.role}
            </p>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Email Address</span>
                <a 
                  href={`mailto:${COMPANY_CONFIG.salesContact.email}`} 
                  className="font-medium text-white hover:text-blue-400 transition-colors"
                >
                  {COMPANY_CONFIG.salesContact.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Direct Phone</span>
                <a 
                  href={`tel:${COMPANY_CONFIG.salesContact.phone}`} 
                  className="font-medium text-white hover:text-blue-400 transition-colors"
                >
                  {COMPANY_CONFIG.salesContact.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Engineering Center</span>
                <span className="font-medium text-white">
                  {COMPANY_CONFIG.salesContact.location}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={handleCopy}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-slate-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-blue-400" />}
              <span>{copied ? 'Details Copied!' : 'Copy Direct Contact Card'}</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Demonstration Notice</span>
            </div>
            <p>
              {COMPANY_CONFIG.salesContact.note}
            </p>
          </div>
        </div>

        {/* Right Column: Inbound Inquiry Form */}
        <div className="lg:col-span-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Inquiry Received (Demo Simulation)</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Thank you, {name}! In this prototype demo, your inquiry has been simulated and recorded locally. In production, this would notify Alex Morgan directly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700 transition-colors"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Send Direct Message
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Aditi Verma"
                    className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="aditi@fintech.example"
                    className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Company / Organization *
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  placeholder="Apex Global Solutions"
                  className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Message / Project Context *
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  placeholder="Tell us about the architecture challenge, timeline, or legacy systems involved..."
                  className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <span>Submit Inquiry (Demo)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
