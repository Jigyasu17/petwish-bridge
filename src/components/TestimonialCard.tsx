
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

const TestimonialCard = ({ name, role, content, avatar, rating }: TestimonialProps) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
      }}
      className="h-full"
    >
      <Card className="h-full border border-gray-100 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/20">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <img src={avatar} alt={name} className="rounded-full object-cover" />
              </Avatar>
              <div className="ml-3">
                <h4 className="font-semibold text-gray-900">{name}</h4>
                <p className="text-sm text-gray-500">{role}</p>
              </div>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  className={`${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
          </div>
          
          <div className="relative">
            <svg className="absolute top-0 left-0 w-10 h-10 text-primary/20 -mt-2 -ml-3" 
                 fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
            </svg>
            <p className="relative pt-3 px-2 text-gray-600 italic leading-relaxed">{content}</p>
          </div>
          
          <div className="mt-auto pt-4">
            <div className="w-16 h-1 bg-primary/40 rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;
