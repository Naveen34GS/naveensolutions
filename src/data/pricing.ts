import { ProjectComplexity, BudgetRange, ExpectedDeliveryTime } from '../types';

export interface ComplexityMultiplier {
  costMultiplier: number;
  durationMultiplier: number;
}

export const COMPLEXITY_FACTORS: Record<ProjectComplexity, ComplexityMultiplier> = {
  'Small': { costMultiplier: 0.8, durationMultiplier: 0.8 },
  'Medium': { costMultiplier: 1.0, durationMultiplier: 1.0 },
  'Large': { costMultiplier: 1.6, durationMultiplier: 1.5 },
  'Unsure': { costMultiplier: 1.1, durationMultiplier: 1.1 }
};

export const BUDGET_RANGE_MIN_MAP: Record<BudgetRange, number> = {
  'Under ₹50,000': 30000,
  '₹50,000–₹2,00,000': 50000,
  '₹2,00,000–₹5,00,000': 200000,
  '₹5,00,000–₹10,00,000': 500000,
  'Above ₹10,00,000': 1000000,
  'Not decided': 0
};

export const DELIVERY_WEEKS_MAX_MAP: Record<ExpectedDeliveryTime, number> = {
  'Within 2 weeks': 2,
  'Within 1 month': 4,
  'Within 2–3 months': 12,
  'Within 3–6 months': 24,
  'Flexible': 52
};

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}
