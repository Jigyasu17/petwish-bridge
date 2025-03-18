
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import Header from "./components/Header";
import Index from "./pages/Index";
import AddPet from "./pages/AddPet";
import Favorites from "./pages/Favorites";
import NGOFinder from "./pages/NGOFinder";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AdopterDashboard from "./pages/dashboard/AdopterDashboard";
import NGODashboard from "./pages/dashboard/NGODashboard";
import BuyerDashboard from "./pages/dashboard/BuyerDashboard";
import { motion, AnimatePresence } from "framer-motion";

// Create a query client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <FavoritesProvider>
        <TooltipProvider>
          <div className="main-background min-h-screen">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Header />
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/add-pet" element={<AddPet />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/ngo-finder" element={<NGOFinder />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/dashboard/adopter" element={<AdopterDashboard />} />
                  <Route path="/dashboard/ngo" element={<NGODashboard />} />
                  <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </FavoritesProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
