
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
