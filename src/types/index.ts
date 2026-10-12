export type ServiceCategory = 
  | 'development' 
  | 'integration' 
  | 'cloud-devops' 
  | 'ai-automation' 
  | 'data-qa';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  techTags: string[];
  useCases: string[];
  capabilities: string[];
  indicativeBudget: {
    min: number;
    max: number;
    currency: string;
    note: string;
  };
  indicativeTimelineWeeks: {
    min: number;
    max: number;
  };
}

export type ProjectComplexity = 'Small' | 'Medium' | 'Large' | 'Unsure';

export type BudgetRange = 
  | 'Under ₹50,000'
  | '₹50,000–₹2,00,000'
  | '₹2,00,000–₹5,00,000'
  | '₹5,00,000–₹10,00,000'
  | 'Above ₹10,00,000'
  | 'Not decided';

export type ExpectedDeliveryTime = 
  | 'Within 2 weeks'
  | 'Within 1 month'
  | 'Within 2–3 months'
  | 'Within 3–6 months'
  | 'Flexible';

export interface ProjectRequirement {
  id: string;
  userId: string;
  createdAt: string;
  title: string;
  serviceId: string;
  serviceName: string;
  description: string;
  businessOutcome: string;
  existingSystems: string;
  requiredIntegrations: string;
  preferredTech: string;
  expectedUsers: string;
  requiredFeatures: string;
  complexity: ProjectComplexity;
  budgetRange: BudgetRange;
  deliveryDate: ExpectedDeliveryTime;
  additionalRequirements: string;
  // Specific context fields
  apiPlatformsToConnect?: string;
  aiDataSources?: string;
  aiUseCaseType?: string;
  cloudCurrentInfra?: string;
  cloudTargetProvider?: string;
}

export type FeasibilityOutcome = 
  | 'Likely Feasible' 
  | 'Feasible With Clarifications' 
  | 'Outside Current Mock Capabilities';

export interface ImplementationPhase {
  name: string;
  description: string;
  durationWeeks: number;
  costAllocationINR: number;
  deliverables: string[];
}

export interface FeasibilityAssessment {
  id: string;
  requirementId: string;
  userId: string;
  createdAt: string;
  projectTitle: string;
  serviceId: string;
  serviceName: string;
  outcome: FeasibilityOutcome;
  matchScore: number; // 0 - 100
  summary: string;
  reasons: string[];
  missingInformation: string[];
  technicalClarifications: string[];
  recommendedTechStack: string[];
  architectureOverview: string;
  implementationPhases: ImplementationPhase[];
  estimatedTotalWeeks: number;
  estimatedCostRangeINR: {
    min: number;
    max: number;
  };
  teamRoles: string[];
  dependenciesAndAssumptions: string[];
  keyRisks: string[];
  suggestedEnhancements: string[];
  unsupportedReasons?: string[];
  recommendedAlternatives?: string[];
  isDemoNotice: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  companyName: string;
  phone?: string;
  createdAt: string;
}

export interface ConsultationBooking {
  id: string;
  bookingRef: string;
  userId: string;
  assessmentId?: string;
  clientName: string;
  businessEmail: string;
  companyName: string;
  projectName: string;
  consultationDate: string;
  timeSlot: string;
  timeZone: string;
  meetingPreference: 'Online' | 'Phone';
  agenda?: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}
