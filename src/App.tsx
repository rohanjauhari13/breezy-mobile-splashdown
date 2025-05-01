
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import VerifyEmail from "./pages/VerifyEmail";
import UserProfile from "./pages/UserProfile";
import LookingForOptions from "./pages/LookingForOptions";
import RoommateOptions from "./pages/RoommateOptions";
import MatchingProfiles from "./pages/MatchingProfiles";
import FindHouse from "./pages/FindHouse";
import ProfileDetails from "./pages/ProfileDetails";
import HouseDetails from "./pages/HouseDetails";
import PersonDetails from "./pages/PersonDetails";
import HouseDetailsForm from "./pages/HouseDetailsForm";
import NotFound from "./pages/NotFound";

// Create a new QueryClient instance inside the component function
const App = () => {
  // Initialize queryClient inside the component function
  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/looking-for-options" element={<LookingForOptions />} />
              <Route path="/roommate-options" element={<RoommateOptions />} />
              <Route path="/matching-profiles" element={<MatchingProfiles />} />
              <Route path="/find-house" element={<FindHouse />} />
              <Route path="/house-details/:id" element={<HouseDetails />} />
              <Route path="/profile-details" element={<ProfileDetails />} />
              <Route path="/person-details/:id" element={<PersonDetails />} />
              <Route path="/house-details-form" element={<HouseDetailsForm />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
