
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Info, PawPrint, Scissors, Heart, Brain, Leaf } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import PetInfoCard from './PetInfoCard';
import { CategoryFilter } from '../CategoryFilter';

// Pet info categories
const infoCategories = [
  { id: 'care', name: 'Care Tips', icon: Heart, color: 'bg-pink-100 text-pink-600' },
  { id: 'grooming', name: 'Grooming', icon: Scissors, color: 'bg-purple-100 text-purple-600' },
  { id: 'behavior', name: 'Behavior', icon: Brain, color: 'bg-amber-100 text-amber-600' },
  { id: 'nature', name: 'Natural Needs', icon: Leaf, color: 'bg-green-100 text-green-600' },
];

// Sample pet info data structure
const petInfoData = {
  dogs: {
    care: [
      { 
        title: 'Feeding Schedule', 
        content: 'Puppies need to eat three to four times a day, while adult dogs should eat twice daily. Monitor portion sizes to prevent obesity.',
        iconName: 'utensils'
      },
      { 
        title: 'Exercise Requirements', 
        content: 'Dogs need daily exercise to stay healthy and happy. Most breeds benefit from at least 30 minutes of activity twice daily.',
        iconName: 'running' 
      },
      { 
        title: 'Vaccination Schedule', 
        content: 'Core vaccines for dogs include rabies, distemper, parvovirus, and adenovirus. Consult your vet for a proper schedule.',
        iconName: 'vaccine' 
      }
    ],
    grooming: [
      { 
        title: 'Brushing Routine', 
        content: 'Short-haired breeds need brushing once a week, while long-haired breeds may need daily brushing to prevent mats and tangles.',
        iconName: 'brush' 
      },
      { 
        title: 'Bathing Frequency', 
        content: 'Most dogs only need bathing every 1-3 months unless they get particularly dirty. Over-bathing can strip natural oils.',
        iconName: 'bath' 
      }
    ],
    behavior: [
      { 
        title: 'Training Basics', 
        content: 'Start training puppies as early as 8 weeks. Consistent, positive reinforcement works best for most dogs.',
        iconName: 'graduation-cap' 
      },
      { 
        title: 'Social Development', 
        content: 'Puppies should be socialized between 3-14 weeks of age to develop proper social behaviors with people and other animals.',
        iconName: 'users' 
      }
    ],
    nature: [
      { 
        title: 'Pack Mentality', 
        content: 'Dogs are pack animals that thrive on hierarchy and companionship. Establishing yourself as the pack leader helps prevent behavior issues.',
        iconName: 'users-three' 
      },
      { 
        title: 'Sensory World', 
        content: 'Dogs experience the world primarily through scent, with a sense of smell 10,000-100,000 times more sensitive than humans.',
        iconName: 'scan' 
      }
    ]
  },
  cats: {
    care: [
      { 
        title: 'Litter Box Maintenance', 
        content: 'Clean litter boxes daily and change litter completely every 1-2 weeks. Provide one litter box per cat, plus an extra.',
        iconName: 'box' 
      },
      { 
        title: 'Feeding Guidelines', 
        content: 'Adult cats typically need two meals per day. Feed high-quality cat food appropriate for their age, health status, and activity level.',
        iconName: 'bowl-food' 
      }
    ],
    grooming: [
      { 
        title: 'Brushing Requirements', 
        content: 'Short-haired cats benefit from weekly brushing, while long-haired varieties may need daily attention to prevent matting.',
        iconName: 'brush' 
      },
      { 
        title: 'Nail Trimming', 
        content: 'Trim your cat's nails every 2-3 weeks. Use proper pet nail clippers and be careful not to cut the quick.',
        iconName: 'scissors' 
      }
    ],
    behavior: [
      { 
        title: 'Understanding Body Language', 
        content: 'A cat's tail, ears, and body posture provide clues to their mood. A puffed tail indicates fear or agitation, while slow blinking shows trust.',
        iconName: 'activity' 
      },
      { 
        title: 'Scratching Behavior', 
        content: 'Cats scratch to mark territory, exercise, and maintain nail health. Provide appropriate scratching surfaces to protect furniture.',
        iconName: 'mouse-pointer-click' 
      }
    ],
    nature: [
      { 
        title: 'Solitary Hunters', 
        content: 'Unlike dogs, cats are naturally solitary hunters. They may enjoy companionship but often prefer independence and personal space.',
        iconName: 'target' 
      },
      { 
        title: 'Crepuscular Schedule', 
        content: 'Cats are most active at dawn and dusk (crepuscular), explaining their tendency to be playful in the early morning and evening.',
        iconName: 'clock' 
      }
    ]
  },
  birds: {
    care: [
      { 
        title: 'Proper Cage Setup', 
        content: 'Birds need cages large enough to stretch their wings fully. Provide various perch sizes and materials for foot health.',
        iconName: 'home' 
      },
      { 
        title: 'Dietary Needs', 
        content: 'Most pet birds need a varied diet of quality pellets, fresh vegetables, limited fruits, and occasional seeds or nuts.',
        iconName: 'apple' 
      }
    ],
    grooming: [
      { 
        title: 'Bathing Options', 
        content: 'Most birds enjoy regular baths. Offer a shallow dish of water, gentle misting, or shower perch depending on your bird's preference.',
        iconName: 'droplets' 
      },
      { 
        title: 'Wing & Nail Care', 
        content: 'Wing trimming should be done by professionals if needed. Nail trimming may be necessary every few months.',
        iconName: 'scissors' 
      }
    ],
    behavior: [
      { 
        title: 'Vocalizations', 
        content: 'Birds communicate through various calls and sounds. Learn your bird's normal vocalizations to understand their needs and moods.',
        iconName: 'music' 
      },
      { 
        title: 'Environmental Enrichment', 
        content: 'Birds need mental stimulation. Rotate toys regularly and provide foraging opportunities to prevent boredom and behavioral issues.',
        iconName: 'toy' 
      }
    ],
    nature: [
      { 
        title: 'Flock Mentality', 
        content: 'Most pet bird species are naturally social flock animals. They often view their human family as their flock.',
        iconName: 'users' 
      },
      { 
        title: 'Territorial Behavior', 
        content: 'Birds may become territorial about their cage or favorite person. Respect boundaries while working on socialization gradually.',
        iconName: 'map' 
      }
    ]
  },
  fish: {
    care: [
      { 
        title: 'Water Parameters', 
        content: 'Test aquarium water weekly for ammonia, nitrite, nitrate, pH, and temperature. Different fish species require different parameters.',
        iconName: 'thermometer' 
      },
      { 
        title: 'Feeding Guidelines', 
        content: 'Most fish should be fed small amounts 1-2 times daily. Overfeeding is a common mistake that pollutes water and harms fish.',
        iconName: 'utensils' 
      }
    ],
    grooming: [
      { 
        title: 'Tank Maintenance', 
        content: 'Perform 25-30% water changes every 2-4 weeks. Clean filters according to manufacturer guidelines without using soap.',
        iconName: 'spray-can' 
      },
      { 
        title: 'Algae Control', 
        content: 'Control algae through proper lighting periods, regular cleaning, and appropriate algae-eating tank mates if compatible.',
        iconName: 'brush' 
      }
    ],
    behavior: [
      { 
        title: 'Schooling Patterns', 
        content: 'Many small fish are schooling species that need groups of 6+ of their own kind to feel secure and show natural behaviors.',
        iconName: 'users' 
      },
      { 
        title: 'Territorial Needs', 
        content: 'Some fish species require territories. Provide adequate space and hiding places to reduce aggression and stress.',
        iconName: 'home' 
      }
    ],
    nature: [
      { 
        title: 'Natural Habitat', 
        content: 'Research your fish's natural habitat and try to replicate aspects of it in your aquarium for optimal health and behavior.',
        iconName: 'palm' 
      },
      { 
        title: 'Species Compatibility', 
        content: 'Not all fish can live together peacefully. Research compatibility based on water parameters, size, temperament, and dietary needs.',
        iconName: 'puzzle' 
      }
    ]
  },
  rabbits: {
    care: [
      { 
        title: 'Housing Requirements', 
        content: 'Rabbits need enclosures at least 4-5 times their size with room to stand on hind legs. Provide daily supervised exercise outside the enclosure.',
        iconName: 'home' 
      },
      { 
        title: 'Hay Importance', 
        content: 'Unlimited fresh hay should make up 80% of a rabbit's diet. It's essential for digestive health and proper teeth wear.',
        iconName: 'wheat' 
      }
    ],
    grooming: [
      { 
        title: 'Brushing Needs', 
        content: 'Short-haired rabbits need brushing weekly, while long-haired breeds require daily grooming, especially during shedding seasons.',
        iconName: 'brush' 
      },
      { 
        title: 'Nail Trimming', 
        content: 'Check and trim rabbit nails every 4-6 weeks. Use proper small animal nail clippers and be careful not to cut the quick.',
        iconName: 'scissors' 
      }
    ],
    behavior: [
      { 
        title: 'Communication Signals', 
        content: 'Learn to read rabbit body language. Tooth grinding, thumping, and specific ear positions convey important information about their state.',
        iconName: 'activity' 
      },
      { 
        title: 'Socialization', 
        content: 'Rabbits are social animals that often do best in bonded pairs. Proper introduction is essential when adding a second rabbit.',
        iconName: 'users' 
      }
    ],
    nature: [
      { 
        title: 'Prey Animal Instincts', 
        content: 'As prey animals, rabbits are naturally cautious and may startle easily. Approach slowly and speak softly to build trust.',
        iconName: 'eye' 
      },
      { 
        title: 'Crepuscular Schedule', 
        content: 'Rabbits are most active at dawn and dusk. They may sleep much of the day and become playful in the morning and evening.',
        iconName: 'clock' 
      }
    ]
  },
  other: {
    care: [
      { 
        title: 'Species-Specific Research', 
        content: 'Exotic pets have highly specialized needs. Always research your specific species and consult exotic veterinarians for proper care.',
        iconName: 'search' 
      },
      { 
        title: 'Legal Considerations', 
        content: 'Ensure your exotic pet is legal to own in your location and was ethically sourced. Documentation may be required for some species.',
        iconName: 'file-text' 
      }
    ],
    grooming: [
      { 
        title: 'Specialized Care', 
        content: 'Many exotic pets have unique grooming needs. Research species-specific requirements for skin, fur, shell, or scale maintenance.',
        iconName: 'settings' 
      },
      { 
        title: 'Finding Qualified Help', 
        content: 'Locate exotic pet groomers or veterinarians with experience in your specific species before emergency situations arise.',
        iconName: 'user-check' 
      }
    ],
    behavior: [
      { 
        title: 'Natural Behaviors', 
        content: 'Understand what behaviors are normal for your species. Many exotics appear "sick" when exhibiting normal behaviors unfamiliar to most owners.',
        iconName: 'activity' 
      },
      { 
        title: 'Enrichment Needs', 
        content: 'All animals need mental stimulation. Research appropriate enrichment activities for your specific exotic pet.',
        iconName: 'brain' 
      }
    ],
    nature: [
      { 
        title: 'Environmental Requirements', 
        content: 'Many exotic pets need specific temperature, humidity, lighting, and habitat features to thrive. Invest in proper environmental controls.',
        iconName: 'thermometer' 
      },
      { 
        title: 'Lifespan Considerations', 
        content: 'Research the typical lifespan of your exotic pet. Many live far longer than cats or dogs, requiring decades of commitment.',
        iconName: 'calendar' 
      }
    ]
  }
};

const PetInfoSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("dogs");
  const [activeInfoTab, setActiveInfoTab] = useState("care");
  
  const handleCategorySelect = (selectedCategory: string | null) => {
    if (selectedCategory) {
      setCategory(selectedCategory);
    }
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Filter info based on search query
  const filteredInfo = petInfoData[category as keyof typeof petInfoData][activeInfoTab as keyof typeof petInfoData.dogs].filter(
    item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <PawPrint className="w-5 h-5 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Pet Care Guide</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Know About Your Pet</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover expert advice on caring for your furry, feathered, or scaly friends. From grooming tips to behavior insights, we've got you covered.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <div className="w-full md:w-1/3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="text"
                    placeholder="Search pet information..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              
              <div className="w-full md:w-2/3">
                <CategoryFilter onSelectCategory={handleCategorySelect} />
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <Tabs defaultValue="care" value={activeInfoTab} onValueChange={setActiveInfoTab} className="w-full">
              <TabsList className="w-full mb-6 bg-gray-100 p-1 rounded-lg grid grid-cols-2 md:grid-cols-4">
                {infoCategories.map(cat => (
                  <TabsTrigger 
                    key={cat.id} 
                    value={cat.id}
                    className="flex items-center gap-2 py-2 data-[state=active]:bg-white"
                  >
                    <cat.icon size={16} />
                    <span>{cat.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {infoCategories.map(cat => (
                <TabsContent key={cat.id} value={cat.id} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredInfo.length > 0 ? (
                      filteredInfo.map((info, idx) => (
                        <PetInfoCard key={idx} info={info} color={cat.color} />
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-12">
                        <Info size={40} className="mx-auto text-gray-300 mb-3" />
                        <h4 className="text-lg font-medium text-gray-600">No information found</h4>
                        <p className="text-gray-500">Try adjusting your search or select a different category.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetInfoSection;
