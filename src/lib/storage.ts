import { UserProfile, ProjectRequirement, FeasibilityAssessment, ConsultationBooking } from '../types';

const STORAGE_KEYS = {
  CURRENT_USER: 'devmock_current_user',
  ALL_USERS: 'devmock_registered_users',
  SELECTED_SERVICE_ID: 'devmock_selected_service_id',
  SAVED_DRAFTS: 'devmock_project_drafts',
  SAVED_REQUIREMENTS: 'devmock_project_requirements',
  SAVED_ASSESSMENTS: 'devmock_assessments',
  SAVED_BOOKINGS: 'devmock_bookings',
};

// Safe JSON Parse helper
function safeGet<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.error(`Error reading ${key} from LocalStorage:`, e);
    return defaultValue;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to LocalStorage:`, e);
  }
}

// User / Auth
export function getCurrentUser(): UserProfile | null {
  return safeGet<UserProfile | null>(STORAGE_KEYS.CURRENT_USER, null);
}

export function setCurrentUser(user: UserProfile | null): void {
  if (user) {
    safeSet(STORAGE_KEYS.CURRENT_USER, user);
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
}

export function getAllUsers(): UserProfile[] {
  return safeGet<UserProfile[]>(STORAGE_KEYS.ALL_USERS, []);
}

export function saveUser(user: UserProfile): void {
  const users = getAllUsers();
  const existingIdx = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
  if (existingIdx >= 0) {
    users[existingIdx] = user;
  } else {
    users.push(user);
  }
  safeSet(STORAGE_KEYS.ALL_USERS, users);
}

// Selected Service pending evaluation
export function getPendingServiceId(): string | null {
  return localStorage.getItem(STORAGE_KEYS.SELECTED_SERVICE_ID);
}

export function setPendingServiceId(serviceId: string | null): void {
  if (serviceId) {
    localStorage.setItem(STORAGE_KEYS.SELECTED_SERVICE_ID, serviceId);
  } else {
    localStorage.removeItem(STORAGE_KEYS.SELECTED_SERVICE_ID);
  }
}

// Requirements & Drafts
export function getSavedDraft(userId: string): Partial<ProjectRequirement> | null {
  const drafts = safeGet<Record<string, Partial<ProjectRequirement>>>(STORAGE_KEYS.SAVED_DRAFTS, {});
  return drafts[userId] || null;
}

export function saveDraft(userId: string, draft: Partial<ProjectRequirement>): void {
  const drafts = safeGet<Record<string, Partial<ProjectRequirement>>>(STORAGE_KEYS.SAVED_DRAFTS, {});
  drafts[userId] = draft;
  safeSet(STORAGE_KEYS.SAVED_DRAFTS, drafts);
}

export function clearDraft(userId: string): void {
  const drafts = safeGet<Record<string, Partial<ProjectRequirement>>>(STORAGE_KEYS.SAVED_DRAFTS, {});
  delete drafts[userId];
  safeSet(STORAGE_KEYS.SAVED_DRAFTS, drafts);
}

export function getSavedRequirements(userId?: string): ProjectRequirement[] {
  const all = safeGet<ProjectRequirement[]>(STORAGE_KEYS.SAVED_REQUIREMENTS, []);
  if (!userId) return all;
  return all.filter(r => r.userId === userId);
}

export function saveRequirement(req: ProjectRequirement): void {
  const all = getSavedRequirements();
  const idx = all.findIndex(r => r.id === req.id);
  if (idx >= 0) {
    all[idx] = req;
  } else {
    all.unshift(req);
  }
  safeSet(STORAGE_KEYS.SAVED_REQUIREMENTS, all);
}

// Assessments
export function getSavedAssessments(userId?: string): FeasibilityAssessment[] {
  const all = safeGet<FeasibilityAssessment[]>(STORAGE_KEYS.SAVED_ASSESSMENTS, []);
  if (!userId) return all;
  return all.filter(a => a.userId === userId);
}

export function getAssessmentById(id: string): FeasibilityAssessment | null {
  const all = getSavedAssessments();
  return all.find(a => a.id === id) || null;
}

export function saveAssessment(assessment: FeasibilityAssessment): void {
  const all = getSavedAssessments();
  const idx = all.findIndex(a => a.id === assessment.id);
  if (idx >= 0) {
    all[idx] = assessment;
  } else {
    all.unshift(assessment);
  }
  safeSet(STORAGE_KEYS.SAVED_ASSESSMENTS, all);
}

// Bookings
export function getSavedBookings(userId?: string): ConsultationBooking[] {
  const all = safeGet<ConsultationBooking[]>(STORAGE_KEYS.SAVED_BOOKINGS, []);
  if (!userId) return all;
  return all.filter(b => b.userId === userId);
}

export function isSlotTaken(date: string, slot: string): boolean {
  const all = getSavedBookings();
  return all.some(b => b.consultationDate === date && b.timeSlot === slot && b.status !== 'Cancelled');
}

export function saveBooking(booking: ConsultationBooking): void {
  const all = getSavedBookings();
  all.unshift(booking);
  safeSet(STORAGE_KEYS.SAVED_BOOKINGS, all);
}
