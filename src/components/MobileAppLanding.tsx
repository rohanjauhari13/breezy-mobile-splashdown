
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const MobileAppLanding = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/lovable-uploads/d907e57c-1414-456d-97cf-3af117d78e5a.png"
          alt="Apartment building"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Overlay */}
      <div 
        className={`absolute bottom-0 left-0 right-0 z-10 bg-white p-8 pt-12 rounded-t-[40px] transform transition-transform duration-700 ease-in-out ${
          isLoaded ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Decorative Corner Accent */}
        <div className="absolute right-0 top-0 w-16 h-16 bg-[#BA4D4D] rounded-bl-[40px] transform translate-x-0 -translate-y-0"></div>

        {/* Logo and Tagline */}
        <div className="mb-10">
          <h1 className="text-[56px] font-bold leading-tight">HOMi</h1>
          <p className="text-sm text-gray-600 italic">powered by APMC Alpha</p>
        </div>

        {/* Main Message */}
        <div className="mb-8">
          <p className="text-2xl font-medium leading-snug">
            Discover a place to call <span className="font-bold">home</span> and{" "}
            <span className="font-bold">homies</span> who feel like family!
          </p>
        </div>

        {/* CTA Button */}
        <Button 
          className="w-full bg-black text-white hover:bg-gray-800 rounded-lg py-6 text-lg font-medium"
          onClick={() => console.log("Get Started clicked")}
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default MobileAppLanding;
