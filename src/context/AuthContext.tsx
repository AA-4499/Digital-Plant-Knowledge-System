'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { DEMO_USERS } from '../services/mockData';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  switchDemoRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Initialize session from localStorage if present
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('dpks_auth_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.warn('Could not read user session from storage', e);
    }
  }, []);

  const login = async (email: string): Promise<boolean> => {
    // Find matching demo user or default to conservation officer
    const matched = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim()
    ) || {
      id: 'custom-officer',
      email: email,
      name: 'Conservation Officer',
      role: 'conservation_officer' as UserRole,
      agency: 'Sarawak Forestry Corporation',
    };

    setUser(matched);
    try {
      localStorage.setItem('dpks_auth_user', JSON.stringify(matched));
    } catch (e) {
      console.warn('Could not persist session', e);
    }
    return true;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('dpks_auth_user');
    } catch (e) {
      console.warn('Could not clear session', e);
    }
  };

  const switchDemoRole = (role: UserRole) => {
    if (role === 'visitor') {
      logout();
      return;
    }
    const demo = DEMO_USERS.find((u) => u.role === role) || DEMO_USERS[0];
    setUser(demo);
    try {
      localStorage.setItem('dpks_auth_user', JSON.stringify(demo));
    } catch (e) {
      console.warn('Could not persist session', e);
    }
  };

  const role: UserRole = user?.role || 'visitor';
  const isAuthenticated = Boolean(user && user.role !== 'visitor');

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        login,
        logout,
        switchDemoRole,
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
