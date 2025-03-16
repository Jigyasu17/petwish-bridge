
import React, { useState } from 'react';
import { X, MapPin, Calendar, Info, Heart, MessageCircle } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Pet } from './PetCard';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';

interface PetDetailModalProps {
  pet: Pet;
  open: boolean;
  onClose: () => void;
}

const PetDetailModal = ({ pet, open, onClose }: PetDetailModalProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { favorites, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const isFavorite = favorites.includes(pet.id);
  
  const handleFavoriteClick = () => {
    toggleFavorite(pet.id);
  };
  
  const handleInquiry = () => {
    if (!user) {
      // Instead of calling login without parameters, just inform the user
      alert('Please sign in to inquire about this pet');
      return;
    }
    // Would normally open a messaging UI
    alert('Inquiry functionality will be implemented in the next version');
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 overflow-y-auto flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-fade-in shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid md:grid-cols-2 h-full">
            {/* Image Section */}
            <div className="relative h-full">
              <div className="relative h-64 md:h-full overflow-hidden">
                <button
                  onClick={onClose}
                  className="absolute top-4 left-4 z-10 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
                
                <img 
                  src={pet.images[activeImageIndex]} 
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Thumbnail Gallery */}
                {pet.images.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {pet.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-2 h-2 rounded-full ${
                          activeImageIndex === index 
                            ? 'bg-white' 
                            : 'bg-white/40'
                        } transition-all`}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Content Section */}
            <div className="p-6 overflow-y-auto flex flex-col h-full">
              <div className="mb-auto">
                <h2 className="text-2xl font-bold mb-1">{pet.name}</h2>
                <p className="text-gray-600 mb-4">{pet.breed}</p>
                
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex items-center text-gray-700">
                    <MapPin size={18} className="mr-2 text-gray-400" />
                    <span>{pet.location}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar size={18} className="mr-2 text-gray-400" />
                    <span>{pet.age}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl mb-6">
                  <div className="flex items-start gap-2 mb-2">
                    <Info size={18} className="text-primary mt-0.5" />
                    <h3 className="text-lg font-medium">About {pet.name}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {pet.name} is a loving {pet.category.toLowerCase()} looking for a forever home. 
                    They are friendly, playful, and would make a wonderful addition to the right family.
                    {pet.name} has been vaccinated and is in good health.
                  </p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                <Button 
                  onClick={handleFavoriteClick} 
                  variant={isFavorite ? "secondary" : "outline"}
                  className={`flex-1 py-6 ${isFavorite ? 'text-primary' : ''}`}
                >
                  <Heart size={18} className="mr-2" fill={isFavorite ? 'currentColor' : 'none'} />
                  {isFavorite ? 'Saved' : 'Save'}
                </Button>
                <Button 
                  onClick={handleInquiry} 
                  className="flex-1 py-6 bg-primary hover:bg-primary/90"
                >
                  <MessageCircle size={18} className="mr-2" />
                  Inquire
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default PetDetailModal;
