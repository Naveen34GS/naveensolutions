import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, FeasibilityAssessment } from '../types';
import { 
  getCurrentUser, 
  setCurrentUser, 
  saveUser, 
  getPendingServiceId, 
  setPendingServiceId,
  getSavedAssessments
} from '../lib/storage';
import { DEMO_USERS } from '../data/company';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<{ success: boolean; message?: string }>;
  register: (fullName: string, email: string, companyName: string, phone?: string) => Promise<{ success: boolean }>;
  logout: () => void;
  pendingServiceId: string | null;
  setPendingService: (serviceId: string | null) => void;
  recentAssessments: FeasibilityAssessment[];
  refreshUserData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => getCurrentUser());
  const [pendingServiceId, setPendingServiceState] = useState<string | null>(() => getPendingServiceId());
  const [recentAssessments, setRecentAssessments] = useState<FeasibilityAssessment[]>([]);

  const refreshUserData = () => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    if (currentUser) {
      setRecentAssessments(getSavedAssessments(currentUser.id));
    } else {
      setRecentAssessments([]);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  const login = async (email: string): Promise<{ success: boolean; message?: string }> => {
    const trimmed = email.trim().toLowerCase();
    // Check if in demo users or local storage
    const demoFound = DEMO_USERS.find(u => u.email.toLowerCase() === trimmed);
    if (demoFound) {
      setCurrentUser(demoFound);
      setUser(demoFound);
      setRecentAssessments(getSavedAssessments(demoFound.id));
      return { success: true };
    }

    // Otherwise create demo session with this email
    const fallbackUser: UserProfile = {
      id: `usr_${Date.now()}`,
      fullName: trimmed.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: trimmed,
      companyName: 'Client Enterprise Corp',
      createdAt: new Date().toISOString()
    };
    saveUser(fallbackUser);
    setCurrentUser(fallbackUser);
    setUser(fallbackUser);
    setRecentAssessments(getSavedAssessments(fallbackUser.id));
    return { success: true };
  };

  const register = async (
    fullName: string, 
    email: string, 
    companyName: string, 
    phone?: string
  ): Promise<{ success: boolean }> => {
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      fullName,
      email: email.trim().toLowerCase(),
      companyName,
      phone,
      createdAt: new Date().toISOString()
    };
    saveUser(newUser);
    setCurrentUser(newUser);
    setUser(newUser);
    setRecentAssessments(getSavedAssessments(newUser.id));
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setUser(null);
    setRecentAssessments([]);
  };

  const setPendingService = (serviceId: string | null) => {
    setPendingServiceId(serviceId);
    setPendingServiceState(serviceId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        pendingServiceId,
        setPendingService,
        recentAssessments,
        refreshUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
