
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (petId: string) => void;
  isFavorite: (petId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('petFavorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Failed to parse favorites from localStorage', error);
      }
    }
  }, []);
  
  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('petFavorites', JSON.stringify(favorites));
  }, [favorites]);
  
  const toggleFavorite = (petId: string) => {
    setFavorites(prev => {
      const isFavorited = prev.includes(petId);
      
      if (isFavorited) {
        toast({
          title: "Removed from favorites",
          description: "The pet has been removed from your favorites",
        });
        return prev.filter(id => id !== petId);
      } else {
        toast({
          title: "Added to favorites",
          description: "The pet has been added to your favorites",
        });
        return [...prev, petId];
      }
    });
  };
  
  const isFavorite = (petId: string) => favorites.includes(petId);
  
  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
