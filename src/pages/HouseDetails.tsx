import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, User, RefreshCcw } from "lucide-react";
import BackButton from "@/components/BackButton";

interface HouseDetailsProps {
  id: string;
  imageUrl: string;
  address: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  isSharedSpot: boolean;
  isAccessible: boolean;
  rent: number;
  distanceAway?: string;
  postedBy?: {
    name: string;
    title?: string; // Make title optional to match the data structure
    avatar?: string;
  };
  studentsCount?: number;
  amenities?: string[];
}

const HouseDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const listing = location.state?.listing;
  
  // Default listing if none was passed through navigation
  const [houseDetails] = useState<HouseDetailsProps>(
    listing || {
      id: "1",
      imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      address: "16, Delle Ave.",
      location: "Mission Main",
      bedrooms: 3,
      bathrooms: 1.5,
      isSharedSpot: true,
      isAccessible: true,
      rent: 660,
      distanceAway: "1.3 miles away",
      postedBy: {
        name: "Preethi, MSIS",
        title: "Student", // Added the title property
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
      },
      studentsCount: 5,
      amenities: ["Air conditioning", "Assisted living", "Disability Access", "Controlled access", "Cable Ready", "College", "Corporate", "Elevator", "Extra Storage"]
    }
  );

  const handleNavigateHome = () => {
    navigate("/find-house");
  };

  const handleNavigateProfile = () => {
    navigate("/profile-details");
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Back button and refresh button */}
      <div className="p-4 flex justify-between items-center">
        <BackButton />
        <h1 className="text-2xl font-bold">House Details</h1>
        <button className="text-red-500">
          <RefreshCcw className="w-5 h-5" />
        </button>
      </div>

      {/* House image */}
      <div className="w-full h-64 overflow-hidden">
        <img 
          src={houseDetails.imageUrl} 
          alt={houseDetails.address} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* House information */}
      <div className="p-6 flex-1">
        <h2 className="text-2xl font-bold mb-1">
          {houseDetails.address} - {houseDetails.location}
        </h2>
        
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-600">
            {houseDetails.distanceAway}
          </div>
          <div className="font-bold text-xl">
            Rent ${houseDetails.rent}/month
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-y-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-700">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6a1 1 0 100 2h8a1 1 0 100-2h-8z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M4 5a3 3 0 00-3 3v10a1 1 0 001 1h1v2a1 1 0 102 0v-2h14v2a1 1 0 102 0v-2h1a1 1 0 001-1V8a3 3 0 00-3-3H4zm-1 3a1 1 0 11-2 0 1 1 0 012 0z" fill="currentColor" />
              </svg>
            </span>
            <span>{houseDetails.bedrooms} Bed</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-700">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5 4a3 3 0 00-3 3v3h20V7a3 3 0 00-3-3H5zM2 12v5a3 3 0 003 3h14a3 3 0 003-3v-5H2zm11 3a1 1 0 11-2 0 1 1 0 012 0z" fill="currentColor" />
              </svg>
            </span>
            <span>{houseDetails.bathrooms} Bath</span>
          </div>
          
          {houseDetails.isSharedSpot && (
            <div className="flex items-center gap-2">
              <span className="text-gray-700">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" fill="currentColor" />
                  <path d="M12 14c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8z" fill="currentColor" />
                </svg>
              </span>
              <span>Shared Spot</span>
            </div>
          )}

          {houseDetails.isAccessible && (
            <div className="flex items-center gap-2">
              <span className="text-gray-700">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 4a1 1 0 011-1h12a1 1 0 011 1v16H5V4z" fill="currentColor" />
                  <path d="M19 20H5v2h14v-2z" fill="currentColor" />
                </svg>
              </span>
              <span>Red-eye Accessible</span>
            </div>
          )}

          {houseDetails.studentsCount && (
            <div className="flex items-center gap-2 col-span-2 mt-2">
              <span>{houseDetails.studentsCount} students live here</span>
            </div>
          )}
        </div>
        
        {/* Posted by section */}
        {houseDetails.postedBy && (
          <div className="flex items-center justify-between border-t border-b py-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                {houseDetails.postedBy.avatar ? (
                  <img 
                    src={houseDetails.postedBy.avatar} 
                    alt={houseDetails.postedBy.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
                    <User className="w-6 h-6" />
                  </div>
                )}
              </div>
              <div>
                <div className="text-gray-500 text-sm">Posted by</div>
                <div className="font-semibold">{houseDetails.postedBy.name}</div>
              </div>
            </div>
            <div className="text-gray-400">
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </div>
          </div>
        )}
        
        {/* Amenities section */}
        {houseDetails.amenities && houseDetails.amenities.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">Amenties</h3>
            <div className="flex flex-wrap gap-2">
              {houseDetails.amenities.map((amenity, index) => (
                <div 
                  key={index}
                  className="bg-gray-100 py-2 px-4 rounded-full text-sm"
                >
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer navigation */}
      <footer className="border-t p-4 flex justify-around">
        <button 
          onClick={handleNavigateHome}
          className="text-black"
        >
          <Home className="w-6 h-6" />
        </button>
        <button 
          onClick={handleNavigateProfile}
          className="text-gray-400"
        >
          <User className="w-6 h-6" />
        </button>
      </footer>
    </div>
  );
};

export default HouseDetails;
