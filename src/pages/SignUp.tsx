
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up attempt with:", { email, password });
    // Handle registration logic here
  };

  return (
    <div className="w-full min-h-screen bg-white px-6 py-12 flex flex-col">
      <div className="mt-12">
        <h1 className="text-4xl font-bold mb-8">Sign Up</h1>
        
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
          >
            Create Account
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
