
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CategoryFilter } from './CategoryFilter';
import SearchPets from './SearchPets';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  
  const handleSearch = (query: string) => {
    // Add the search query to URL and navigate to home page
    navigate(`/?search=${encodeURIComponent(query)}`);
  };
  
  const handleCategorySelect = (category: string | null) => {
    // Navigate with the selected category
    if (category) {
      navigate(`/?category=${encodeURIComponent(category)}`);
    } else {
      navigate('/');
    }
  };
  
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
          alt="Happy dogs and people at adoption event" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/75 backdrop-blur-sm"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16 animate-fade-up">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-amber-400/20 text-amber-600 text-sm font-medium">
            Find your new best friend
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight text-gray-900">
            Adopt a pet and <br className="hidden sm:block" />
            change a life forever
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Connect with rescue pets from shelters and find the perfect companion. 
            Every adoption creates space for another animal in need.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="flex items-center mb-8 overflow-hidden">
              <div className="flex-1 relative">
                <SearchPets 
                  onSearch={handleSearch}
                  placeholder="Search for dogs, cats, and more..."
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <CategoryFilter onSelectCategory={handleCategorySelect} />
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
          {[
            { number: '10,000+', label: 'Pets Adopted' },
            { number: '1,000+', label: 'Rescue Partners' },
            { number: '50+', label: 'Cities' },
            { number: '24/7', label: 'Support' },
          ].map((stat, index) => (
            <div key={index} className="glass-card px-4 py-6 rounded-2xl text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
