import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SERVICES_DATA } from '../data/services';
import { 
  ProjectRequirement, 
  ProjectComplexity, 
  BudgetRange, 
  ExpectedDeliveryTime 
} from '../types';
import { evaluateFeasibility } from '../lib/assessmentEngine';
import { saveRequirement, saveAssessment, getSavedDraft, saveDraft, clearDraft } from '../lib/storage';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Save, 
  Layers, 
  Sparkles, 
  HelpCircle,
  FileText,
  Sliders,
  DollarSign
} from 'lucide-react';

export const ProjectWizardPage: React.FC = () => {
  const { user, pendingServiceId, setPendingService, refreshUserData } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Selected step: 1 (Basics), 2 (Architecture & Scope), 3 (Constraints & Budget)
  const [currentStep, setCurrentStep] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const initialServiceId = searchParams.get('serviceId') || pendingServiceId || SERVICES_DATA[0].id;
  const [serviceId, setServiceId] = useState(initialServiceId);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [businessOutcome, setBusinessOutcome] = useState('');
  const [existingSystems, setExistingSystems] = useState('');
  const [requiredIntegrations, setRequiredIntegrations] = useState('');
  const [preferredTech, setPreferredTech] = useState('');
  const [expectedUsers, setExpectedUsers] = useState('1,000–10,000 monthly active users');
  const [requiredFeatures, setRequiredFeatures] = useState('');
  const [complexity, setComplexity] = useState<ProjectComplexity>('Medium');
  const [budgetRange, setBudgetRange] = useState<BudgetRange>('₹2,00,000–₹5,00,000');
  const [deliveryDate, setDeliveryDate] = useState<ExpectedDeliveryTime>('Within 2–3 months');
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  // Conditional fields
  const [apiPlatformsToConnect, setApiPlatformsToConnect] = useState('');
  const [aiDataSources, setAiDataSources] = useState('');
  const [aiUseCaseType, setAiUseCaseType] = useState('RAG Document Assistant');
  const [cloudCurrentInfra, setCloudCurrentInfra] = useState('');

  const [validationError, setValidationError] = useState('');

  // Load draft if available
  useEffect(() => {
    if (user) {
      const draft = getSavedDraft(user.id);
      if (draft) {
        if (draft.serviceId) setServiceId(draft.serviceId);
        if (draft.title) setTitle(draft.title);
        if (draft.description) setDescription(draft.description);
        if (draft.businessOutcome) setBusinessOutcome(draft.businessOutcome);
        if (draft.existingSystems) setExistingSystems(draft.existingSystems);
        if (draft.requiredIntegrations) setRequiredIntegrations(draft.requiredIntegrations);
        if (draft.preferredTech) setPreferredTech(draft.preferredTech);
        if (draft.expectedUsers) setExpectedUsers(draft.expectedUsers);
        if (draft.requiredFeatures) setRequiredFeatures(draft.requiredFeatures);
        if (draft.complexity) setComplexity(draft.complexity);
        if (draft.budgetRange) setBudgetRange(draft.budgetRange);
        if (draft.deliveryDate) setDeliveryDate(draft.deliveryDate);
        if (draft.additionalRequirements) setAdditionalRequirements(draft.additionalRequirements);
      }
    }
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveDraft = () => {
    if (!user) return;
    saveDraft(user.id, {
      serviceId,
      title,
      description,
      businessOutcome,
      existingSystems,
      requiredIntegrations,
      preferredTech,
      expectedUsers,
      requiredFeatures,
      complexity,
      budgetRange,
      deliveryDate,
      additionalRequirements
    });
    showToast('Draft progress saved to browser storage.');
  };

  const handleNext = () => {
    setValidationError('');
    if (currentStep === 1) {
      if (!title.trim() || title.length < 3) {
        setValidationError('Please specify a meaningful project title (min 3 chars).');
        return;
      }
      if (!description.trim() || description.length < 15) {
        setValidationError('Please provide a descriptive overview of the problem you want to solve (min 15 chars).');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!businessOutcome.trim() || businessOutcome.length < 10) {
        setValidationError('Please describe the expected business outcome or target metric.');
        return;
      }
      setCurrentStep(3);
    }
  };

  const handlePrev = () => {
    setValidationError('');
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const selectedSvc = SERVICES_DATA.find(s => s.id === serviceId) || SERVICES_DATA[0];

    const requirementObj: ProjectRequirement = {
      id: `req_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      userId: user.id,
      createdAt: new Date().toISOString(),
      title,
      serviceId,
      serviceName: selectedSvc.name,
      description,
      businessOutcome,
      existingSystems,
      requiredIntegrations,
      preferredTech,
      expectedUsers,
      requiredFeatures,
      complexity,
      budgetRange,
      deliveryDate,
      additionalRequirements,
      apiPlatformsToConnect: serviceId === 'api-integration' ? apiPlatformsToConnect : undefined,
      aiDataSources: serviceId === 'ai-automation' ? aiDataSources : undefined,
      aiUseCaseType: serviceId === 'ai-automation' ? aiUseCaseType : undefined,
      cloudCurrentInfra: serviceId === 'devops-cloud' ? cloudCurrentInfra : undefined,
    };

    // Run deterministic feasibility engine
    const assessment = evaluateFeasibility(requirementObj);

    // Save requirement & assessment
    saveRequirement(requirementObj);
    saveAssessment(assessment);
    clearDraft(user.id);
    refreshUserData();

    // Navigate to assessment details
    navigate(`/assessment/${assessment.id}`);
  };

  const selectedServiceObj = SERVICES_DATA.find(s => s.id === serviceId) || SERVICES_DATA[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/50 text-emerald-300 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Devmock Feasibility Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Project Evaluation Wizard
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Provide your specifications to receive an instant, deterministic technical feasibility report, estimated cost allocation, and milestone roadmap.
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {/* Step 1 */}
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              currentStep >= 1 ? 'bg-blue-600 text-white ring-4 ring-blue-500/20' : 'bg-slate-800 text-slate-400'
            }`}>
              1
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-semibold text-white">Problem & Service</div>
              <div className="text-[10px] text-slate-400">Core Objectives</div>
            </div>
          </div>

          <div className={`flex-1 h-0.5 mx-4 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-slate-800'}`} />

          {/* Step 2 */}
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              currentStep >= 2 ? 'bg-blue-600 text-white ring-4 ring-blue-500/20' : 'bg-slate-800 text-slate-400'
            }`}>
              2
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-semibold text-white">Architecture & APIs</div>
              <div className="text-[10px] text-slate-400">Integrations & Systems</div>
            </div>
          </div>

          <div className={`flex-1 h-0.5 mx-4 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-slate-800'}`} />

          {/* Step 3 */}
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              currentStep >= 3 ? 'bg-blue-600 text-white ring-4 ring-blue-500/20' : 'bg-slate-800 text-slate-400'
            }`}>
              3
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-semibold text-white">Budget & Schedule</div>
              <div className="text-[10px] text-slate-400">Review & Evaluation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Validation Error banner */}
      {validationError && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <HelpCircle className="w-4 h-4 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        
        {/* STEP 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Capability Practice *
              </label>
              <select
                value={serviceId}
                onChange={(e) => {
                  setServiceId(e.target.value);
                  setPendingService(e.target.value);
                }}
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
              >
                {SERVICES_DATA.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.categoryLabel})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400 mt-1">
                {selectedServiceObj.shortDescription}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Project Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Multi-Tenant Inventory & Supplier Billing Portal"
                required
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                What problem are you trying to solve? (Detailed Description) *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Describe current bottlenecks, operational friction, key users, and why this project is critical for your company..."
                required
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Key Features Required
              </label>
              <textarea
                value={requiredFeatures}
                onChange={(e) => setRequiredFeatures(e.target.value)}
                rows={2}
                placeholder="e.g. Automated PDF invoice generation, role-based permissions, webhook alerts, executive CSV exports..."
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {/* STEP 2: Architecture & Scope */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Desired Business Outcome & Success Metrics *
              </label>
              <textarea
                value={businessOutcome}
                onChange={(e) => setBusinessOutcome(e.target.value)}
                rows={2}
                placeholder="e.g. Reduce customer ticket response times by 40%, automate monthly reconciliation, support 50k concurrent users..."
                required
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Existing Systems or Legacy Tools
                </label>
                <input
                  type="text"
                  value={existingSystems}
                  onChange={(e) => setExistingSystems(e.target.value)}
                  placeholder="e.g. MySQL DB, legacy PHP monolith, Salesforce CRM"
                  className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Required Third-Party Integrations
                </label>
                <input
                  type="text"
                  value={requiredIntegrations}
                  onChange={(e) => setRequiredIntegrations(e.target.value)}
                  placeholder="e.g. Stripe, Razorpay, SendGrid, HubSpot, Slack"
                  className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Preferred Technologies (Optional)
                </label>
                <input
                  type="text"
                  value={preferredTech}
                  onChange={(e) => setPreferredTech(e.target.value)}
                  placeholder="e.g. React, Next.js, Node.js, PostgreSQL"
                  className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Expected User Scale / Volume
                </label>
                <input
                  type="text"
                  value={expectedUsers}
                  onChange={(e) => setExpectedUsers(e.target.value)}
                  placeholder="e.g. 50 internal operators OR 100k daily transactions"
                  className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* CONDITIONAL FIELDS BASED ON SERVICE */}
            {serviceId === 'api-integration' && (
              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-2">
                <label className="block text-xs font-semibold text-blue-300">
                  Integration Platforms: Which platforms need to communicate?
                </label>
                <input
                  type="text"
                  value={apiPlatformsToConnect}
                  onChange={(e) => setApiPlatformsToConnect(e.target.value)}
                  placeholder="e.g. Sync Shopify orders to QuickBooks & update inventory in Zoho"
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-400"
                />
              </div>
            )}

            {serviceId === 'ai-automation' && (
              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-3">
                <label className="block text-xs font-semibold text-blue-300">
                  AI Architecture: What are your data sources and intended use case?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={aiDataSources}
                    onChange={(e) => setAiDataSources(e.target.value)}
                    placeholder="Data Sources: PDF invoices, Notion docs, Postgres DB"
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-400"
                  />
                  <select
                    value={aiUseCaseType}
                    onChange={(e) => setAiUseCaseType(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-400"
                  >
                    <option value="RAG Document Assistant">RAG Knowledge Assistant</option>
                    <option value="Document Extraction & OCR">Document Extraction & OCR</option>
                    <option value="Automated Ticket Categorization">Automated Ticket Categorization</option>
                    <option value="Custom Agentic Workflow">Custom Agentic Workflow</option>
                  </select>
                </div>
              </div>
            )}

            {serviceId === 'devops-cloud' && (
              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-2">
                <label className="block text-xs font-semibold text-blue-300">
                  Cloud Infrastructure: What is your current hosting setup?
                </label>
                <input
                  type="text"
                  value={cloudCurrentInfra}
                  onChange={(e) => setCloudCurrentInfra(e.target.value)}
                  placeholder="e.g. Single Ubuntu VPS on DigitalOcean or On-Premise bare metal"
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-400"
                />
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Constraints & Budget */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Complexity Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Project Complexity Estimate
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(['Small', 'Medium', 'Large', 'Unsure'] as ProjectComplexity[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setComplexity(lvl)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      complexity === lvl
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Anticipated Budget Range (INR)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {([
                  'Under ₹50,000',
                  '₹50,000–₹2,00,000',
                  '₹2,00,000–₹5,00,000',
                  '₹5,00,000–₹10,00,000',
                  'Above ₹10,00,000',
                  'Not decided'
                ] as BudgetRange[]).map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudgetRange(b)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-left transition-all ${
                      budgetRange === b
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Target Delivery Window
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {([
                  'Within 2 weeks',
                  'Within 1 month',
                  'Within 2–3 months',
                  'Within 3–6 months',
                  'Flexible'
                ] as ExpectedDeliveryTime[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setDeliveryDate(t)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-left transition-all ${
                      deliveryDate === t
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Additional Constraints or Regulatory Compliance (Optional)
              </label>
              <textarea
                value={additionalRequirements}
                onChange={(e) => setAdditionalRequirements(e.target.value)}
                rows={2}
                placeholder="e.g. HIPAA or GDPR compliance requirements, on-premise deployment constraint, strict NDA..."
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-blue-400" />
              <span>Save Draft</span>
            </button>
          </div>

          <div className="w-full sm:w-auto">
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Submit for Feasibility Assessment</span>
              </button>
            )}
          </div>
        </div>

      </form>

    </div>
  );
};
