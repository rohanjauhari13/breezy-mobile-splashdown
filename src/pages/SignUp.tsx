
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    console.log("Sign up attempt with:", { name, email: schoolEmail, password });
    // Handle registration logic here
    toast.success("Account created successfully!");
    navigate("/signin");
  };

  return (
    <div className="w-full min-h-screen bg-white px-6 py-12 flex flex-col">
      <div className="mt-8 mb-12">
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
            <label htmlFor="email" className="text-lg font-medium">Northeastern email</label>
            <Input
              id="email"
              type="email"
              placeholder="xxx@northeastern.edu"
              value={schoolEmail}
              onChange={(e) => setSchoolEmail(e.target.value)}
              className="h-14 text-lg rounded-lg"
              required
            />
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
