import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface AuthUserProfile {
  id: string;
  email: string;
  fullName: string;
  mobile: string;
  role: 'customer' | 'admin';
  defaultAddress?: string;
  defaultCity?: string;
  defaultState?: string;
  defaultPincode?: string;
  authProvider: 'supabase' | 'local_session';
}

interface AuthContextValue {
  user: AuthUserProfile | null;
  loadingAuth: boolean;
  isAdminUnlocked: boolean;
  signInWithPassword: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signUpCustomer: (payload: {
    fullName: string;
    email: string;
    mobile: string;
    password: string;
  }) => Promise<{ ok: boolean; error?: string }>;
  signInWithMagicLink: (email: string) => Promise<{ ok: boolean; message: string }>;
  updateUserProfile: (updates: Partial<AuthUserProfile>) => Promise<void>;
  signOut: () => Promise<void>;
  unlockAdminConsole: (email: string, passcode: string) => Promise<{ ok: boolean; error?: string }>;
  lockAdminConsole: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const LOCAL_SESSION_KEY = 'aaranya_auth_session_v1';
const LOCAL_USERS_DB_KEY = 'aaranya_auth_users_db_v1';
const ADMIN_SESSION_KEY = 'aaranya_admin_unlocked_v1';

interface LocalUserAccount extends AuthUserProfile {
  passwordHash: string;
}

function getExpectedAdminPasscode(): string {
  return import.meta.env.VITE_ADMIN_PASSCODE || 'AARANYA2026';
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_SESSION_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loadingAuth, setLoadingAuth] = useState<boolean>(isSupabaseConfigured);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Sync with Supabase Auth session when configured
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoadingAuth(false);
      return;
    }

    let mounted = true;

    const loadSupabaseSession = async () => {
      const { data } = await supabase!.auth.getSession();
      const sbUser = data.session?.user;
      if (sbUser && mounted) {
        // Check user_profiles table for role & saved address
        const { data: profileRow } = await supabase!
          .from('user_profiles')
          .select('*')
          .eq('id', sbUser.id)
          .maybeSingle();

        const roleFromJwt =
          sbUser.app_metadata?.role === 'admin' || profileRow?.role === 'admin'
            ? 'admin'
            : 'customer';

        const profile: AuthUserProfile = {
          id: sbUser.id,
          email: sbUser.email || '',
          fullName:
            profileRow?.full_name ||
            sbUser.user_metadata?.full_name ||
            sbUser.email?.split('@')[0] ||
            'Aaranya Patron',
          mobile: profileRow?.mobile || sbUser.user_metadata?.mobile || '',
          role: roleFromJwt,
          defaultAddress: profileRow?.default_address || '',
          defaultCity: profileRow?.default_city || '',
          defaultState: profileRow?.default_state || 'Maharashtra',
          defaultPincode: profileRow?.default_pincode || '',
          authProvider: 'supabase'
        };

        setUser(profile);
        if (roleFromJwt === 'admin') {
          setIsAdminUnlocked(true);
        }
      }
      if (mounted) setLoadingAuth(false);
    };

    loadSupabaseSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setUser(null);
      } else {
        loadSupabaseSession();
      }
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const persistLocalSession = (profile: AuthUserProfile | null) => {
    setUser(profile);
    try {
      if (profile) {
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(profile));
      } else {
        localStorage.removeItem(LOCAL_SESSION_KEY);
      }
    } catch {
      // ignore storage errors
    }
  };

  const signInWithPassword = async (
    email: string,
    password: string
  ): Promise<{ ok: boolean; error?: string }> => {
    const normalizedEmail = email.trim().toLowerCase();

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password
      });
      if (error) {
        return { ok: false, error: error.message };
      }
      return { ok: true };
    }

    // Local Hybrid Auth Mode
    const usersDb: LocalUserAccount[] = JSON.parse(
      localStorage.getItem(LOCAL_USERS_DB_KEY) || '[]'
    );
    const existing = usersDb.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (!existing) {
      return {
        ok: false,
        error: 'No account found with this email. Please create an account first.'
      };
    }
    if (existing.passwordHash !== btoa(password)) {
      return { ok: false, error: 'Incorrect password. Please try again.' };
    }

    const { passwordHash: _unused, ...profile } = existing;
    persistLocalSession(profile);
    if (profile.role === 'admin') {
      setIsAdminUnlocked(true);
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
    }
    return { ok: true };
  };

  const signUpCustomer = async (payload: {
    fullName: string;
    email: string;
    mobile: string;
    password: string;
  }): Promise<{ ok: boolean; error?: string }> => {
    const normalizedEmail = payload.email.trim().toLowerCase();

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password: payload.password,
        options: {
          data: {
            full_name: payload.fullName.trim(),
            mobile: payload.mobile.trim()
          }
        }
      });
      if (error) {
        return { ok: false, error: error.message };
      }
      return { ok: true };
    }

    // Local Hybrid Auth Mode
    const usersDb: LocalUserAccount[] = JSON.parse(
      localStorage.getItem(LOCAL_USERS_DB_KEY) || '[]'
    );
    if (usersDb.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      return {
        ok: false,
        error: 'An account with this email already exists. Please sign in.'
      };
    }

    const newAccount: LocalUserAccount = {
      id: `usr-${Date.now()}`,
      email: normalizedEmail,
      fullName: payload.fullName.trim(),
      mobile: payload.mobile.trim(),
      role: normalizedEmail.endsWith('@aaranyaspices.com') ? 'admin' : 'customer',
      defaultState: 'Maharashtra',
      authProvider: 'local_session',
      passwordHash: btoa(payload.password)
    };

    localStorage.setItem(
      LOCAL_USERS_DB_KEY,
      JSON.stringify([newAccount, ...usersDb])
    );

    const { passwordHash: _unused, ...profile } = newAccount;
    persistLocalSession(profile);
    return { ok: true };
  };

  const signInWithMagicLink = async (
    email: string
  ): Promise<{ ok: boolean; message: string }> => {
    const normalizedEmail = email.trim().toLowerCase();
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithOtp({
        email: normalizedEmail,
        options: { emailRedirectTo: `${window.location.origin}/account` }
      });
      if (error) {
        return { ok: false, message: error.message };
      }
      return {
        ok: true,
        message: `A magic sign-in link has been dispatched to ${normalizedEmail}.`
      };
    }

    // In local hybrid mode, sign in or provision a passwordless session
    const profile: AuthUserProfile = {
      id: `usr-otp-${Date.now()}`,
      email: normalizedEmail,
      fullName: normalizedEmail.split('@')[0],
      mobile: '',
      role: normalizedEmail.endsWith('@aaranyaspices.com') ? 'admin' : 'customer',
      authProvider: 'local_session'
    };
    persistLocalSession(profile);
    return {
      ok: true,
      message: `Signed in as ${normalizedEmail} (Instant Local Magic Link Session).`
    };
  };

  const updateUserProfile = async (updates: Partial<AuthUserProfile>) => {
    if (!user) return;
    const updated: AuthUserProfile = { ...user, ...updates };
    persistLocalSession(updated);

    if (isSupabaseConfigured && supabase && user.authProvider === 'supabase') {
      await supabase
        .from('user_profiles')
        .update({
          full_name: updated.fullName,
          mobile: updated.mobile,
          default_address: updated.defaultAddress,
          default_city: updated.defaultCity,
          default_state: updated.defaultState,
          default_pincode: updated.defaultPincode,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    persistLocalSession(null);
    lockAdminConsole();
  };

  const unlockAdminConsole = async (
    email: string,
    passcode: string
  ): Promise<{ ok: boolean; error?: string }> => {
    const expectedPasscode = getExpectedAdminPasscode();

    // Verify admin passcode
    if (passcode.trim() !== expectedPasscode) {
      return {
        ok: false,
        error: 'Invalid Admin Security Key. Check VITE_ADMIN_PASSCODE in .env.'
      };
    }

    // If not currently signed in, create an admin session context for the operator
    if (!user && email.trim()) {
      const adminProfile: AuthUserProfile = {
        id: 'admin-operator',
        email: email.trim().toLowerCase(),
        fullName: 'Aaranya Operations Admin',
        mobile: '',
        role: 'admin',
        authProvider: isSupabaseConfigured ? 'supabase' : 'local_session'
      };
      persistLocalSession(adminProfile);
    }

    setIsAdminUnlocked(true);
    try {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
    } catch {
      // ignore
    }
    return { ok: true };
  };

  const lockAdminConsole = () => {
    setIsAdminUnlocked(false);
    try {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingAuth,
        isAdminUnlocked: isAdminUnlocked || user?.role === 'admin',
        signInWithPassword,
        signUpCustomer,
        signInWithMagicLink,
        updateUserProfile,
        signOut,
        unlockAdminConsole,
        lockAdminConsole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
