
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for saved auth on mount
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('adoPetUser');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error('Failed to parse user from localStorage', error);
        }
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  const login = () => {
    // For demo - creating a mock user
    const mockUser = {
      id: '12345',
      name: 'Alex Johnson',
      email: 'alex@example.com',
      image: 'https://i.pravatar.cc/150?u=alex'
    };
    
    setUser(mockUser);
    localStorage.setItem('adoPetUser', JSON.stringify(mockUser));
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('adoPetUser');
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
