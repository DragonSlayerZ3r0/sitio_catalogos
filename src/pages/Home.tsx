import React from 'react';
import { MapPin } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome to TravelCatalog</h1>
      <div className="text-center mb-8">
        <MapPin size={48} className="inline-block text-blue-600 mb-4" />
        <p className="text-xl">Discover amazing tourist destinations around the world!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {['Paris', 'Tokyo', 'New York'].map((city) => (
          <div key={city} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={`https://source.unsplash.com/400x300/?${city}`}
              alt={city}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{city}</h2>
              <p className="text-gray-600">Experience the wonders of {city}. Plan your trip now!</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;