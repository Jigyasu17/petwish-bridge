
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cat, Dog, Bird, Fish, Rabbit, Plus } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
}

const categories: Category[] = [
  { id: 'dogs', name: 'Dogs', icon: Dog },
  { id: 'cats', name: 'Cats', icon: Cat },
  { id: 'birds', name: 'Birds', icon: Bird },
  { id: 'fish', name: 'Fish', icon: Fish },
  { id: 'rabbits', name: 'Rabbits', icon: Rabbit },
  { id: 'other', name: 'Other', icon: Plus },
];

export const CategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
      {categories.map((category) => (
        <CategoryButton 
          key={category.id}
          category={category}
          isSelected={selectedCategory === category.id}
          onClick={() => setSelectedCategory(
            selectedCategory === category.id ? null : category.id
          )}
        />
      ))}
    </div>
  );
};

interface CategoryButtonProps {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryButton = ({ category, isSelected, onClick }: CategoryButtonProps) => {
  const Icon = category.icon;
  
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative px-5 py-2 rounded-full flex items-center gap-2 ${
        isSelected 
          ? 'bg-primary text-white' 
          : 'bg-white text-gray-700 hover:bg-gray-50'
      } transition-colors shadow-sm`}
    >
      <Icon size={16} />
      <span className="text-sm font-medium">{category.name}</span>
      
      {isSelected && (
        <motion.span 
          layoutId="categoryIndicator"
          className="absolute inset-0 rounded-full bg-primary -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.button>
  );
};
