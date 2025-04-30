
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Filter, Home, User } from "lucide-react";

interface HouseListing {
  id: string;
  imageUrl: string;
  address: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  isSharedSpot: boolean;
  isAccessible: boolean;
  rent: number;
}

const FindHouse = () => {
  const navigate = useNavigate();
  
  // Mock data for house listings
  const [listings] = useState<HouseListing[]>([
    {
      id: "1",
      imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      address: "16, Delle Ave.",
      location: "Mission Main",
      bedrooms: 3,
      bathrooms: 1.5,
      isSharedSpot: true,
      isAccessible: true,
      rent: 660
    },
    {
      id: "2",
      imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      address: "1330 Boylston St., #1415",
      location: "Fenway",
      bedrooms: 2,
      bathrooms: 1,
      isSharedSpot: true,
      isAccessible: false,
      rent: 780
    }
  ]);

  const handleFindHouse = () => {
    // Already on find house page
  };

  const handleFindPeople = () => {
    navigate("/matching-profiles");
  };

  const handleProfile = () => {
    navigate("/user-profile");
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Header with user avatar and navigation buttons */}
      <header className="p-4 border-b flex items-center justify-between">
        <Avatar className="w-12 h-12">
          <AvatarImage src="" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        
        <div className="flex gap-2">
          <button className="bg-black text-white flex items-center gap-1 px-6 py-2 rounded-full">
            <Home className="w-5 h-5" />
            Find House
          </button>
          <button 
            onClick={handleFindPeople}
            className="bg-gray-100 text-black flex items-center gap-1 px-6 py-2 rounded-full"
          >
            <User className="w-5 h-5" />
            Find People
          </button>
        </div>
        
        <button 
          onClick={handleProfile}
          className="text-red-500 rounded-full text-2xl"
        >
          →
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        {/* Filters */}
        <div className="mb-6">
          <Button
            variant="outline"
            className="rounded-full bg-gray-100 border-0 flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Add Filters
          </Button>
        </div>
        
        {/* Listings heading */}
        <h1 className="text-2xl font-bold mb-4">
          All apartments near Northeastern University
        </h1>
        
        {/* Listings */}
        <div className="space-y-6">
          {listings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden rounded-xl">
              {/* Listing image */}
              <div className="w-full h-48">
                <img 
                  src={listing.imageUrl} 
                  alt={listing.address} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Listing details */}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {listing.address} - {listing.location}
                </h2>
                
                <div className="flex flex-wrap items-center gap-4 mb-2">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-700">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6a1 1 0 100 2h8a1 1 0 100-2h-8z" fill="currentColor" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M4 5a3 3 0 00-3 3v10a1 1 0 001 1h1v2a1 1 0 102 0v-2h14v2a1 1 0 102 0v-2h1a1 1 0 001-1V8a3 3 0 00-3-3H4zm-1 3a1 1 0 011-1h16a1 1 0 011 1v1H3V8zm0 3h18v7H3v-7z" fill="currentColor" />
                      </svg>
                    </span>
                    <span>{listing.bedrooms} Bed</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <span className="text-gray-700">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5 4a3 3 0 00-3 3v3h20V7a3 3 0 00-3-3H5zM2 12v5a3 3 0 003 3h14a3 3 0 003-3v-5H2zm11 3a1 1 0 11-2 0 1 1 0 012 0z" fill="currentColor" />
                      </svg>
                    </span>
                    <span>{listing.bathrooms} Bath</span>
                  </div>
                  
                  {listing.isSharedSpot && (
                    <div className="flex items-center gap-1">
                      <span className="text-gray-700">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" fill="currentColor" />
                          <path d="M12 14c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8z" fill="currentColor" />
                        </svg>
                      </span>
                      <span>Shared Spot</span>
                    </div>
                  )}
                </div>
                
                {listing.isAccessible && (
                  <div className="mb-2 flex items-center gap-1">
                    <span>🚚</span> 
                    <span className="text-sm">Red-eye Accessible</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xl font-bold">Rent ${listing.rent}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer navigation */}
      <footer className="border-t p-4 flex justify-around">
        <button 
          onClick={handleHome}
          className="text-red-500"
        >
          <Home className="w-6 h-6" />
        </button>
        <button 
          onClick={handleProfile}
          className="text-gray-400"
        >
          <User className="w-6 h-6" />
        </button>
      </footer>
    </div>
  );
};

export default FindHouse;
