import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, User, RefreshCcw, ArrowRight } from "lucide-react";
import { UserProfile } from "@/types/userProfile";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Card } from "@/components/ui/card";

const PersonDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const profile = location.state?.profile;
  
  // Default profile if none was passed through navigation
  const [personProfile] = useState<UserProfile>(
    profile || {
      id: "2",
      name: "Preethi",
      email: "preethi@northeastern.edu",
      phone: "+1 (555) 123-4567",
      program: "MSIS",
      location: "Within 1 mile from NU",
      preferences: ["Student", "All Girls Apartment", "Vegetarian", "Non-smoker", "Non-drinker", "Move-in Immediately"],
      amenities: ["Air conditioning", "Assisted living", "Disability Access", "Controlled access", "Cable Ready", "College", "Corporate", "Elevator", "Extra Storage", "High speed internet", "Garage", "Pets allowed"]
    }
  );

  const handleBack = () => {
    navigate(-1);
  };

  const handleNavigateHome = () => {
    navigate("/find-house");
  };

  const handleNavigateProfile = () => {
    navigate("/profile-details");
  };
  
  // Updated to navigate to house-details with the correct ID from the profile
  const handleViewPostedHouse = () => {
    const houseId = profile?.postedHouseId || "1"; // Use the postedHouseId from profile if available
    
    navigate(`/house-details/${houseId}`, { 
      state: { 
        listing: {
          id: houseId,
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
            name: personProfile.name,
            title: personProfile.program,
            avatar: profile?.imageUrl
          }
        }
      }
    });
  };
  
  const handleContact = () => {
    toast.success(`Contacting ${personProfile.name}...`, {
      description: "A message has been sent to this user."
    });
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Back button and refresh button */}
      <div className="p-4 flex justify-between items-center">
        <BackButton />
        <h1 className="text-2xl font-bold">Profile Details</h1>
        <button className="text-red-500">
          <RefreshCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Person profile header */}
      <div className="px-6 py-4">
        <div className="flex items-start gap-4">
          <Avatar className="w-32 h-32 rounded-md">
            {profile?.imageUrl ? (
              <AvatarImage 
                src={profile.imageUrl} 
                alt={personProfile.name} 
                className="object-cover" 
              />
            ) : (
              <AvatarFallback className="text-3xl">{personProfile.name[0]}</AvatarFallback>
            )}
          </Avatar>
          
          <div>
            <h2 className="text-3xl font-bold">{personProfile.name}, {profile?.age || 23}</h2>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                </span>
                <span>{personProfile.program}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </span>
                <span>{profile?.housingStatus || "Found a House"}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-700">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M11 19H4a2 2 0 01-2-2V7a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-7"/><path d="M12 19v-4"/><path d="M8 3v4"/><path d="M16 3v4"/></svg>
                </span>
                <span>{profile?.dietaryPreference || "Non-Vegetarian"}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
                </span>
                <span>{profile?.gender || "Female"}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </span>
                <span>{personProfile.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posted House Details button */}
      <div className="px-6 py-2">
        <Card 
          className="flex items-center p-4 cursor-pointer"
          onClick={handleViewPostedHouse}
        >
          <div className="h-16 w-20 rounded-md overflow-hidden mr-4">
            <img 
              src="https://images.unsplash.com/photo-1518005020951-eccb494ad742" 
              alt="House" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg text-gray-500 font-medium">Posted House Details</h3>
            <p className="text-gray-700">16, Delle Ave. - Mission Main</p>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400" />
        </Card>
      </div>

      {/* Preferences section */}
      <div className="px-6 py-4">
        <h3 className="text-2xl font-bold mb-4">Preferences</h3>
        <div className="flex flex-wrap gap-2">
          {personProfile.preferences.map((preference, index) => (
            <div 
              key={index}
              className="bg-gray-100 py-2 px-4 rounded-full text-sm"
            >
              {preference}
            </div>
          ))}
        </div>
      </div>
      
      {/* Amenities section */}
      <div className="px-6 py-4">
        <h3 className="text-2xl font-bold mb-4">Amenties</h3>
        <div className="flex flex-wrap gap-2">
          {personProfile.amenities.map((amenity, index) => (
            <div 
              key={index}
              className="bg-gray-100 py-2 px-4 rounded-full text-sm"
            >
              {amenity}
            </div>
          ))}
        </div>
      </div>

      {/* Contact button - now positioned at bottom of content instead of fixed */}
      <div className="px-6 py-8 mt-auto mb-16">
        <Button 
          onClick={handleContact}
          className="w-full py-6 text-lg font-medium h-auto flex items-center justify-center gap-2 bg-black hover:bg-gray-800"
        >
          Contact
        </Button>
      </div>

      {/* Footer navigation */}
      <footer className="border-t p-4 flex justify-around fixed bottom-0 left-0 right-0 bg-white">
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

export default PersonDetails;
