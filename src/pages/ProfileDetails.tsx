
import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Home, User, Edit, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { UserProfile as UserProfileType } from "@/types/userProfile";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";

const ProfileDetails = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch profile data from Supabase
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // First try to get the current session
        const { data: sessionData } = await supabase.auth.getSession();
        const userId = sessionData?.session?.user?.id;
        
        if (userId) {
          // If user is authenticated, fetch their profile
          const { data, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', userId)
            .single();
          
          if (error) {
            console.error("Error fetching profile:", error);
            toast.error("Could not fetch profile data");
            
            // If no data found, use mock data as fallback
            setProfile({
              name: "Husky01",
              email: "name@northeastern.edu",
              phone: "+01 234 567 89",
              program: "MSCS",
              location: "Boston",
              preferences: ["Non-Vegetarian", "Student", "Non-Smoker"],
              amenities: ["Air conditioning", "Furnished", "High speed internet"]
            });
          } else if (data) {
            setProfile(data);
          }
        } else {
          // If no active session, use mock data
          console.log("No active session, using mock data");
          setProfile({
            name: "Husky01",
            email: "name@northeastern.edu",
            phone: "+01 234 567 89",
            program: "MSCS",
            location: "Boston",
            preferences: ["Non-Vegetarian", "Student", "Non-Smoker"],
            amenities: ["Air conditioning", "Furnished", "High speed internet"]
          });
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast.error("Error loading profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleEditProfile = () => {
    navigate("/user-profile");
  };

  const handleGoBack = () => {
    // Using browser history to go back to the previous page
    navigate(-1);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
        toast.error("Failed to log out");
      } else {
        toast.success("Successfully logged out");
        navigate("/signin");
      }
    } catch (error) {
      console.error("Failed to sign out:", error);
      toast.error("Failed to log out");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="p-6 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <Button 
            onClick={handleGoBack}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
        <button 
          onClick={handleLogout}
          className="text-red-500"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </header>

      {/* Profile Content */}
      <main className="flex-1 flex flex-col items-center p-6">
        {/* Profile Image */}
        <div className="relative mt-8">
          <Avatar className="w-32 h-32 rounded-full border-4 border-white shadow-lg">
            <AvatarImage src="https://api.dicebear.com/7.x/personas/svg?seed=Husky" alt={profile?.name} className="object-cover" />
            <AvatarFallback>{profile?.name?.[0]}</AvatarFallback>
          </Avatar>
          <button 
            onClick={handleEditProfile}
            className="absolute bottom-1 right-1 bg-white rounded-full p-2 shadow"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
        
        {/* Profile Info */}
        <h2 className="text-2xl font-bold mt-4">{profile?.name}</h2>
        <p className="text-gray-600 mt-1">{profile?.email} | {profile?.phone}</p>
        
        {/* Edit Profile Button */}
        <button 
          onClick={handleEditProfile}
          className="mt-8 flex items-center gap-2 border rounded-full px-6 py-3 shadow-sm hover:bg-gray-50 transition-colors"
        >
          <span className="w-6 h-6 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5 9H13.5C12.9477 9 12.5 8.55228 12.5 8V5C12.5 4.44772 12.9477 4 13.5 4H19.5C20.0523 4 20.5 4.44772 20.5 5V8C20.5 8.55228 20.0523 9 19.5 9H16.5ZM4.5 12H10.5C11.0523 12 11.5 12.4477 11.5 13V20C11.5 20.5523 11.0523 21 10.5 21H4.5C3.94772 21 3.5 20.5523 3.5 20V13C3.5 12.4477 3.94772 12 4.5 12ZM13.5 15H19.5C20.0523 15 20.5 15.4477 20.5 16V20C20.5 20.5523 20.0523 21 19.5 21H13.5C12.9477 21 12.5 20.5523 12.5 20V16C12.5 15.4477 12.9477 15 13.5 15ZM10.5 4H4.5C3.94772 4 3.5 4.44772 3.5 5V9C3.5 9.55228 3.94772 10 4.5 10H10.5C11.0523 10 11.5 9.55228 11.5 9V5C11.5 4.44772 11.0523 4 10.5 4Z" fill="currentColor"/>
            </svg>
          </span>
          <span>Edit profile information</span>
        </button>

        {/* Additional Profile Details (optional) */}
        {profile?.program && (
          <div className="mt-6 w-full max-w-md">
            <h3 className="font-medium text-gray-800 mb-2">Program</h3>
            <p className="text-gray-600">{profile.program}</p>
          </div>
        )}
        
        {profile?.location && (
          <div className="mt-4 w-full max-w-md">
            <h3 className="font-medium text-gray-800 mb-2">From</h3>
            <p className="text-gray-600">{profile.location}</p>
          </div>
        )}

        {profile?.preferences && profile.preferences.length > 0 && (
          <div className="mt-4 w-full max-w-md">
            <h3 className="font-medium text-gray-800 mb-2">Preferences</h3>
            <div className="flex flex-wrap gap-2">
              {profile.preferences.map((pref) => (
                <span key={pref} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {pref}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer navigation */}
      <footer className="border-t p-4 flex justify-around">
        <button 
          onClick={handleNavigateHome}
          className="text-gray-400"
        >
          <Home className="w-6 h-6" />
        </button>
        <button className="text-red-500">
          <User className="w-6 h-6" />
        </button>
      </footer>
    </div>
  );
};

export default ProfileDetails;
