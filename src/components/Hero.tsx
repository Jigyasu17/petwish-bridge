
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CategoryFilter } from './CategoryFilter';
import SearchPets from './SearchPets';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  
  const handleSearch = (query: string) => {
    // Add the search query to URL and navigate to home page
    // This will allow the Index component to pick up the search from URL
    navigate(`/?search=${encodeURIComponent(query)}`);
  };
  
  return (
    <section className="hero-gradient relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16 animate-fade-up">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Find your new best friend
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">
            Adopt a pet and <br className="hidden sm:block" />
            change a life forever
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
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
            <CategoryFilter />
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
      
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/60 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
    </section>
  );
};

export default Hero;
