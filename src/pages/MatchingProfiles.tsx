import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Home, User, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "@/types/userProfile";
import BackButton from "@/components/BackButton";

const MatchingProfiles = () => {
  const navigate = useNavigate();
  
  // Mock data for matching profiles
  const [matchingProfiles] = useState<UserProfile[]>([
    {
      id: "1",
      name: "Chris",
      email: "chris@northeastern.edu",
      phone: "+1 (555) 123-4567",
      program: "MSCS",
      housingStatus: "Found a House",
      dietaryPreference: "Vegetarian",
      gender: "Male",
      distance: "Within 2 miles from NU",
      location: "Within 2 miles from NU",
      age: 21,
      preferences: ["Student", "Non-Vegetarian", "Non-smoker"],
      amenities: ["Air conditioning", "Cable Ready", "College"],
      imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "2",
      name: "Preethi",
      email: "preethi@northeastern.edu",
      phone: "+1 (555) 123-4567",
      program: "MSIS",
      housingStatus: "Found a house",
      dietaryPreference: "Non-Vegetarian",
      gender: "Female",
      distance: "Within 1 mile from NU",
      location: "Within 1 mile from NU",
      age: 23,
      preferences: ["Student", "All Girls Apartment", "Vegetarian", "Non-smoker", "Non-drinker", "Move-in Immediately"],
      amenities: ["Air conditioning", "Assisted living", "Disability Access", "Controlled access", "Cable Ready", "College", "Corporate", "Elevator", "Extra Storage", "High speed internet", "Garage", "Pets allowed"],
      imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "3",
      name: "Riddhi",
      email: "riddhi@northeastern.edu",
      phone: "+1 (555) 123-4567",
      program: "MSIS",
      housingStatus: "Looking for a house",
      dietaryPreference: "Non-Vegetarian",
      gender: "Female",
      distance: "Within 1 mile from NU",
      location: "Within 1 mile from NU",
      age: 26,
      preferences: ["Student", "All Girls Apartment", "Non-smoker"],
      amenities: ["Air conditioning", "College", "High speed internet"],
      imageUrl: "https://images.unsplash.com/photo-1501286353178-1ec871814838?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "4",
      name: "Ronak",
      email: "ronak@northeastern.edu",
      phone: "+1 (555) 123-4567",
      program: "MSEM",
      housingStatus: "Looking for a house",
      dietaryPreference: "Non-Vegetarian",
      gender: "Male",
      distance: "Within 2 miles from NU",
      location: "Within 2 miles from NU",
      age: 24,
      preferences: ["Student", "Non-smoker", "Non-drinker"],
      amenities: ["Air conditioning", "Cable Ready", "College", "Extra Storage"],
      imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    }
  ]);

  const handleNavigateHome = () => {
    navigate("/find-house");
  };

  const handleNavigateProfile = () => {
    navigate("/profile-details");
  };
  
  const handleFindHouse = () => {
    navigate("/find-house");
  };
  
  const handleProfileClick = (profile: UserProfile) => {
    navigate(`/person-details/${profile.id}`, { state: { profile } });
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Header with back button and navigation buttons */}
      <header className="p-4 border-b">
        <div className="flex items-center justify-between">
          <BackButton />
          
          <div className="flex gap-2">
            <button 
              onClick={handleFindHouse}
              className="bg-gray-100 text-black flex items-center gap-1 px-6 py-2 rounded-full"
            >
              <Home className="w-5 h-5" />
              Find House
            </button>
            <button className="bg-black text-white flex items-center gap-1 px-6 py-2 rounded-full">
              <User className="w-5 h-5" />
              Find People
            </button>
          </div>
          
          <button 
            onClick={handleNavigateProfile}
            className="text-red-500 rounded-full text-2xl"
          >
            →
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">People matching your profile</h1>
        
        <div className="space-y-4">
          {matchingProfiles.map((profile) => (
            <div 
              key={profile.id} 
              className="border rounded-xl p-4 shadow-sm" 
              onClick={() => handleProfileClick(profile)}
            >
              <div className="flex gap-4">
                <Avatar className="w-24 h-24 rounded-md">
                  <AvatarImage src={profile.imageUrl} alt={profile.name} className="object-cover" />
                  <AvatarFallback>{profile.name[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{profile.name}, {profile.age}</h2>
                  
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{profile.program}</span>
                      <Home className="w-4 h-4 ml-2 text-gray-500" />
                      <span className="text-sm">{profile.housingStatus}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 text-gray-500">🍽️</div>
                      <span className="text-sm">{profile.dietaryPreference}</span>
                      <div className="w-4 h-4 ml-2 text-gray-500">⚤</div>
                      <span className="text-sm">{profile.gender}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{profile.distance}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer navigation */}
      <footer className="border-t p-4 flex justify-around">
        <button 
          onClick={handleNavigateHome}
          className="text-red-500"
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

export default MatchingProfiles;
