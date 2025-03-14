
import React, { useState } from 'react';
import PetCard, { Pet } from './PetCard';
import PetDetailModal from './PetDetailModal';

interface PetGridProps {
  pets: Pet[];
}

const PetGrid = ({ pets }: PetGridProps) => {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (pet: Pet) => {
    setSelectedPet(pet);
    setModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {pets.map((pet) => (
          <PetCard 
            key={pet.id} 
            pet={pet} 
            onClick={() => openModal(pet)}
          />
        ))}
      </div>
      
      {selectedPet && (
        <PetDetailModal 
          pet={selectedPet}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default PetGrid;
