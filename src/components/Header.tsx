
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Plus, User, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import LoginForm from './LoginForm';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isLoading } = useAuth();

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen 
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center font-display text-xl md:text-2xl font-medium"
        >
          <span className="text-primary">Ado</span>
          <span>Pet</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" active={location.pathname === '/'}>Home</NavLink>
          <NavLink to="/add-pet" active={location.pathname === '/add-pet'}>Add Pet</NavLink>
          <NavLink to="/favorites" active={location.pathname === '/favorites'}>Favorites</NavLink>
          
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Hello, {user.name}</span>
              <button 
                onClick={() => logout()}
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary"
              >
                <User size={18} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
              <DialogTrigger asChild>
                <button 
                  className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <LoginForm onClose={() => setLoginDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          )}
        </nav>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 rounded-full hover:bg-gray-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink to="/" active={location.pathname === '/'}>Home</MobileNavLink>
            <MobileNavLink to="/add-pet" active={location.pathname === '/add-pet'}>
              <Plus size={18} />
              <span>Add Pet</span>
            </MobileNavLink>
            <MobileNavLink to="/favorites" active={location.pathname === '/favorites'}>
              <Heart size={18} />
              <span>Favorites</span>
            </MobileNavLink>
            
            {user ? (
              <>
                <div className="border-t border-gray-100 pt-4 mt-2">
                  <div className="text-sm text-gray-600 mb-2">Signed in as {user.email}</div>
                  <button 
                    onClick={() => logout()}
                    className="w-full py-2 text-sm text-primary font-medium rounded-md border border-primary/20 hover:bg-primary/5"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
                <DialogTrigger asChild>
                  <button 
                    className="w-full py-3 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
                  >
                    Sign In
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <LoginForm onClose={() => setLoginDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) => (
  <Link 
    to={to} 
    className={`relative text-sm font-medium ${
      active 
        ? 'text-primary' 
        : 'text-gray-700 hover:text-primary'
    }`}
  >
    {children}
    {active && (
      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
    )}
  </Link>
);

const MobileNavLink = ({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-2 py-3 px-2 rounded-md ${
      active 
        ? 'text-primary bg-primary/5 font-medium' 
        : 'text-gray-700 hover:bg-gray-50'
    }`}
  >
    {children}
  </Link>
);

export default Header;
