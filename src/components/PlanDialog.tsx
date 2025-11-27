import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface PlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUsage: number;
  maxUsage: number;
  currentPlan: string;
}

const plans = [
  {
    name: "Free",
    planId: "free",
    price: "$0",
    period: "forever",
    limit: "2 audio messages",
    maxUsage: 2,
    priceId: null,
    features: [
      "2 audio transcriptions per month",
      "AI-powered summaries",
      "Action items extraction",
      "Basic history access"
    ]
  },
  {
    name: "Pro",
    planId: "pro",
    price: "$9",
    period: "/month",
    limit: "4 audio messages",
    maxUsage: 4,
    priceId: "price_1SXhR7PAM5xgslVz8L2vxNpJ",
    features: [
      "4 audio transcriptions per month",
      "AI-powered summaries with priority",
      "Action items with categories",
      "Full history access",
      "Priority processing"
    ],
    highlighted: true
  },
  {
    name: "Pro Plus",
    planId: "pro_plus",
    price: "$19",
    period: "/month",
    limit: "Unlimited audio messages",
    maxUsage: 999999,
    priceId: "price_1SXhRYPAM5xgslVzgQAII7pI",
    features: [
      "Unlimited audio transcriptions",
      "AI-powered summaries with priority",
      "Action items with categories",
      "Full history access",
      "Priority processing",
      "Advanced analytics",
      "Export capabilities"
    ]
  }
];

export function PlanDialog({ open, onOpenChange, currentUsage, maxUsage, currentPlan }: PlanDialogProps) {
  const [isUpgrading, setIsUpgrading] = useState(false);

  const getCurrentPlanName = () => {
    if (currentPlan === 'pro_plus') return "Pro Plus";
    if (currentPlan === 'pro') return "Pro";
    return "Free";
  };

  const userCurrentPlan = getCurrentPlanName();

  const handleUpgrade = async (priceId: string | null, planName: string, planId: string) => {
    if (!priceId) {
      toast.info("Downgrading plans is not available. Please contact support.");
      return;
    }

    // Prevent upgrade if already on a higher or equal plan
    if (planId === currentPlan) {
      toast.info("You're already on this plan");
      return;
    }

    setIsUpgrading(true);
    try {
      // Call create-checkout edge function
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId },
      });

      if (error) throw error;

      if (data?.url) {
        // Open Stripe checkout in new tab
        window.open(data.url, '_blank');
        toast.success("Opening Stripe checkout. Your plan will update automatically after payment.");
        onOpenChange(false);
      }
    } catch (error) {
      console.error('Error starting checkout:', error);
      toast.error("Failed to start checkout", {
        description: "Please try again later."
      });
    } finally {
      setIsUpgrading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Plan
          </DialogTitle>
          <div className="text-center mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Current Plan</p>
            <p className="text-xl font-semibold mt-1">{userCurrentPlan}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {currentUsage} / {maxUsage} audio messages used
            </p>
          </div>
        </DialogHeader>
        
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-lg border p-6 ${
                plan.highlighted
                  ? "border-primary shadow-lg"
                  : "border-border"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.limit}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                type="button"
                className="w-full"
                variant={plan.highlighted ? "default" : "outline"}
                disabled={plan.planId === currentPlan || isUpgrading}
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpgrade(plan.priceId, plan.name, plan.planId);
                }}
              >
                {isUpgrading 
                  ? "Processing..." 
                  : plan.planId === currentPlan 
                    ? "Current Plan" 
                    : plan.priceId 
                      ? "Upgrade Now" 
                      : "Contact Support"}
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          All plans are billed monthly via Stripe. Cancel anytime through your subscription portal.
        </p>
      </DialogContent>
    </Dialog>
  );
}
