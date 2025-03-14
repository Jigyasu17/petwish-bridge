
import React from 'react';
import { motion } from 'framer-motion';
import AddPetForm from '../components/AddPetForm';
import Footer from '../components/Footer';

const AddPet = () => {
  return (
    <div className="min-h-screen pt-24 md:pt-32">
      <motion.div 
        className="container mx-auto px-4 md:px-6 pb-16 md:pb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">List a Pet for Adoption</h1>
          <p className="text-gray-600">
            Complete the form below to add your pet to our adoption listings.
            Provide as much information as possible to help find the perfect match.
          </p>
        </div>
        
        <AddPetForm />
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default AddPet;
