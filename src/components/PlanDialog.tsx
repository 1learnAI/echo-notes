import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

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
    price: "$0",
    period: "forever",
    limit: "2 audio messages",
    features: [
      "2 audio transcriptions per month",
      "AI-powered summaries",
      "Action items extraction",
      "Basic history access"
    ]
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    limit: "4 audio messages",
    features: [
      "4 audio transcriptions per month",
      "AI-powered summaries",
      "Action items extraction",
      "Full history access",
      "Priority processing"
    ],
    highlighted: true
  },
  {
    name: "Pro Plus",
    price: "$19",
    period: "/month",
    limit: "Unlimited audio messages",
    features: [
      "Unlimited audio transcriptions",
      "AI-powered summaries",
      "Action items extraction",
      "Full history access",
      "Priority processing",
      "Advanced analytics",
      "Export capabilities"
    ]
  }
];

export function PlanDialog({ open, onOpenChange, currentUsage, maxUsage, currentPlan }: PlanDialogProps) {
  const getCurrentPlanName = () => {
    if (maxUsage === 2) return "Free";
    if (maxUsage === 4) return "Pro";
    return "Pro Plus";
  };

  const userCurrentPlan = getCurrentPlanName();

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
                className="w-full"
                variant={plan.highlighted ? "default" : "outline"}
                disabled={plan.name === userCurrentPlan}
                onClick={() => {
                  if (plan.name !== userCurrentPlan) {
                    console.log(`Upgrading to ${plan.name}`);
                    // TODO: Implement payment flow
                  }
                }}
              >
                {plan.name === userCurrentPlan ? "Current Plan" : "Upgrade Now"}
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          All plans reset monthly. Cancel anytime.
        </p>
      </DialogContent>
    </Dialog>
  );
}
