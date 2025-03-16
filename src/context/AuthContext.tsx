
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { toast } from '../hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for saved auth on mount and set up auth subscription
  useEffect(() => {
    // Set initial user
    const setInitialUser = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data.session?.user) {
          const { id, email } = data.session.user;
          
          // Get user profile from Supabase
          const { data: profile } = await supabase
            .from('profiles')
            .select('name, avatar_url')
            .eq('id', id)
            .maybeSingle();
            
          setUser({
            id,
            email: email || '',
            name: profile?.name || email?.split('@')[0] || 'User',
            image: profile?.avatar_url
          });
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user session', error);
        setIsLoading(false);
      }
    };
    
    setInitialUser();
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session);
        if (session?.user) {
          const { id, email } = session.user;
          
          // Get user profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('name, avatar_url')
            .eq('id', id)
            .maybeSingle();
            
          setUser({
            id,
            email: email || '',
            name: profile?.name || email?.split('@')[0] || 'User',
            image: profile?.avatar_url
          });
        } else {
          setUser(null);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const signUp = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      
      console.log('Signing up with:', { email, password, name });
      
      // Create auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          }
        }
      });
      
      if (error) throw error;
      
      console.log('Signup response:', data);
      
      // Create profile entry if user is created
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { id: data.user.id, name, email }
          ]);
          
        if (profileError) {
          console.error('Profile creation error:', profileError);
          throw profileError;
        }
      }
      
      toast({
        title: "Account created",
        description: "Please check your email to confirm your account.",
      });
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Google authentication initiated",
        description: "You'll be redirected to Google for authentication.",
      });
    } catch (error: any) {
      console.error('Google sign in error:', error);
      toast({
        title: "Google sign in failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, login, signUp, signInWithGoogle, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
