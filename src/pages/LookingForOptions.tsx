
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RoommateIcon from "@/components/icons/RoommateIcon";
import HomeIcon from "@/components/icons/HomeIcon";

const LookingForOptions = () => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate("/user-profile");
  };
  
  const handleOptionSelect = (option: string) => {
    console.log(`Selected option: ${option}`);
    // Navigate to the appropriate page based on selection
    navigate("/");
  };
  
  return (
    <div className="w-full min-h-screen bg-white px-6 py-8">
      <Button
        onClick={handleGoBack}
        variant="ghost"
        className="rounded-full bg-gray-100 w-12 h-12 p-0 mb-10"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
      
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
