import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import RoommateIcon from "@/components/icons/RoommateIcon";
import HomeIcon from "@/components/icons/HomeIcon";
import BackButton from "@/components/BackButton";

const LookingForOptions = () => {
  const navigate = useNavigate();
  
  const handleOptionSelect = (option: string) => {
    console.log(`Selected option: ${option}`);
    // Navigate to the appropriate page based on selection
    if (option === "roommates") {
      navigate("/roommate-options");
    } else {
      navigate("/");
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
          onClick={() => handleOptionSelect("roommates")}
        >
          <div className="flex-shrink-0 mr-6">
            <RoommateIcon />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Find Roommates</h2>
          </div>
        </Card>
        
        <Card 
          className="p-6 border border-gray-200 rounded-2xl flex items-center cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleOptionSelect("home")}
        >
          <div className="flex-shrink-0 mr-6">
            <HomeIcon />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Find Home</h2>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LookingForOptions;
