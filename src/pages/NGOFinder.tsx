
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Search, Filter, Dog, Cat, Fish, PawPrint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NGOList from '@/components/NGOList';
import NGOMap from '@/components/NGOMap';
import { useToast } from '@/components/ui/use-toast';

export interface NGO {
  id: string;
  name: string;
  address: string;
  distance: number; // in kilometers
  contact: string;
  email: string;
  website: string;
  petTypes: string[];
  services: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Mock data for demonstration
const mockNGOs: NGO[] = [
  {
    id: '1',
    name: 'Paws & Hearts Rescue',
    address: '123 Animal Lane, Downtown',
    distance: 1.2,
    contact: '+1 (555) 123-4567',
    email: 'info@pawsandhearts.org',
    website: 'https://pawsandhearts.org',
    petTypes: ['dogs', 'cats'],
    services: ['adoption', 'foster', 'medical'],
    coordinates: {
      lat: 40.7128,
      lng: -74.0060
    }
  },
  {
    id: '2',
    name: 'Furry Friends Foundation',
    address: '456 Pet Street, Uptown',
    distance: 2.5,
    contact: '+1 (555) 987-6543',
    email: 'contact@furryfriends.org',
    website: 'https://furryfriends.org',
    petTypes: ['cats', 'rabbits'],
    services: ['adoption', 'shelter', 'education'],
    coordinates: {
      lat: 40.7200,
      lng: -73.9800
    }
  },
  {
    id: '3',
    name: 'Exotic Animal Sanctuary',
    address: '789 Wildlife Road, Westside',
    distance: 3.7,
    contact: '+1 (555) 456-7890',
    email: 'help@exoticsanctuary.org',
    website: 'https://exoticsanctuary.org',
    petTypes: ['birds', 'fish', 'reptiles'],
    services: ['adoption', 'rehabilitation', 'conservation'],
    coordinates: {
      lat: 40.7300,
      lng: -74.0200
    }
  },
  {
    id: '4',
    name: 'Hope For Paws',
    address: '101 Rescue Avenue, Eastside',
    distance: 4.1,
    contact: '+1 (555) 789-0123',
    email: 'info@hopeforpaws.org',
    website: 'https://hopeforpaws.org',
    petTypes: ['dogs', 'cats', 'rabbits'],
    services: ['adoption', 'foster', 'veterinary'],
    coordinates: {
      lat: 40.7050,
      lng: -73.9900
    }
  },
  {
    id: '5',
    name: 'Second Chance Animal Shelter',
    address: '202 New Life Blvd, North District',
    distance: 4.9,
    contact: '+1 (555) 321-6547',
    email: 'help@secondchance.org',
    website: 'https://secondchance.org',
    petTypes: ['dogs', 'cats', 'other'],
    services: ['adoption', 'shelter', 'training'],
    coordinates: {
      lat: 40.7400,
      lng: -74.0100
    }
  }
];

const NGOFinder = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);
  const [NGOs, setNGOs] = useState<NGO[]>(mockNGOs);
  const [filteredNGOs, setFilteredNGOs] = useState<NGO[]>(mockNGOs);
  const [isLocating, setIsLocating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const { toast } = useToast();

  useEffect(() => {
    // Apply filters based on search params
    const filterParam = searchParams.get('filter');
    if (filterParam) {
      setActiveFilter(filterParam);
      handleFilterChange(filterParam);
    }
  }, [searchParams]);

  const getUserLocation = () => {
    setIsLocating(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive"
      });
      setIsLocating(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        
        // In a real app, this would fetch NGOs based on user location from an API
        // For now, we'll just use our mock data and simulate the effect
        toast({
          title: "Location found!",
          description: "Showing NGOs within 5km of your location",
        });
        
        setIsLocating(false);
      },
      (error) => {
        let errorMessage = "Failed to get your location.";
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Please allow location access to use this feature.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive"
        });
        
        setIsLocating(false);
      }
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim() === '') {
      setFilteredNGOs(NGOs);
      return;
    }
    
    const filtered = NGOs.filter(ngo => 
      ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ngo.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ngo.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    setFilteredNGOs(filtered);
  };

  const handleFilterChange = (filter: string) => {
    if (filter === activeFilter) {
      // Deactivate filter
      setActiveFilter(null);
      setFilteredNGOs(NGOs);
      
      // Remove from URL
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);
        newParams.delete('filter');
        return newParams;
      });
    } else {
      // Activate filter
      setActiveFilter(filter);
      
      // Filter NGOs by pet type
      const filtered = NGOs.filter(ngo => 
        ngo.petTypes.map(type => type.toLowerCase()).includes(filter.toLowerCase())
      );
      
      setFilteredNGOs(filtered);
      
      // Update URL
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);
        newParams.set('filter', filter);
        return newParams;
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-12"
    >
      <h1 className="text-3xl font-bold mb-2">Find NGOs Near You</h1>
      <p className="text-gray-600 mb-8">Discover animal welfare organizations within 5km of your location</p>
      
      {/* Location Card */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">Your Location</h2>
            {userLocation ? (
              <p className="text-gray-600 flex items-center">
                <MapPin size={18} className="mr-2 text-primary" />
                Using your current location
              </p>
            ) : (
              <p className="text-gray-600">Please enable location services to find NGOs near you</p>
            )}
          </div>
          <div>
            <Button
              onClick={getUserLocation}
              disabled={isLocating}
              className="w-full md:w-auto"
            >
              {isLocating ? 'Locating...' : userLocation ? 'Update Location' : 'Use My Location'}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search NGOs by name, address or services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Search size={18} className="mr-2" />
              Search
            </Button>
          </div>
        </form>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleFilterChange('dogs')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${
              activeFilter === 'dogs'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Dog size={16} />
            Dogs
          </button>
          <button
            onClick={() => handleFilterChange('cats')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${
              activeFilter === 'cats'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Cat size={16} />
            Cats
          </button>
          <button
            onClick={() => handleFilterChange('fish')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${
              activeFilter === 'fish'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Fish size={16} />
            Fish
          </button>
          <button
            onClick={() => handleFilterChange('rabbits')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${
              activeFilter === 'rabbits'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <PawPrint size={16} />
            Rabbits
          </button>
          <button
            onClick={() => handleFilterChange('birds')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${
              activeFilter === 'birds'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <PawPrint size={16} />
            Birds
          </button>
          <button
            onClick={() => handleFilterChange('reptiles')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${
              activeFilter === 'reptiles'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <PawPrint size={16} />
            Reptiles
          </button>
        </div>
      </div>
      
      {/* View Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-full p-1 shadow-sm inline-flex">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              viewMode === 'list'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              viewMode === 'map'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Map View
          </button>
        </div>
      </div>
      
      {/* Results */}
      {viewMode === 'list' ? (
        <NGOList ngos={filteredNGOs} userLocation={userLocation} />
      ) : (
        <NGOMap ngos={filteredNGOs} userLocation={userLocation} />
      )}
    </motion.div>
  );
};

export default NGOFinder;
