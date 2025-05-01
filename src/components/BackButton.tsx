
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  className?: string;
}

const BackButton = ({ className = "" }: BackButtonProps) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Button
      onClick={handleBack}
      variant="ghost"
      className={`rounded-full bg-gray-100 w-12 h-12 p-0 ${className}`}
    >
      <ArrowLeft className="h-6 w-6" />
    </Button>
  );
};

export default BackButton;
