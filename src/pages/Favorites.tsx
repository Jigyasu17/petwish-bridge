
import React from 'react';
import { motion } from 'framer-motion';
import PetGrid from '../components/PetGrid';
import Footer from '../components/Footer';
import { useFavorites } from '../context/FavoritesContext';
import { Pet } from '../components/PetCard';
import { Heart } from 'lucide-react';

// Mock data - in a real app, you would fetch these based on favorite IDs
const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Max',
    images: [
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80'
    ],
    age: '2 years',
    breed: 'Golden Retriever',
    location: 'San Francisco, CA',
    category: 'Dogs'
  },
  {
    id: '2',
    name: 'Luna',
    images: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1043&q=80',
      'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
    ],
    age: '1 year',
    breed: 'Domestic Shorthair',
    location: 'Los Angeles, CA',
    category: 'Cats'
  },
  {
    id: '5',
    name: 'Rocky',
    images: [
      'https://images.unsplash.com/photo-1598875184988-5e67b1a874b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80'
    ],
    age: '4 years',
    breed: 'Bulldog',
    location: 'Miami, FL',
    category: 'Dogs'
  },
  {
    id: '8',
    name: 'Milo',
    images: [
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
      'https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
    ],
    age: '2 years',
    breed: 'Bengal',
    location: 'Boston, MA',
    category: 'Cats'
  }
];

const Favorites = () => {
  const { favorites } = useFavorites();
  
  // Filter our mock data to only include pets that are in the favorites
  const favoritePets = mockPets.filter(pet => favorites.includes(pet.id));
  
  return (
    <div className="min-h-screen pt-24 md:pt-32">
      <motion.div 
        className="container mx-auto px-4 md:px-6 pb-16 md:pb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Your Favorite Pets</h1>
          <p className="text-gray-600">
            Here are the pets you've saved to revisit later.
          </p>
        </div>
        
        {favoritePets.length > 0 ? (
          <PetGrid pets={favoritePets} />
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <Heart size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl md:text-2xl font-medium mb-2">No favorites yet</h3>
            <p className="text-gray-600 mb-6">
              When you find pets you're interested in, save them here to revisit later.
            </p>
            <a 
              href="/" 
              className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 font-medium transition-colors inline-block"
            >
              Browse Pets
            </a>
          </div>
        )}
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default Favorites;
