import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const RefreshSubscription = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const refreshAndRedirect = async () => {
      try {
        // Wait a moment for Stripe to process
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Check subscription status
        await supabase.functions.invoke('check-subscription');
        
        toast.success("Subscription updated successfully!");
      } catch (error) {
        console.error("Error refreshing subscription:", error);
        toast.info("Please refresh the page to see your updated plan");
      } finally {
        // Redirect to home
        navigate("/");
      }
    };

    refreshAndRedirect();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Updating your subscription...</h2>
          <p className="text-sm text-muted-foreground">Please wait a moment</p>
        </div>
      </div>
    </div>
  );
};

export default RefreshSubscription;
