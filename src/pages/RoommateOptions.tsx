import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";

const RoommateOptions = () => {
  const navigate = useNavigate();
  
  const handleOptionSelect = (option: string) => {
    console.log(`Selected roommate option: ${option}`);
    // Navigate to the appropriate page based on selection
    if (option === "looking_for_both") {
      navigate("/matching-profiles");
    } else if (option === "have_house") {
      navigate("/house-details-form");
    }
  };
  
  return (
    <div className="w-full min-h-screen bg-white px-6 py-8">
      <BackButton className="mb-10" />
      
      <h1 className="text-4xl font-bold mb-12">
        What are you looking for?
      </h1>
      
      <div className="space-y-6">
        <Card 
          className="p-6 border border-gray-200 rounded-2xl flex items-center cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleOptionSelect("looking_for_both")}
        >
          <div className="text-center w-full py-4">
            <h2 className="text-xl font-medium">Are you looking for a house and roommates?</h2>
          </div>
        </Card>
        
        <Card 
          className="p-6 border border-gray-200 rounded-2xl flex items-center cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleOptionSelect("have_house")}
        >
          <div className="text-center w-full py-4">
            <h2 className="text-xl font-medium">Do you have a house and are looking for roommates?</h2>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RoommateOptions;
