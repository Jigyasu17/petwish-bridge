
import React, { useEffect, useRef, useState } from 'react';
import { type NGO } from '@/pages/NGOFinder';
import { Loader2 } from 'lucide-react';

interface NGOMapProps {
  ngos: NGO[];
  userLocation: { lat: number; lng: number } | null;
}

// This component acts as a placeholder - in a real app, you would integrate 
// with a mapping library like Mapbox, Google Maps, or Leaflet
const NGOMap = ({ ngos, userLocation }: NGOMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (hasError) {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-8 text-center">
          <h3 className="text-lg font-medium mb-2">Couldn't load the map</h3>
          <p className="text-gray-500 mb-4">
            There was an error loading the map. Please try again later.
          </p>
          <button 
            onClick={() => setHasError(false)}
            className="text-primary font-medium hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden h-96 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={36} className="animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-500">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div 
        ref={mapContainerRef} 
        className="h-96 bg-gray-100 relative"
        style={{ 
          backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l+f00(40.7128,-74.0060)/40.7128,-74.0060,11,0/800x600?access_token=pk.eyJ1Ijoibm90YXRva2VuIiwiYSI6ImNrMzI3OGhheTAxaTIzaW82Ym1sbmpsNmYifQ.mW-8H3bFHmmGcxHR9b2kkQ')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute top-0 left-0 right-0 bg-white p-4">
          <p className="text-center text-gray-500 text-sm">
            This is a placeholder for the interactive map. In a real application, you would integrate with 
            Google Maps, Mapbox, or another mapping service.
          </p>
        </div>
        
        <div className="absolute bottom-4 right-4 bg-white p-3 rounded-md shadow-md text-xs">
          <div className="flex items-center mb-1">
            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
            <span>Your Location</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
            <span>NGO Location</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-100">
        <h3 className="font-medium mb-3">NGOs on Map</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {ngos.map((ngo) => (
            <div 
              key={ngo.id} 
              className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => console.log(`Selected NGO: ${ngo.name}`)}
            >
              <h4 className="font-medium truncate">{ngo.name}</h4>
              <p className="text-xs text-gray-500 truncate">{ngo.distance} km away</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NGOMap;
