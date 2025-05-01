
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { UserProfile as UserProfileType } from "@/types/userProfile";
import BackButton from "@/components/BackButton";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState("");
  const [location, setLocation] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  
  const handleSkip = () => {
    navigate("/looking-for-options");
    toast.success("Profile setup skipped");
  };
  
  const togglePreference = (preference: string) => {
    setPreferences(prev => 
      prev.includes(preference) 
        ? prev.filter(p => p !== preference) 
        : [...prev, preference]
    );
  };
  
  const toggleAmenity = (amenity: string) => {
    setAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const profileData: UserProfileType = {
      name,
      email,
      phone,
      program,
      location,
      preferences,
      amenities
    };

    try {
      const { error } = await supabase
        .from('user_profiles')
        .insert(profileData);

      if (error) throw error;

      console.log("Profile data saved:", profileData);
      toast.success("Profile created successfully");
      navigate("/looking-for-options");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const preferenceOptions = [
    "Vegetarian", "Non-Vegetarian", "Immediately Available",
    "All Girls", "All Boys", "Mixed Gender", 
    "Student", "Working", "I have a pet", "Non-Smoker", "Non-Drinker"
  ];
  
  const amenityOptions = [
    "Air conditioning", "Assisted living", "Disability Access",
    "Controlled access", "Non-Furnished", "In unit Laundry",
    "Elevator", "Extra Storage", "Closets", "Car Parking",
    "High speed internet", "Furnished", "Pet allowed"
  ];
  
  return (
    <div className="w-full min-h-screen bg-white px-6 py-8">
      <div className="flex justify-between mb-4">
        <BackButton />
        <Button 
          onClick={handleSkip} 
          variant="ghost" 
          className="text-black font-medium"
        >
          Skip <span className="ml-1">&#10095;</span>
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Tell us about yourself</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-lg font-medium">Name</label>
          <Input
            id="name"
            type="text"
            placeholder="Husky01"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-14 text-lg rounded-lg"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-lg font-medium">Northeastern email</label>
          <Input
            id="email"
            type="email"
            placeholder="XXX@northeastern.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 text-lg rounded-lg"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="text-lg font-medium">Phone Number</label>
          <Input
            id="phone"
            type="tel"
            placeholder="+01 234 567 89"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-14 text-lg rounded-lg"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="program" className="text-lg font-medium">Program of Study</label>
          <Input
            id="program"
            type="text"
            placeholder=""
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className="h-14 text-lg rounded-lg"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="location" className="text-lg font-medium">Where are you from?</label>
          <Input
            id="location"
            type="text"
            placeholder=""
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-14 text-lg rounded-lg"
          />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Preferences</h3>
          <div className="flex flex-wrap gap-2">
            {preferenceOptions.map(preference => (
              <button
                key={preference}
                type="button"
                onClick={() => togglePreference(preference)}
                className={`px-4 py-2 rounded-full text-sm ${
                  preferences.includes(preference) 
                    ? "bg-black text-white" 
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {preference}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Amenties</h3>
          <div className="flex flex-wrap gap-2">
            {amenityOptions.map(amenity => (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={`px-4 py-2 rounded-full text-sm ${
                  amenities.includes(amenity) 
                    ? "bg-black text-white" 
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {amenity}
              </button>
            ))}
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-black text-white hover:bg-gray-800 rounded-lg py-6 text-lg font-medium h-auto mt-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Continue"}
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
