
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const AdopterDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user.name || 'Friend'}!</h1>
          <p className="text-gray-600 mt-1">Your adopter dashboard</p>
        </div>
      </div>

      <Tabs defaultValue="available" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="available">Available Pets</TabsTrigger>
          <TabsTrigger value="favorites">
            <Heart size={16} className="mr-2" />
            Favorites
          </TabsTrigger>
          <TabsTrigger value="status">
            <Clock size={16} className="mr-2" />
            Adoption Status
          </TabsTrigger>
          <TabsTrigger value="nearby">
            <MapPin size={16} className="mr-2" />
            Nearby NGOs
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="available">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recommended Pets</CardTitle>
                <CardDescription>Based on your preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Loading personalized pet recommendations...</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recently Added</CardTitle>
                <CardDescription>New pets available for adoption</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Loading recently added pets...</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Featured Pets</CardTitle>
                <CardDescription>Special pets needing homes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Loading featured pets...</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="favorites">
          <Card>
            <CardHeader>
              <CardTitle>Your Favorite Pets</CardTitle>
              <CardDescription>Pets you've saved for later</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Loading your favorites...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardTitle>Adoption Status</CardTitle>
              <CardDescription>Track your adoption applications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">No active adoption applications found.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="nearby">
          <Card>
            <CardHeader>
              <CardTitle>NGOs Near You</CardTitle>
              <CardDescription>Animal shelters and rescue organizations in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Loading nearby NGOs...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AdopterDashboard;
