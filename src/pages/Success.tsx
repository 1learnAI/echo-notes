import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Show success message
    toast.success("Payment successful! Your plan has been upgraded.");
    
    // Redirect to home after 3 seconds
    const timeout = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Payment Successful!</h1>
          <p className="text-muted-foreground">
            Your subscription has been upgraded successfully.
          </p>
          <p className="text-sm text-muted-foreground">
            Redirecting you to the app...
          </p>
        </div>

        <Button onClick={() => navigate("/")} size="lg">
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Success;
