
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingBag, Package, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const BuyerDashboard = () => {
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
          <p className="text-gray-600 mt-1">Your buyer dashboard</p>
        </div>
      </div>

      <Tabs defaultValue="shop" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="shop">
            <ShoppingBag size={16} className="mr-2" />
            Shop
          </TabsTrigger>
          <TabsTrigger value="orders">
            <Package size={16} className="mr-2" />
            Order History
          </TabsTrigger>
          <TabsTrigger value="wishlist">
            <Heart size={16} className="mr-2" />
            Wishlist
          </TabsTrigger>
          <TabsTrigger value="recommendations">
            <Sparkles size={16} className="mr-2" />
            Recommendations
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="shop">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Pet Food & Treats</CardTitle>
                <CardDescription>Quality nutrition for your pets</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Shop for premium pet food and treats.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Toys & Accessories</CardTitle>
                <CardDescription>Fun and enrichment for your pets</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Browse toys, beds, and accessories.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Health & Wellness</CardTitle>
                <CardDescription>Keep your pets happy and healthy</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Explore health supplements and care items.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Your Orders</CardTitle>
              <CardDescription>View your purchase history</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">You haven't placed any orders yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="wishlist">
          <Card>
            <CardHeader>
              <CardTitle>Your Wishlist</CardTitle>
              <CardDescription>Items you've saved for later</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Your wishlist is empty.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Recommended For You</CardTitle>
              <CardDescription>Products tailored to your pet's needs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Complete your pet profile to receive personalized recommendations.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default BuyerDashboard;
