
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface SearchPetsProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchPets = ({ onSearch, placeholder = "Search for pets..." }: SearchPetsProps) => {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center rounded-full border border-gray-200 bg-white overflow-hidden">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border-0 bg-transparent px-4 py-2 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button 
          type="submit" 
          variant="ghost" 
          className="p-2 text-gray-500 hover:text-primary"
        >
          <Search size={20} />
        </Button>
      </div>
    </form>
  );
};

export default SearchPets;
