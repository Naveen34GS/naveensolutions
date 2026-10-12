import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ServiceItem, ProjectComplexity, BudgetRange, ExpectedDeliveryTime, ProjectRequirement } from '../../types';
import { evaluateFeasibility } from '../../lib/assessmentEngine';
import { saveRequirement, saveAssessment } from '../../lib/storage';
import { 
  Sparkles, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Banknote,
  Code2
} from 'lucide-react';

interface QuickFeasibilityFormProps {
  selectedService: ServiceItem;
}

export const QuickFeasibilityForm: React.FC<QuickFeasibilityFormProps> = ({ selectedService }) => {
  const { user, isAuthenticated, refreshUserData } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [businessOutcome, setBusinessOutcome] = useState('');
  const [requiredIntegrations, setRequiredIntegrations] = useState('');
  const [complexity, setComplexity] = useState<ProjectComplexity>('Medium');
  const [budgetRange, setBudgetRange] = useState<BudgetRange>('₹2,00,000–₹5,00,000');
  const [deliveryDate, setDeliveryDate] = useState<ExpectedDeliveryTime>('Within 2–3 months');
  
  // Service-specific inputs
  const [apiPlatforms, setApiPlatforms] = useState('');
  const [aiDataSources, setAiDataSources] = useState('');
  const [cloudInfra, setCloudInfra] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || title.length < 3) {
      setError('Please provide a project title (min 3 characters).');
      return;
    }

    if (!description.trim() || description.length < 15) {
      setError('Please describe your project problem & objectives (min 15 characters).');
      return;
    }

    // If not authenticated, preserve requirements in state and redirect to login
    if (!isAuthenticated || !user) {
      // Store in session storage or URL redirect so user doesn't lose inputs
      sessionStorage.setItem('pending_feasibility_title', title);
      sessionStorage.setItem('pending_feasibility_desc', description);
      sessionStorage.setItem('pending_feasibility_outcome', businessOutcome);
      navigate(`/login?redirect=/assessment/new?serviceId=${selectedService.id}`);
      return;
    }

    const requirementObj: ProjectRequirement = {
      id: `req_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      userId: user.id,
      createdAt: new Date().toISOString(),
      title,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      description,
      businessOutcome: businessOutcome || 'Optimize operational efficiency and build modern automated infrastructure',
      existingSystems: 'Modern web stack / API endpoints',
      requiredIntegrations: requiredIntegrations || 'REST APIs, Cloud webhooks',
      preferredTech: selectedService.techTags.slice(0, 3).join(', '),
      expectedUsers: '1,000–10,000 Active Users',
      requiredFeatures: 'Automated workflow, role-based security, telemetry & audit logs',
      complexity,
      budgetRange,
      deliveryDate,
      additionalRequirements: '',
      apiPlatformsToConnect: selectedService.id === 'api-integration' ? apiPlatforms : undefined,
      aiDataSources: selectedService.id === 'ai-automation' ? aiDataSources : undefined,
      cloudCurrentInfra: selectedService.id === 'devops-cloud' ? cloudInfra : undefined,
    };

    const assessment = evaluateFeasibility(requirementObj);
    saveRequirement(requirementObj);
    saveAssessment(assessment);
    refreshUserData();

    navigate(`/assessment/${assessment.id}`);
  };

  return (
    <div className="bg-gradient-to-br from-[#0c183a]/90 via-[#081026]/95 to-[#040817] border-2 border-blue-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl flex flex-col justify-between h-full">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-blue-900/60">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-[11px] font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Instant Feasibility Form</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Evaluate: <span className="bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">{selectedService.name}</span>
            </h3>
          </div>
          <span className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-950/80 border border-blue-500/30 text-blue-300 font-mono">
            {selectedService.categoryLabel}
          </span>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Project Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Multi-Tenant Supplier B2B Portal"
              required
              className="w-full px-3.5 py-2.5 bg-blue-950/30 border border-blue-500/30 focus:border-orange-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Problem Description & Key Objectives *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Describe what challenge you are solving, core user workflows, and mandatory features..."
              required
              className="w-full px-3.5 py-2.5 bg-blue-950/30 border border-blue-500/30 focus:border-orange-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Conditional contextual field */}
          {selectedService.id === 'api-integration' && (
            <div>
              <label className="block text-xs font-semibold text-orange-300 mb-1">
                Platforms to Connect (APIs / ERP / CRM)
              </label>
              <input
                type="text"
                value={apiPlatforms}
                onChange={(e) => setApiPlatforms(e.target.value)}
                placeholder="e.g. Sync Shopify & Stripe into QuickBooks"
                className="w-full px-3.5 py-2 bg-blue-950/40 border border-blue-500/30 rounded-xl text-xs text-white focus:outline-none"
              />
            </div>
          )}

          {selectedService.id === 'ai-automation' && (
            <div>
              <label className="block text-xs font-semibold text-orange-300 mb-1">
                Data Sources & AI Workflow
              </label>
              <input
                type="text"
                value={aiDataSources}
                onChange={(e) => setAiDataSources(e.target.value)}
                placeholder="e.g. PDF invoices, Vector embeddings, Customer FAQ bot"
                className="w-full px-3.5 py-2 bg-blue-950/40 border border-blue-500/30 rounded-xl text-xs text-white focus:outline-none"
              />
            </div>
          )}

          {selectedService.id === 'devops-cloud' && (
            <div>
              <label className="block text-xs font-semibold text-orange-300 mb-1">
                Current Hosting & Target Cloud
              </label>
              <input
                type="text"
                value={cloudInfra}
                onChange={(e) => setCloudInfra(e.target.value)}
                placeholder="e.g. On-prem Linux VPS migrating to AWS ECS"
                className="w-full px-3.5 py-2 bg-blue-950/40 border border-blue-500/30 rounded-xl text-xs text-white focus:outline-none"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Estimated Complexity
              </label>
              <select
                value={complexity}
                onChange={(e) => setComplexity(e.target.value as ProjectComplexity)}
                className="w-full px-3 py-2 bg-blue-950/40 border border-blue-500/30 rounded-xl text-xs text-white focus:outline-none"
              >
                <option value="Small">Small (MVP / Prototype)</option>
                <option value="Medium">Medium (Standard System)</option>
                <option value="Large">Large (Enterprise Scale)</option>
                <option value="Unsure">Unsure (Needs Discovery)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Budget Target (INR)
              </label>
              <select
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value as BudgetRange)}
                className="w-full px-3 py-2 bg-blue-950/40 border border-blue-500/30 rounded-xl text-xs text-white focus:outline-none"
              >
                <option value="₹50,000–₹2,00,000">₹50,000–₹2,00,000</option>
                <option value="₹2,00,000–₹5,00,000">₹2,00,000–₹5,00,000</option>
                <option value="₹5,00,000–₹10,00,000">₹5,00,000–₹10,00,000</option>
                <option value="Above ₹10,00,000">Above ₹10,00,000</option>
                <option value="Under ₹50,000">Under ₹50,000</option>
                <option value="Not decided">Not decided yet</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Target Delivery Horizon
            </label>
            <select
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value as ExpectedDeliveryTime)}
              className="w-full px-3 py-2 bg-blue-950/40 border border-blue-500/30 rounded-xl text-xs text-white focus:outline-none"
            >
              <option value="Within 1 month">Within 1 month (Fast-track)</option>
              <option value="Within 2–3 months">Within 2–3 months (Standard)</option>
              <option value="Within 3–6 months">Within 3–6 months (Phased)</option>
              <option value="Within 2 weeks">Within 2 weeks (Rapid Spike)</option>
              <option value="Flexible">Flexible schedule</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-bold text-xs shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>{isAuthenticated ? 'Analyze Feasibility Instantly' : 'Login & Analyze Feasibility'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2">
              Instant 0–100 score, milestone timeline, and cost breakdown computed in real-time.
            </p>
          </div>

        </form>
      </div>

    </div>
  );
};
