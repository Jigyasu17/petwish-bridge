
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';
import { motion } from 'framer-motion';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';

const Auth = () => {
  const [selectedRole, setSelectedRole] = useState('adopter');
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate(`/dashboard/${selectedRole}`);
    }
  }, [user, navigate, selectedRole]);

  const handleRoleSelect = (value: string) => {
    setSelectedRole(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="container mx-auto px-4 py-12 max-w-md"
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to AdoPet</CardTitle>
          <CardDescription>
            Sign in or create an account to continue
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I am a:
            </label>
            <Select 
              value={selectedRole} 
              onValueChange={handleRoleSelect}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="adopter">Pet Adopter</SelectItem>
                <SelectItem value="ngo">NGO / Shelter</SelectItem>
                <SelectItem value="buyer">Pet Product Buyer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm onClose={() => navigate(`/dashboard/${selectedRole}`)} />
            </TabsContent>
            <TabsContent value="signup">
              <LoginForm onClose={() => navigate(`/dashboard/${selectedRole}`)} />
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            By continuing, you agree to AdoPet's Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default Auth;
