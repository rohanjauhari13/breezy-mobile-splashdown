
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Extract email from location state
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
      // Generate OTP when component mounts
      generateAndSendOtp(location.state.email);
    } else {
      // Redirect back to signup if no email was provided
      navigate("/signup");
    }
  }, [location.state, navigate]);

  // Function to generate and "send" a random 4-digit OTP
  const generateAndSendOtp = (emailAddress: string) => {
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    
    // In a real application, this would call an API to send the email
    console.log(`OTP ${newOtp} would be sent to ${emailAddress}`);
    toast.success(`OTP sent to ${emailAddress}`, {
      description: "Please check your inbox",
    });
  };

  // Handle resend OTP
  const handleResend = () => {
    generateAndSendOtp(email);
    toast.success("OTP resent successfully");
  };

  // Handle verify OTP
  const handleVerify = () => {
    if (otp === generatedOtp) {
      toast.success("Email verified successfully");
      // In a real app, you would create the user account here
      navigate("/signin");
    } else {
      toast.error("Invalid OTP, please try again");
    }
  };

  // Handle OTP input changes - digit by digit
  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  return (
    <div className="w-full min-h-screen bg-white px-6 py-12 flex flex-col">
      <div className="mb-8">
        <button 
          onClick={() => navigate("/signup")} 
          className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="mt-4 mb-12">
        <h1 className="text-4xl font-semibold mb-4">Verify Email</h1>
        <p className="text-gray-500 text-lg">
          We have sent a verification code to your <br />
          {email || "xxx@northeastern.edu"} email
        </p>
        
        <div className="mt-10">
          <label className="text-xl font-medium mb-4 block">Code</label>
          
          {/* Replace the InputOTP component with a simpler implementation */}
          <div className="flex gap-3">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="w-16 h-16 text-2xl border border-gray-300 rounded text-center"
                value={otp[index] || ''}
                onChange={(e) => {
                  const newOtp = otp.split('');
                  newOtp[index] = e.target.value.slice(-1);
                  setOtp(newOtp.join(''));
                  
                  // Auto focus next input if value is entered
                  if (e.target.value && index < 3) {
                    const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement;
                    if (nextInput) nextInput.focus();
                  }
                }}
                onKeyDown={(e) => {
                  // Handle backspace to focus previous input
                  if (e.key === 'Backspace' && !otp[index] && index > 0) {
                    const prevInput = document.querySelector(`input[data-index="${index - 1}"]`) as HTMLInputElement;
                    if (prevInput) prevInput.focus();
                  }
                }}
                data-index={index}
              />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-500">
              Didn't receive the code? <span 
                className="text-black underline cursor-pointer font-medium" 
                onClick={handleResend}
              >
                Resend
              </span>
            </p>
          </div>
        </div>
        
        <Button 
          onClick={handleVerify}
          className="w-full bg-black text-white hover:bg-gray-800 rounded-lg py-6 text-lg font-medium h-auto mt-10"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmail;
