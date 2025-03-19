
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TestimonialCard from './TestimonialCard';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

// Mock testimonial data
const testimonialData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Dog Adopter",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    content: "Adopting Max changed our lives completely. The process was so smooth and the team was incredibly supportive. I can't imagine our family without him now!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Cat Parent",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    content: "Luna is the perfect addition to our home. She has such a playful personality and has brought so much joy to our family. The adoption process was straightforward and caring.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Rescue Advocate",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    content: "As someone who has adopted multiple pets, I can say this platform is by far the best. They truly care about matching pets with the right forever homes.",
    rating: 4
  },
  {
    id: 4,
    name: "David Thompson",
    role: "First-time Pet Owner",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    content: "Being a first-time pet owner was intimidating, but the resources and support provided made everything so much easier. Bella has been the best companion during tough times.",
    rating: 5
  },
  {
    id: 5,
    name: "Olivia Patel",
    role: "Family Adopter",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    content: "We adopted two kittens who have brought endless entertainment to our household. The follow-up care and check-ins showed how much they care about the animals' wellbeing.",
    rating: 5
  }
];

const Testimonials = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <section className="py-16 md:py-24 overflow-hidden bg-white relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="relative inline-block">
              Happy Adopters
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/40 rounded-full"></span>
            </span>
          </h2>
          <p className="text-gray-600 md:text-lg">
            Hear from families who found their perfect companions through our platform.
          </p>
        </motion.div>
        
        <Carousel 
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonialData.map((testimonial) => (
              <CarouselItem 
                key={testimonial.id} 
                className={`pl-4 md:basis-1/2 ${isMobile ? 'basis-full' : 'lg:basis-1/3'}`}
              >
                <TestimonialCard {...testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="relative static left-0 translate-y-0 mr-2" />
            <CarouselNext className="relative static right-0 translate-y-0 ml-2" />
          </div>
        </Carousel>

        <div className="mt-12 text-center">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-6 py-3 bg-primary/10 text-primary-foreground border border-primary/20 rounded-full font-medium hover:bg-primary/20 transition-colors"
            href="#share-story"
          >
            Share Your Adoption Story
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
