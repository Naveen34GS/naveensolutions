import { 
  ProjectRequirement, 
  FeasibilityAssessment, 
  FeasibilityOutcome, 
  ImplementationPhase 
} from '../types';
import { SERVICES_DATA } from '../data/services';
import { CAPABILITY_RULES, CapabilityRule } from '../data/capabilities';
import { COMPLEXITY_FACTORS, BUDGET_RANGE_MIN_MAP, DELIVERY_WEEKS_MAX_MAP } from '../data/pricing';
import { COMPANY_CONFIG } from '../data/company';

export function evaluateFeasibility(req: ProjectRequirement): FeasibilityAssessment {
  const service = SERVICES_DATA.find(s => s.id === req.serviceId) || SERVICES_DATA[0];
  const rule: CapabilityRule = CAPABILITY_RULES[req.serviceId] || CAPABILITY_RULES['custom-software'];

  const combinedText = `
    ${req.title} 
    ${req.description} 
    ${req.businessOutcome} 
    ${req.requiredFeatures} 
    ${req.existingSystems} 
    ${req.requiredIntegrations} 
    ${req.preferredTech} 
    ${req.additionalRequirements}
    ${req.apiPlatformsToConnect || ''}
    ${req.aiDataSources || ''}
    ${req.cloudCurrentInfra || ''}
  `.toLowerCase();

  let matchScore = 70; // baseline neutral
  const reasons: string[] = [];
  const missingInformation: string[] = [];
  const technicalClarifications: string[] = [];
  const unsupportedReasons: string[] = [];
  const recommendedAlternatives: string[] = [];

  // 1. Check for Unsupported Keywords or Domains
  const matchedUnsupportedKeywords = rule.unsupportedKeywords.filter(kw => combinedText.includes(kw.toLowerCase()));
  if (matchedUnsupportedKeywords.length > 0) {
    matchScore -= 50;
    unsupportedReasons.push(
      `Request mentions domain keywords outside our core engineering stack: ${matchedUnsupportedKeywords.join(', ')}.`
    );
  }

  // 2. Check for Unsupported Integrations
  const matchedUnsupportedIntegrations = rule.unsupportedIntegrations.filter(ui => combinedText.includes(ui.toLowerCase()));
  if (matchedUnsupportedIntegrations.length > 0) {
    matchScore -= 30;
    unsupportedReasons.push(
      `Integration requested with proprietary/air-gapped legacy systems without standard web APIs: ${matchedUnsupportedIntegrations.join(', ')}.`
    );
  }

  // 3. Supported Keywords Boost
  const matchedKeywords = rule.supportedKeywords.filter(kw => combinedText.includes(kw.toLowerCase()));
  if (matchedKeywords.length >= 3) {
    matchScore += 15;
    reasons.push(`Strong domain keyword alignment found (${matchedKeywords.slice(0, 4).join(', ')}) matching our active capability libraries.`);
  } else if (matchedKeywords.length >= 1) {
    matchScore += 8;
    reasons.push(`Alignment verified with target service pattern (${matchedKeywords.join(', ')}).`);
  } else {
    matchScore -= 10;
    missingInformation.push('Project description is relatively high-level; specific feature workflows should be elaborated.');
  }

  // 4. Complexity & Timeline Compatibility
  const compFactor = COMPLEXITY_FACTORS[req.complexity];
  const baseTimelineMin = Math.round(rule.minDurationWeeks * compFactor.durationMultiplier);
  const baseTimelineMax = Math.round(rule.maxDurationWeeks * compFactor.durationMultiplier);

  const expectedMaxWeeks = DELIVERY_WEEKS_MAX_MAP[req.deliveryDate] || 52;
  if (expectedMaxWeeks < baseTimelineMin) {
    matchScore -= 15;
    technicalClarifications.push(
      `Target delivery timeline (${req.deliveryDate}) is tighter than the realistic engineering baseline for a ${req.complexity} scope (${baseTimelineMin}–${baseTimelineMax} weeks). Rapid MVP phasing will be necessary.`
    );
  } else {
    reasons.push(`Selected timeline expectation (${req.deliveryDate}) fits the projected engineering cycle well.`);
  }

  // 5. Budget Compatibility
  const baseCostMin = Math.round(rule.minBudgetINR * compFactor.costMultiplier);
  const baseCostMax = Math.round(rule.maxBudgetINR * compFactor.costMultiplier);
  const userBudgetMin = BUDGET_RANGE_MIN_MAP[req.budgetRange];

  if (req.budgetRange === 'Under ₹50,000' && baseCostMin > 60000) {
    matchScore -= 20;
    technicalClarifications.push(
      `Allocated budget (${req.budgetRange}) is below the typical minimum threshold for custom ${service.name} engineering (typically starting around ₹${(baseCostMin/1000).toFixed(0)}k). Scope reduction or modular phasing recommended.`
    );
  } else if (req.budgetRange !== 'Not decided' && userBudgetMin >= baseCostMin) {
    matchScore += 10;
    reasons.push(`Budget indication (${req.budgetRange}) aligns comfortably with the technical scope and architecture tiers.`);
  }

  // 6. Completeness Checks
  if (!req.businessOutcome || req.businessOutcome.trim().length < 15) {
    missingInformation.push('Measurable business KPIs and success criteria need to be detailed.');
  }
  if (!req.requiredIntegrations || req.requiredIntegrations.toLowerCase().includes('not sure') || req.requiredIntegrations.trim().length < 5) {
    technicalClarifications.push('Specific external software platforms, webhook endpoints, and data schema dependencies are unconfirmed.');
  } else {
    reasons.push(`Clear third-party integration scope articulated (${req.requiredIntegrations.slice(0, 60)}...).`);
  }

  // 7. Clamp matchScore
  matchScore = Math.max(10, Math.min(96, matchScore));

  // 8. Determine Feasibility Outcome
  let outcome: FeasibilityOutcome;
  if (unsupportedReasons.length > 0 || matchScore < 45) {
    outcome = 'Outside Current Mock Capabilities';
    recommendedAlternatives.push(
      'Adopt modern REST/GraphQL microservices architecture in place of proprietary legacy protocols.',
      'Phase the rollout into a cloud-native proof-of-concept first before connecting deeper internal systems.',
      'Connect with our Solutions Architecture desk for customized legacy adapter design.'
    );
  } else if (matchScore < 75 || missingInformation.length > 0 || technicalClarifications.length > 0) {
    outcome = 'Feasible With Clarifications';
    reasons.push('Core engineering patterns are well within Devmock capabilities, but key architectural decisions require a discovery workshop.');
  } else {
    outcome = 'Likely Feasible';
    reasons.push('Full alignment with Devmock reference architectures, standard libraries, and automated deployment blueprints.');
  }

  // 9. Generate Implementation Phases
  const totalWeeks = Math.max(3, Math.round((baseTimelineMin + baseTimelineMax) / 2));
  const totalEstimatedCost = Math.round((baseCostMin + baseCostMax) / 2);

  const phaseRatios = [
    { name: 'Discovery & Requirements Architecture', ratioWeeks: 0.15, ratioCost: 0.12, deliverables: ['System Architecture Document', 'Data Flow Diagrams', 'API Contract Specs'] },
    { name: 'UI/UX Design & Interactive Prototypes', ratioWeeks: 0.20, ratioCost: 0.18, deliverables: ['Figma Design System', 'Component Spec Sheet', 'User Journey Click-throughs'] },
    { name: 'Core Engineering & Integration', ratioWeeks: 0.40, ratioCost: 0.45, deliverables: ['Full-stack modules build', 'Third-party API synchronization', 'Automated Database Migrations'] },
    { name: 'Quality Assurance & Security Hardening', ratioWeeks: 0.15, ratioCost: 0.15, deliverables: ['E2E Automated Test Suites', 'Vulnerability Audit', 'Load Testing Report'] },
    { name: 'Deployment, Handover & Observability', ratioWeeks: 0.10, ratioCost: 0.10, deliverables: ['Production CI/CD Pipelines', 'Cloud Infra Provisioning', 'Developer Documentation & Runbooks'] },
  ];

  const implementationPhases: ImplementationPhase[] = phaseRatios.map(p => {
    const dWeeks = Math.max(1, Math.round(totalWeeks * p.ratioWeeks));
    const dCost = Math.round(totalEstimatedCost * p.ratioCost);
    return {
      name: p.name,
      description: `Structured milestone delivering verifiable artifacts and staging demos.`,
      durationWeeks: dWeeks,
      costAllocationINR: dCost,
      deliverables: p.deliverables
    };
  });

  // Recommended Tech Stack
  const recommendedTechStack = Array.from(new Set([...service.techTags, 'Docker', 'GitHub Actions']));

  // Team Roles
  const teamRoles = [
    'Lead Solutions Architect (Part-time)',
    'Senior Full-Stack Engineer',
    'UI/UX Product Designer',
    'QA & DevOps Automation Engineer'
  ];

  return {
    id: `assess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    requirementId: req.id,
    userId: req.userId,
    createdAt: new Date().toISOString(),
    projectTitle: req.title,
    serviceId: req.serviceId,
    serviceName: service.name,
    outcome,
    matchScore,
    summary: outcome === 'Likely Feasible'
      ? `Devmock can reliably engineer "${req.title}" using our validated production templates and full-stack delivery frameworks.`
      : outcome === 'Feasible With Clarifications'
      ? `"${req.title}" is viable with Devmock engineering, but requires resolving ${technicalClarifications.length || 1} architectural dependency questions before finalizing budget commitments.`
      : `"${req.title}" currently involves requirements, legacy barriers, or constraints outside our standard mock capability blueprint.`,
    reasons,
    missingInformation,
    technicalClarifications,
    recommendedTechStack,
    architectureOverview: `Cloud-native modular architecture utilizing ${recommendedTechStack.slice(0, 3).join(', ')} with automated containerized deployment, SSL encryption, and API telemetry.`,
    implementationPhases,
    estimatedTotalWeeks: totalWeeks,
    estimatedCostRangeINR: {
      min: baseCostMin,
      max: baseCostMax
    },
    teamRoles,
    dependenciesAndAssumptions: [
      'Client provides timely access to third-party sandbox credentials and API documentation.',
      'Staging environment acceptance criteria confirmed within 3 business days of milestone releases.',
      'Cloud hosting infrastructure costs are billed directly to client cloud accounts.'
    ],
    keyRisks: rule.commonRisks,
    suggestedEnhancements: [
      'Implement real-time OpenTelemetry APM logging for sub-second error tracking.',
      'Add automated weekly automated database snapshot backups to multi-region storage.',
      'Configure automated staging branch previews via GitHub Actions pull requests.'
    ],
    unsupportedReasons: unsupportedReasons.length > 0 ? unsupportedReasons : undefined,
    recommendedAlternatives: recommendedAlternatives.length > 0 ? recommendedAlternatives : undefined,
    isDemoNotice: COMPANY_CONFIG.demoNotice
  };
}
