
import React from 'react';
import { MapPin, Phone, Mail, Globe, Dog, Cat, Fish, PawPrint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type NGO } from '@/pages/NGOFinder';

interface NGOListProps {
  ngos: NGO[];
  userLocation: { lat: number; lng: number } | null;
}

const NGOList = ({ ngos, userLocation }: NGOListProps) => {
  const getPetTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'dogs':
        return <Dog size={16} />;
      case 'cats':
        return <Cat size={16} />;
      case 'fish':
        return <Fish size={16} />;
      default:
        return <PawPrint size={16} />;
    }
  };

  if (ngos.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <div className="inline-flex justify-center items-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <MapPin size={24} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">No NGOs found</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          We couldn't find any NGOs matching your search criteria within 5km of your location.
          Try adjusting your filters or search query.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {ngos.map((ngo) => (
        <div key={ngo.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-2">{ngo.name}</h3>
                <p className="text-gray-600 flex items-center mb-4">
                  <MapPin size={16} className="mr-2 text-primary" />
                  {ngo.address} ({ngo.distance} km away)
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-2">
                  Open Now
                </span>
                {userLocation && (
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${ngo.coordinates.lat},${ngo.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    Get Directions
                  </a>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium mb-2">Contact Information</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <Phone size={16} className="mr-2 text-gray-400" />
                    {ngo.contact}
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <Mail size={16} className="mr-2 text-gray-400" />
                    <a href={`mailto:${ngo.email}`} className="hover:underline">{ngo.email}</a>
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <Globe size={16} className="mr-2 text-gray-400" />
                    <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {ngo.website.replace(/^https?:\/\//, '')}
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Available Pets</h4>
                <div className="flex flex-wrap gap-2">
                  {ngo.petTypes.map((type) => (
                    <span 
                      key={type} 
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {getPetTypeIcon(type)}
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                  ))}
                </div>
                
                <h4 className="font-medium mt-4 mb-2">Services</h4>
                <div className="flex flex-wrap gap-2">
                  {ngo.services.map((service) => (
                    <span 
                      key={service} 
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {service.charAt(0).toUpperCase() + service.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-2">
              <Button variant="outline" className="mr-2">
                View Details
              </Button>
              <Button>
                Contact
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NGOList;
