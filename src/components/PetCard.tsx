
import React, { useState } from 'react';
import { Heart, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFavorites } from '../context/FavoritesContext';

export interface Pet {
  id: string;
  name: string;
  images: string[];
  age: string;
  breed: string;
  location: string;
  category: string;
}

interface PetCardProps {
  pet: Pet;
  onClick: () => void;
}

const PetCard = ({ pet, onClick }: PetCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(pet.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(pet.id);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={pet.images[0]} 
          alt={pet.name}
          className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'loaded scale-100' : 'scale-105'}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            isFavorite 
              ? 'bg-white/90 text-red-500' 
              : 'bg-black/20 text-white hover:bg-white/90 hover:text-gray-700'
          } transition-all backdrop-blur-sm`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        
        {/* Category Badge */}
        <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-sm text-white text-xs font-medium rounded-full">
          {pet.category}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 truncate">{pet.name}</h3>
        <p className="text-sm text-gray-600 mb-1">{pet.breed}</p>
        
        <div className="flex flex-col mt-4 gap-2">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin size={14} className="mr-1" />
            <span className="truncate">{pet.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-1" />
            <span>{pet.age}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PetCard;
