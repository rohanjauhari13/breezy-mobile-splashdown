import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "sonner";
import BackButton from "@/components/BackButton";

const HouseDetailsForm = () => {
  const navigate = useNavigate();
  
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState([5]);
  const [isAccessible, setIsAccessible] = useState(false);
  const [rent, setRent] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);

  const handleGoBack = () => {
    navigate("/roommate-options");
  };
  
  const handlePreferenceToggle = (value: string) => {
    setPreferences(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleAmenityToggle = (value: string) => {
    setAmenities(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically save the data to a database
    console.log({
      address,
      distance: distance[0],
      isAccessible,
      rent,
      bedrooms,
      bathrooms,
      preferences,
      amenities
    });
    
    toast("House details saved successfully!");
    navigate("/matching-profiles");
  };

  return (
    <div className="w-full min-h-screen bg-white px-6 py-8">
      <BackButton className="mb-10" />
      
      <h1 className="text-4xl font-bold mb-8 text-center">
        Enter House Details
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="address" className="text-lg font-medium">Address</label>
          <Input 
            id="address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            placeholder="Enter your address" 
            className="mt-1" 
            required
          />
        </div>
        
        <div>
          <label htmlFor="distance" className="text-lg font-medium">Distance from NU</label>
          <div className="flex items-center justify-between mt-1">
            <span>0</span>
            <span>10 Mile(s)</span>
          </div>
          <Slider 
            id="distance" 
            value={distance} 
            onValueChange={setDistance} 
            max={10} 
            step={0.1}
            className="mt-1"
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="accessible" className="text-lg font-medium">Red-eye Accessible?</label>
            <Switch 
              id="accessible" 
              checked={isAccessible} 
              onCheckedChange={setIsAccessible}
              className="data-[state=checked]:bg-red-500"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="rent" className="text-lg font-medium">Rent</label>
          <Input 
            id="rent" 
            value={rent} 
            onChange={(e) => setRent(e.target.value)} 
            placeholder="Enter monthly rent" 
            type="number"
            className="mt-1" 
            required
          />
        </div>
        
        <div>
          <label className="text-lg font-medium">Bedrooms</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {["Any", "1", "2", "3", "4", "5+"].map((value) => (
              <Button 
                key={value}
                type="button"
                variant={bedrooms === value ? "default" : "outline"}
                onClick={() => setBedrooms(value)}
                className={`rounded-full px-6 ${bedrooms === value ? "bg-primary text-white" : "bg-gray-100 border-0"}`}
              >
                {value}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="text-lg font-medium">Bathrooms</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {["Any", "1.0", "1.5", "2.0", "2.5", "3+"].map((value) => (
              <Button 
                key={value}
                type="button"
                variant={bathrooms === value ? "default" : "outline"}
                onClick={() => setBathrooms(value)}
                className={`rounded-full px-6 ${bathrooms === value ? "bg-primary text-white" : "bg-gray-100 border-0"}`}
              >
                {value}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="text-lg font-medium">Preferences</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {["Vegetarian", "Non-Vegetarian", "Immediately Available", "All Girls", "All Boys", "Mixed Gender", 
              "Student", "Working", "I have a pet", "Non-Smoker", "Non-Drinker"].map((item) => (
              <Button 
                key={item}
                type="button"
                variant="outline"
                className={`bg-gray-100 border-0 rounded-full ${preferences.includes(item) ? "bg-primary text-white" : ""}`}
                onClick={() => handlePreferenceToggle(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="text-lg font-medium">Amenities</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {["Air conditioning", "Assisted living", "Disability Access", "Controlled access", 
              "Available now", "In unit Laundry", "Elevator", "Extra Storage", "Closets", "Car Parking"].map((item) => (
              <Button 
                key={item}
                type="button"
                variant="outline"
                className={`bg-gray-100 border-0 rounded-full ${amenities.includes(item) ? "bg-primary text-white" : ""}`}
                onClick={() => handleAmenityToggle(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
        
        <Button type="submit" className="w-full py-6 text-lg">
          Find Roommates
        </Button>
      </form>
    </div>
  );
};

export default HouseDetailsForm;
