import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Cancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Show cancel message
    toast.info("Payment cancelled. You can upgrade anytime!");
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <XCircle className="w-12 h-12 text-muted-foreground" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Payment Cancelled</h1>
          <p className="text-muted-foreground">
            Your payment was cancelled. No charges were made.
          </p>
          <p className="text-sm text-muted-foreground">
            You can upgrade your plan anytime from your dashboard.
          </p>
        </div>

        <Button onClick={() => navigate("/")} size="lg">
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Cancel;
