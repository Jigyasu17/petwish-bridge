
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users, BarChart, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const NGODashboard = () => {
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
          <h1 className="text-3xl font-bold">NGO Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your animal shelter</p>
        </div>
        
        <Button onClick={() => navigate('/add-pet')} className="mt-4 md:mt-0">
          <PlusCircle size={16} className="mr-2" />
          Add New Pet
        </Button>
      </div>

      <Tabs defaultValue="pets" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="pets">Available Pets</TabsTrigger>
          <TabsTrigger value="requests">
            <Users size={16} className="mr-2" />
            Adoption Requests
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart size={16} className="mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="pending">
            <Clock size={16} className="mr-2" />
            Pending Actions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pets">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Listed Pets</CardTitle>
                <CardDescription>Manage pets available for adoption</CardDescription>
              </div>
              <Button size="sm" variant="outline">
                <PlusCircle size={16} className="mr-2" />
                Add Pet
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">No pets listed yet. Add a pet to get started.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Adoption Requests</CardTitle>
              <CardDescription>Review and manage adoption applications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">No adoption requests at this time.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Adoption Statistics</CardTitle>
                <CardDescription>Overview of your adoption rates</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <p className="text-gray-600">Analytics will appear here once you have adoption data.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Visitor Engagement</CardTitle>
                <CardDescription>Profile views and interested adopters</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <p className="text-gray-600">Analytics will appear here once you have engagement data.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Actions</CardTitle>
              <CardDescription>Items requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">No pending actions at this time.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default NGODashboard;
