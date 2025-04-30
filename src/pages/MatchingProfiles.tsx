
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Home, User, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProfileMatch {
  id: string;
  name: string;
  age: number;
  program: string;
  housingStatus: string;
  dietaryPreference: string;
  gender: string;
  distance: string;
  imageUrl: string;
}

const MatchingProfiles = () => {
  const navigate = useNavigate();
  
  // Mock data for matching profiles
  const [matchingProfiles] = useState<ProfileMatch[]>([
    {
      id: "1",
      name: "Chris",
      age: 21,
      program: "MSCS",
      housingStatus: "Found a House",
      dietaryPreference: "Vegetarian",
      gender: "Male",
      distance: "Within 2 miles from NU",
      imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "2",
      name: "Preethi",
      age: 23,
      program: "MSIS",
      housingStatus: "Found a house",
      dietaryPreference: "Non-Vegetarian",
      gender: "Female",
      distance: "Within 1 mile from NU",
      imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "3",
      name: "Riddhi",
      age: 26,
      program: "MSIS",
      housingStatus: "Looking for a house",
      dietaryPreference: "Non-Vegetarian",
      gender: "Female",
      distance: "Within 1 mile from NU",
      imageUrl: "https://images.unsplash.com/photo-1501286353178-1ec871814838?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "4",
      name: "Ronak",
      age: 24,
      program: "MSEM",
      housingStatus: "Looking for a house",
      dietaryPreference: "Non-Vegetarian",
      gender: "Male",
      distance: "Within 2 miles from NU",
      imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    }
  ]);

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleNavigateProfile = () => {
    navigate("/user-profile");
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
          <button className="bg-gray-100 text-black flex items-center gap-1 px-6 py-2 rounded-full">
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
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">People matching your profile</h1>
        
        <div className="space-y-4">
          {matchingProfiles.map((profile) => (
            <div key={profile.id} className="border rounded-xl p-4 shadow-sm">
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
        <button className="text-gray-400">
          <User className="w-6 h-6" />
        </button>
      </footer>
    </div>
  );
};

export default MatchingProfiles;
