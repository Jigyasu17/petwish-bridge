
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, PlusCircle, Home, LogIn, MapPin, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { user, login, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLoginClick = () => {
    navigate('/auth');
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-0.5 font-display text-xl font-medium">
            <span className="text-primary">Ado</span>
            <span>Pet</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 items-center">
            <NavLink to="/" icon={<Home size={18} />}>
              Home
            </NavLink>
            <NavLink to="/ngo-finder" icon={<MapPin size={18} />}>
              NGO Finder
            </NavLink>
            <NavLink to="/favorites" icon={<Heart size={18} />}>
              Favorites
            </NavLink>
            <NavLink to="/add-pet" icon={<PlusCircle size={18} />}>
              Add a Pet
            </NavLink>
          </nav>

          {/* Auth Button (Desktop) */}
          <div className="hidden md:block">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <User size={18} />
                    {user.name || 'Account'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate('/dashboard/adopter')}>
                    Adopter Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/ngo')}>
                    NGO Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/buyer')}>
                    Buyer Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={handleLoginClick}>
                <LogIn size={18} className="mr-2" />
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 bg-white"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-3">
                <MobileNavLink to="/" icon={<Home size={18} />} onClick={closeMenu}>
                  Home
                </MobileNavLink>
                <MobileNavLink to="/ngo-finder" icon={<MapPin size={18} />} onClick={closeMenu}>
                  NGO Finder
                </MobileNavLink>
                <MobileNavLink to="/favorites" icon={<Heart size={18} />} onClick={closeMenu}>
                  Favorites
                </MobileNavLink>
                <MobileNavLink to="/add-pet" icon={<PlusCircle size={18} />} onClick={closeMenu}>
                  Add a Pet
                </MobileNavLink>
                
                <div className="pt-3 border-t border-gray-100">
                  {user ? (
                    <div className="space-y-2">
                      <MobileNavLink to="/dashboard/adopter" icon={<User size={18} />} onClick={closeMenu}>
                        Adopter Dashboard
                      </MobileNavLink>
                      <MobileNavLink to="/dashboard/ngo" icon={<User size={18} />} onClick={closeMenu}>
                        NGO Dashboard
                      </MobileNavLink>
                      <MobileNavLink to="/dashboard/buyer" icon={<User size={18} />} onClick={closeMenu}>
                        Buyer Dashboard
                      </MobileNavLink>
                      <Button className="w-full mt-2" variant="outline" onClick={logout}>
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Button className="w-full" onClick={handleLoginClick}>
                      <LogIn size={18} className="mr-2" />
                      Sign In
                    </Button>
                  )}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const NavLink = ({ to, icon, children }: { to: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <Link
    to={to}
    className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors py-2"
  >
    {icon}
    {children}
  </Link>
);

const MobileNavLink = ({
  to,
  icon,
  onClick,
  children,
}: {
  to: string;
  icon: React.ReactNode;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors py-2"
    onClick={onClick}
  >
    {icon}
    {children}
  </Link>
);

export default Header;
