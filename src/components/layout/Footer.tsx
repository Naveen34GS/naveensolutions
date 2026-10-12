import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Shield, Sparkles, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { COMPANY_CONFIG } from '../../data/company';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#080c14] border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs p-0.5">
                <div className="w-full h-full bg-[#080d1a] rounded-[6px] flex items-center justify-center font-bold text-orange-400">
                  NS
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Naveen<span className="text-blue-400">Solutions</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm">
              Engineering consulting & rapid software delivery. We evaluate complex business logic, design cloud architectures, and deliver custom systems with predictable timelines.
            </p>
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2 text-blue-400 font-medium">
                <Shield className="w-3.5 h-3.5" />
                <span>Prototype Environment Notice</span>
              </div>
              <p>
                All assessment scores, cost allocations, and calendar meetings on this site are illustrative demonstrations computed locally without external storage.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Capabilities</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/services" className="hover:text-white transition-colors">Custom Software</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">AI & LLM Workflows</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Cloud & DevOps (IaC)</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">API & CRM Integration</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">QA & Test Automation</Link></li>
            </ul>
          </div>

          {/* Platform Flows */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Evaluation Tools</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/assessment/new" className="hover:text-white transition-colors">Project Feasibility Wizard</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Client Assessment History</Link></li>
              <li><Link to="/book-appointment" className="hover:text-white transition-colors">Technical Consultation</Link></li>
              <li><Link to="/contact-sales" className="hover:text-white transition-colors">Solutions Desk Review</Link></li>
            </ul>
          </div>

          {/* Contact Demo */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Solutions Desk (Demo)</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <a href={`mailto:${COMPANY_CONFIG.salesContact.email}`} className="hover:text-white transition-colors">
                  {COMPANY_CONFIG.salesContact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <a href={`tel:${COMPANY_CONFIG.salesContact.phone}`} className="hover:text-white transition-colors">
                  {COMPANY_CONFIG.salesContact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>{COMPANY_CONFIG.salesContact.location}</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                Lead: {COMPANY_CONFIG.salesContact.name} ({COMPANY_CONFIG.salesContact.role})
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} {COMPANY_CONFIG.name}. {COMPANY_CONFIG.tagline} Built with React, Vite & Tailwind.
          </div>
          <div className="flex gap-4">
            <span className="text-slate-400">Illustrative Client Architecture Prototype</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
