
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const AddPetForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Success!",
        description: "Your pet has been added for adoption.",
      });
      navigate('/');
    }, 1500);
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    // For demo purposes, we'll use placeholder images
    const newImages = Array.from(files).map(() => 
      `https://images.unsplash.com/photo-${Math.random().toString().substring(2, 18)}?auto=format&fit=crop&w=800&q=80`
    );
    
    setImages([...images, ...newImages]);
  };
  
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
      {/* Pet Images */}
      <div className="space-y-2">
        <Label htmlFor="images">Pet Photos</Label>
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-square rounded-md overflow-hidden bg-gray-100">
              <img 
                src={image} 
                alt={`Pet preview ${index}`} 
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 p-1 rounded-full bg-black/50 text-white hover:bg-black/70"
                aria-label="Remove image"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          
          {images.length < 8 && (
            <label className="aspect-square rounded-md border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-gray-300 transition-colors">
              <Camera size={24} className="text-gray-400 mb-2" />
              <span className="text-xs text-gray-500">Add Photo</span>
              <input 
                type="file"
                id="images"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">Upload up to 8 photos (max 5MB each)</p>
      </div>
      
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Pet Name</Label>
          <Input id="name" placeholder="Enter pet name" required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Pet Type</Label>
          <Select id="category" defaultValue="">
            <option value="" disabled>Select pet type</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="fish">Fish</option>
            <option value="rabbit">Rabbit</option>
            <option value="other">Other</option>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="breed">Breed</Label>
          <Input id="breed" placeholder="Enter breed" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input id="age" placeholder="e.g., 2 years" />
        </div>
      </div>
      
      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" placeholder="Enter city, state" required />
      </div>
      
      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          placeholder="Describe your pet, personality, habits, etc." 
          rows={5} 
        />
      </div>
      
      {/* Contact Information */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="contactName">Your Name</Label>
            <Input id="contactName" placeholder="Enter your name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Phone Number</Label>
            <Input id="contactPhone" type="tel" placeholder="Enter phone number" required />
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <Button 
          type="submit" 
          className="w-full py-6 bg-primary hover:bg-primary/90"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span className="flex items-center">
              <Plus size={18} className="mr-2" />
              List for Adoption
            </span>
          )}
        </Button>
      </div>
    </form>
  );
};

export default AddPetForm;
