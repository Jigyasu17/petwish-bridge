import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import PetGrid from "../components/PetGrid";
import Testimonials from "../components/Testimonials";
import PetInfoSection from "../components/PetInfo/PetInfoSection";
import { useAuth } from '../context/AuthContext';

// Mock data for featured pets
const featuredPets = [
  {
    id: "1",
    name: "Max",
    breed: "Golden Retriever",
    age: "2 years",
    location: "New York, NY",
    category: "Dogs",
    images: ["https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1624&q=80"],
  },
  {
    id: "2",
    name: "Bella",
    breed: "Siamese",
    age: "1 year",
    location: "Los Angeles, CA",
    category: "Cats",
    images: ["https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"],
  },
  {
    id: "3",
    name: "Charlie",
    breed: "Parakeet",
    age: "6 months",
    location: "Chicago, IL",
    category: "Birds",
    images: ["https://images.unsplash.com/photo-1552728089-57bdde30beb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1150&q=80"],
  },
  {
    id: "4",
    name: "Lucy",
    breed: "Goldfish",
    age: "1 year",
    location: "Miami, FL",
    category: "Fish",
    images: ["https://images.unsplash.com/photo-1520302519317-d43bd0c59b7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"],
  },
  {
    id: "5",
    name: "Oliver",
    breed: "Dwarf Rabbit",
    age: "2 years",
    location: "Austin, TX",
    category: "Rabbits",
    images: ["https://images.unsplash.com/photo-1454949176113-dabe8797367c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80"],
  },
  {
    id: "6",
    name: "Coco",
    breed: "Guinea Pig",
    age: "1 year",
    location: "Seattle, WA",
    category: "Other",
    images: ["https://images.unsplash.com/photo-1535590069402-801818af5cc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=864&q=80"],
  },
];

// More pets data for the grid
const morePets = [
    {
        id: "7",
        name: "Buddy",
        breed: "Labrador Retriever",
        age: "3 years",
        location: "Denver, CO",
        category: "Dogs",
        images: ["https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"],
    },
    {
        id: "8",
        name: "Smokey",
        breed: "Persian",
        age: "4 years",
        location: "Portland, OR",
        category: "Cats",
        images: ["https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"],
    },
    {
        id: "9",
        name: "Kiwi",
        breed: "Cockatiel",
        age: "1 year",
        location: "San Francisco, CA",
        category: "Birds",
        images: ["https://images.unsplash.com/photo-1616625449499-c03771499087?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"],
    },
    {
        id: "10",
        name: "Nemo",
        breed: "Clownfish",
        age: "6 months",
        location: "San Diego, CA",
        category: "Fish",
        images: ["https://images.unsplash.com/photo-1568571455924-c2854d65abe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"],
    },
    {
        id: "11",
        name: "Thumper",
        breed: "Dutch Rabbit",
        age: "1.5 years",
        location: "Las Vegas, NV",
        category: "Rabbits",
        images: ["https://images.unsplash.com/photo-1604228859304-85e43f729051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"],
    },
    {
        id: "12",
        name: "Patches",
        breed: "Hamster",
        age: "8 months",
        location: "Phoenix, AZ",
        category: "Other",
        images: ["https://images.unsplash.com/photo-1573879432980-f7b95c42f998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80"],
    },
    {
        id: "13",
        name: "Rocky",
        breed: "Boxer",
        age: "2.5 years",
        location: "Dallas, TX",
        category: "Dogs",
        images: ["https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"],
    },
    {
        id: "14",
        name: "Cleo",
        breed: "Maine Coon",
        age: "3 years",
        location: "Atlanta, GA",
        category: "Cats",
        images: ["https://images.unsplash.com/photo-1583302438814-98801b298e95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"],
    },
    {
        id: "15",
        name: "Rio",
        breed: "Macaw",
        age: "5 years",
        location: "Orlando, FL",
        category: "Birds",
        images: ["https://images.unsplash.com/photo-1603431415463-7ccced46c013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"],
    },
    {
        id: "16",
        name: "Bubbles",
        breed: "Betta Fish",
        age: "9 months",
        location: "Houston, TX",
        category: "Fish",
        images: ["https://images.unsplash.com/photo-1622423427444-a79848b0923c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"],
    },
    {
        id: "17",
        name: "Snowball",
        breed: "Angora Rabbit",
        age: "2 years",
        location: "Minneapolis, MN",
        category: "Rabbits",
        images: ["https://images.unsplash.com/photo-1564855078188-fca9f9a122dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"],
    },
    {
        id: "18",
        name: "Nibbles",
        breed: "Chinchilla",
        age: "1.5 years",
        location: "St. Louis, MO",
        category: "Other",
        images: ["https://images.unsplash.com/photo-1623247373843-1ca939993824?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"],
    }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const Index = () => {
  const [searchParams] = useSearchParams();
  const [pets, setPets] = useState(featuredPets);
  const [filteredPets, setFilteredPets] = useState(pets);
  const { user } = useAuth();

  useEffect(() => {
    // Load more pets
    const allPets = [...featuredPets, ...morePets];
    setPets(allPets);
    setFilteredPets(allPets);
    
    // Apply filters from URL if present
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    
    if (category || search) {
      filterPets(allPets, category, search);
    }
  }, [searchParams]);

  const filterPets = (petList: any[], category: string | null, searchQuery: string | null) => {
    let filtered = [...petList];
    
    if (category) {
      filtered = filtered.filter(pet => 
        pet.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (searchQuery) {
      filtered = filtered.filter(pet =>
        pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredPets(filtered);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Pets Looking for a Home
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Browse our available pets and find your perfect companion. 
              Each one is waiting for a loving home.
            </motion.p>
          </div>
          
          <PetGrid pets={filteredPets} />
          
          {filteredPets.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No pets found</h3>
              <p className="text-gray-600">Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Pet Information Section */}
      <PetInfoSection />
      
      {/* Testimonials Section */}
      <Testimonials />
    </motion.div>
  );
};

export default Index;
