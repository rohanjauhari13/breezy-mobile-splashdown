import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Home, User, Edit, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";

interface ProfileDetailsProps {
  name: string;
  email: string;
  imageUrl?: string;
  program?: string;
}

const ProfileDetails = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileDetailsProps>({
    name: "Loading...",
    email: "Loading...",
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleNavigateHome = () => {
    navigate("/find-house");
  };

  const handleEditProfile = () => {
    navigate("/user-profile");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    // Mock profile data loading
    setTimeout(() => {
      setProfile({
        name: "Preethi",
        email: "preethi@northeastern.edu",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        program: "MSIS",
      });
    }, 500);
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b">
        <BackButton />
        <h1 className="text-2xl font-bold">My Profile</h1>
        <button 
          onClick={handleEditProfile}
          className="flex items-center gap-1 text-red-500"
        >
          <Edit className="w-5 h-5" />
          <span>Edit</span>
        </button>
      </div>

      {/* Profile content */}
      <div className="p-6 flex flex-col items-center">
        <Avatar className="w-32 h-32 rounded-full mb-4">
          {profile.imageUrl ? (
            <AvatarImage src={profile.imageUrl} alt={profile.name} className="object-cover" />
          ) : (
            <AvatarFallback>{profile.name[0]}</AvatarFallback>
          )}
        </Avatar>
        
        <h2 className="text-2xl font-semibold">{profile.name}</h2>
        <p className="text-gray-600">{profile.email}</p>
        <p className="text-gray-600">{profile.program}</p>
      </div>

      {/* Footer navigation */}
      <footer className="border-t p-4 flex justify-around">
        <button 
          onClick={handleNavigateHome}
          className="text-black"
        >
          <Home className="w-6 h-6" />
        </button>
        <button className="text-gray-400">
          <User className="w-6 h-6" />
        </button>
      </footer>
    </div>
  );
};

export default ProfileDetails;
