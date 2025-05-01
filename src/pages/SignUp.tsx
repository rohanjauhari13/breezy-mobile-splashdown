
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import BackButton from "@/components/BackButton";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const navigate = useNavigate();

  // Check if email already exists in database
  const checkEmailExists = async (email: string) => {
    if (!email) return;
    
    setIsCheckingEmail(true);
    setEmailExists(false);
    
    try {
      // Query user_profiles table for the email
      const { data, error } = await supabase
        .from('user_profiles')
        .select('email')
        .eq('email', email)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error("Error checking email:", error);
      } else {
        // If data exists, email is already registered
        if (data) {
          setEmailExists(true);
        }
      }
    } catch (err) {
      console.error("Failed to check email:", err);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  // Handle email input with debounce
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setSchoolEmail(newEmail);
    
    // Clear existing timeout
    if (window.emailCheckTimeout) {
      clearTimeout(window.emailCheckTimeout);
    }
    
    // Set new timeout to check email after 500ms of inactivity
    window.emailCheckTimeout = setTimeout(() => {
      checkEmailExists(newEmail);
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    // Final check before submission
    try {
      setIsCheckingEmail(true);
      const { data } = await supabase
        .from('user_profiles')
        .select('email')
        .eq('email', schoolEmail)
        .single();
      
      if (data) {
        setEmailExists(true);
        toast.error("This email is already registered");
        setIsCheckingEmail(false);
        return;
      }
      
      setIsCheckingEmail(false);
      console.log("Sign up attempt with:", { name, email: schoolEmail, password });
      // Navigate to verification page with email in state
      navigate("/verify-email", { state: { email: schoolEmail } });
      
    } catch (error) {
      setIsCheckingEmail(false);
      // If error is not found, it means email doesn't exist, which is good
      console.log("Sign up attempt with:", { name, email: schoolEmail, password });
      navigate("/verify-email", { state: { email: schoolEmail } });
    }
  };

  return (
    <div className="w-full min-h-screen bg-white px-6 py-12 flex flex-col">
      <div className="mb-6">
        <BackButton />
      </div>
      
      <div className="mt-2 mb-12">
        <h1 className="text-4xl font-semibold mb-8">Create Account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-lg font-medium">Name</label>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-14 text-lg rounded-lg"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-lg font-medium">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="Email address"
              value={schoolEmail}
              onChange={handleEmailChange}
              className={`h-14 text-lg rounded-lg ${emailExists ? 'border-red-500' : ''}`}
              required
              disabled={isCheckingEmail}
            />
            {emailExists && (
              <Alert variant="destructive" className="mt-2">
                <AlertTitle>Email already registered</AlertTitle>
                <AlertDescription>
                  This email is already in use. Please use a different email or sign in.
                </AlertDescription>
              </Alert>
            )}
            <p className="text-gray-400 text-sm mt-2">An OTP will be sent to your email.</p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-lg font-medium">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-14 text-lg rounded-lg"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-lg font-medium">Confirm Password</label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-14 text-lg rounded-lg"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-black text-white hover:bg-gray-800 rounded-lg py-6 text-lg font-medium h-auto mt-4"
            disabled={isCheckingEmail || emailExists}
          >
            {isCheckingEmail ? "Checking..." : "Create Account"}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <div className="inline-block bg-gray-100 px-6 py-3 rounded-full">
            <p className="text-gray-700">
              Already have an account? <span 
                className="font-medium underline cursor-pointer" 
                onClick={() => navigate("/signin")}
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
