
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/sonner";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast.error(error.message || "Failed to sign in");
        console.error("Login error:", error);
      } else if (data.user) {
        toast.success("Successfully signed in");
        navigate("/find-house");
      }
    } catch (error) {
      console.error("Unexpected error during login:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white px-6 py-12 flex flex-col">
      <div className="mt-12">
        <h1 className="text-4xl font-bold mb-8">Sign In</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-lg">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 text-lg rounded-lg"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-lg">Password</label>
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
          
          <Button 
            type="submit" 
            className="w-full bg-black text-white hover:bg-gray-800 rounded-lg py-6 text-lg font-medium h-auto"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Login"}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <div className="inline-block bg-gray-100 px-6 py-3 rounded-full">
            <p className="text-gray-700">
              Don't have an account? <span 
                className="font-medium underline cursor-pointer" 
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
