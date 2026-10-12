import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Code, 
  Cpu, 
  ShieldCheck, 
  Gauge, 
  Layers
} from 'lucide-react';
import { SERVICES_DATA } from '../data/services';
import { CapabilityModalStudio } from '../components/services/CapabilityModalStudio';
import { useAuth } from '../context/AuthContext';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Capability Popup Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
        {/* Glow Accents (Orange & Blue) */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-orange-600/15 via-amber-600/15 to-blue-600/25 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-gradient-to-bl from-blue-600/25 to-orange-500/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 to-blue-500/10 border border-orange-500/30 text-orange-300 text-xs font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>NaveenSolutions Feasibility Engine</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            Your Next Big Idea.{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-blue-400 bg-clip-text text-transparent">
              Engineered by NaveenSolutions.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Explore our technical capabilities, describe your challenge, and discover a practical path to building your next software solution.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            
            {/* Primary Button: Opens the Animated Capability Popup Modal */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-semibold text-sm shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Our Capabilities</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Check Feasibility Button */}
            <button
              type="button"
              onClick={() => {
                if (!isAuthenticated) {
                  navigate('/login?redirect=/assessment/new');
                } else {
                  navigate('/assessment/new');
                }
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-sm transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group"
            >
              <span>Check Project Feasibility</span>
              <Gauge className="w-4 h-4 text-orange-400 group-hover:text-blue-400 transition-colors" />
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Engineering</div>
                <div className="text-sm font-semibold text-white">Full-Stack Scale</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Interconnect</div>
                <div className="text-sm font-semibold text-white">Enterprise APIs</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Intelligence</div>
                <div className="text-sm font-semibold text-white">AI & Automation</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Infrastructure</div>
                <div className="text-sm font-semibold text-white">Cloud-Native IaC</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fully Animated Capability Modal Studio Popup */}
      <CapabilityModalStudio
        services={SERVICES_DATA}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
};
