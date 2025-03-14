
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-display text-xl font-medium mb-4">
              <span className="text-primary">Ado</span>
              <span>Pet</span>
            </Link>
            <p className="text-gray-600 text-sm mb-6">
              Connecting loving homes with pets in need since 2023. Every adoption makes a difference.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={Instagram} href="#" ariaLabel="Follow us on Instagram" />
              <SocialLink icon={Twitter} href="#" ariaLabel="Follow us on Twitter" />
              <SocialLink icon={Facebook} href="#" ariaLabel="Follow us on Facebook" />
              <SocialLink icon={Youtube} href="#" ariaLabel="Subscribe to our YouTube channel" />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Adopt</h3>
            <ul className="space-y-3">
              <FooterLink href="#">Find a Pet</FooterLink>
              <FooterLink href="#">Dogs</FooterLink>
              <FooterLink href="#">Cats</FooterLink>
              <FooterLink href="#">Other Animals</FooterLink>
              <FooterLink href="#">Adoption Process</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <FooterLink href="#">Pet Care Tips</FooterLink>
              <FooterLink href="#">Training Guides</FooterLink>
              <FooterLink href="#">Health & Nutrition</FooterLink>
              <FooterLink href="#">Success Stories</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">Partner Shelters</FooterLink>
              <FooterLink href="#">Volunteer</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Contact Us</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} AdoPet. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <Link to="#" className="hover:text-gray-700">Privacy Policy</Link>
              <Link to="#" className="hover:text-gray-700">Terms of Service</Link>
              <Link to="#" className="hover:text-gray-700">Cookie Policy</Link>
            </div>
          </div>
          <div className="text-center mt-6 text-sm text-gray-400 flex items-center justify-center">
            <span>Made with</span>
            <Heart size={14} className="mx-1 text-red-400" fill="currentColor" />
            <span>for pets everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon: Icon, href, ariaLabel }: { icon: React.ElementType; href: string; ariaLabel: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    aria-label={ariaLabel}
    className="bg-gray-100 p-2.5 rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
  >
    <Icon size={18} />
  </a>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <a href={href} className="text-gray-600 hover:text-primary text-sm transition-colors">
      {children}
    </a>
  </li>
);

export default Footer;
