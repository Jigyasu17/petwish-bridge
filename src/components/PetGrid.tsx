
import React, { useState, useEffect } from 'react';
import PetCard, { Pet } from './PetCard';
import PetDetailModal from './PetDetailModal';
import SearchPets from './SearchPets';
import { Search, Dog, Cat, Fish, PawPrint } from 'lucide-react';

interface PetGridProps {
  pets: Pet[];
}

const PetGrid = ({ pets }: PetGridProps) => {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filteredPets, setFilteredPets] = useState<Pet[]>(pets);
  const [searchQuery, setSearchQuery] = useState('');

  // Update filtered pets when the main pet list changes
  useEffect(() => {
    setFilteredPets(pets);
  }, [pets]);

  const openModal = (pet: Pet) => {
    setSelectedPet(pet);
    setModalOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredPets(pets);
      return;
    }
    
    const lowercaseQuery = query.toLowerCase();
    const results = pets.filter(pet => 
      pet.name.toLowerCase().includes(lowercaseQuery) ||
      pet.breed.toLowerCase().includes(lowercaseQuery) ||
      pet.category.toLowerCase().includes(lowercaseQuery) ||
      pet.location.toLowerCase().includes(lowercaseQuery)
    );
    
    setFilteredPets(results);
  };
  
  // Get pet type icon
  const getPetIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'dogs':
        return <Dog size={20} />;
      case 'cats':
        return <Cat size={20} />;
      case 'fish':
        return <Fish size={20} />;
      default:
        return <PawPrint size={20} />;
    }
  };

  // Quick filters
  const quickFilters = [
    { name: 'Dogs', icon: <Dog size={18} /> },
    { name: 'Cats', icon: <Cat size={18} /> },
    { name: 'Fish', icon: <Fish size={18} /> },
    { name: 'All Pets', icon: <PawPrint size={18} /> }
  ];

  return (
    <>
      <div className="mb-8 space-y-4">
        <SearchPets 
          onSearch={handleSearch} 
          placeholder="Search by pet name, breed, or type..."
        />
        
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter) => (
            <button
              key={filter.name}
              onClick={() => filter.name === 'All Pets' 
                ? handleSearch('') 
                : handleSearch(filter.name.toLowerCase())}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${
                (filter.name.toLowerCase() === searchQuery.toLowerCase() || 
                (filter.name === 'All Pets' && !searchQuery))
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.icon}
              {filter.name}
            </button>
          ))}
        </div>
      </div>
      
      {filteredPets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredPets.map((pet) => (
            <PetCard 
              key={pet.id} 
              pet={pet} 
              onClick={() => openModal(pet)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex justify-center items-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Search size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">No pets found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            We couldn't find any pets matching "{searchQuery}". 
            Try a different search term or browse all available pets.
          </p>
          <button 
            onClick={() => handleSearch('')}
            className="mt-4 px-4 py-2 text-primary font-medium hover:underline"
          >
            View all pets
          </button>
        </div>
      )}
      
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
