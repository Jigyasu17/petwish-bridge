
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero';
import PetGrid from '../components/PetGrid';
import Footer from '../components/Footer';
import { Pet } from '../components/PetCard';
import { motion } from 'framer-motion';

// Mock data for the pet listings
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
    id: '3',
    name: 'Charlie',
    images: [
      'https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80'
    ],
    age: '3 years',
    breed: 'Labrador',
    location: 'New York, NY',
    category: 'Fish'
  },
  {
    id: '4',
    name: 'Bella',
    images: [
      'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
      'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
    ],
    age: '6 months',
    breed: 'Siamese',
    location: 'Chicago, IL',
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
    id: '6',
    name: 'Oliver',
    images: [
      'https://images.unsplash.com/photo-1548546738-8509cb246ed3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
      'https://images.unsplash.com/photo-1536590158209-e9d615d525e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
    ],
    age: '1 year',
    breed: 'Maine Coon',
    location: 'Seattle, WA',
    category: 'Cats'
  },
  {
    id: '7',
    name: 'Daisy',
    images: [
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
      'https://images.unsplash.com/photo-1598875706250-21faaf804361?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
    ],
    age: '5 years',
    breed: 'Poodle',
    location: 'Dallas, TX',
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

const Index = () => {
  const [pets] = useState<Pet[]>(mockPets);
  const [searchParams] = useSearchParams();
  const [filteredPets, setFilteredPets] = useState<Pet[]>(mockPets);
  
  // Get search query and category from URL params
  const searchQuery = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';
  
  // Filter pets when search query or category changes
  useEffect(() => {
    let filtered = [...pets];
    
    // Apply search filter if exists
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(pet => 
        pet.name.toLowerCase().includes(lowercaseQuery) ||
        pet.breed.toLowerCase().includes(lowercaseQuery) ||
        pet.category.toLowerCase().includes(lowercaseQuery) ||
        pet.location.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Apply category filter if exists
    if (categoryFilter) {
      filtered = filtered.filter(pet => 
        pet.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    
    setFilteredPets(filtered);
  }, [pets, searchQuery, categoryFilter]);
  
  return (
    <div className="min-h-screen">
      <Hero />
      
      <motion.section 
        className="py-16 md:py-24 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">Pets Available for Adoption</h2>
              <p className="text-gray-600 max-w-2xl">
                Find your perfect companion from our selection of lovable pets looking for their forever homes.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              {/* This could be expanded with more filtering options */}
              <select className="py-2 px-4 border border-gray-200 rounded-md bg-white text-gray-800 text-sm">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
          
          <PetGrid pets={filteredPets} />
          
          <div className="mt-12 text-center">
            <button className="px-8 py-3 border border-primary text-primary rounded-full hover:bg-primary/5 font-medium transition-colors">
              Load More Pets
            </button>
          </div>
        </div>
      </motion.section>
      
      {/* Awareness Banner */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-primary/10 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 text-gray-900">
              Why Adopt, Not Shop?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              When you adopt, you save a loving animal from a shelter and make room for others. 
              6.5 million pets enter shelters each year - your choice to adopt truly matters.
            </p>
            <button className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 font-medium transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
