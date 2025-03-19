
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Utensils, Running, Vaccine, Brush, Bath, GraduationCap, Users, 
  ScanLine, Box, BowlFood, Scissors, Activity, MousePointerClick, 
  Target, Clock, Home, Apple, Music, Map, Droplets, Thermometer, 
  Wheat, Eye, Search, FileText, Settings, UserCheck, Brain, Calendar,
  PalmTree, Puzzle, Spray
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface InfoItem {
  title: string;
  content: string;
  iconName: string;
}

interface PetInfoCardProps {
  info: InfoItem;
  color: string;
}

const PetInfoCard: React.FC<PetInfoCardProps> = ({ info, color }) => {
  // Map icon names to Lucide React components
  const iconMap: Record<string, React.ReactNode> = {
    'utensils': <Utensils size={20} />,
    'running': <Running size={20} />,
    'vaccine': <Vaccine size={20} />,
    'brush': <Brush size={20} />,
    'bath': <Bath size={20} />,
    'graduation-cap': <GraduationCap size={20} />,
    'users': <Users size={20} />,
    'users-three': <Users size={20} />,
    'scan': <ScanLine size={20} />,
    'box': <Box size={20} />,
    'bowl-food': <BowlFood size={20} />,
    'scissors': <Scissors size={20} />,
    'activity': <Activity size={20} />,
    'mouse-pointer-click': <MousePointerClick size={20} />,
    'target': <Target size={20} />,
    'clock': <Clock size={20} />,
    'home': <Home size={20} />,
    'apple': <Apple size={20} />,
    'music': <Music size={20} />,
    'toy': <Activity size={20} />, // Using Activity as fallback for toy
    'map': <Map size={20} />,
    'droplets': <Droplets size={20} />,
    'thermometer': <Thermometer size={20} />,
    'wheat': <Wheat size={20} />,
    'eye': <Eye size={20} />,
    'search': <Search size={20} />,
    'file-text': <FileText size={20} />,
    'settings': <Settings size={20} />,
    'user-check': <UserCheck size={20} />,
    'brain': <Brain size={20} />,
    'calendar': <Calendar size={20} />,
    'palm': <PalmTree size={20} />,
    'puzzle': <Puzzle size={20} />,
    'spray-can': <Spray size={20} />
  };

  // Get icon or fallback if not found
  const IconComponent = iconMap[info.iconName] || <Activity size={20} />;
  
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full border-gray-100 hover:border-primary/20 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start">
            <div className={`rounded-full p-2.5 mr-4 ${color}`}>
              {IconComponent}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{info.content}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PetInfoCard;
