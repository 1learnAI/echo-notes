import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUsage: number;
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

export function PlanDialog({ open, onOpenChange, currentUsage }: PlanDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Upgrade Your Plan
          </DialogTitle>
          <p className="text-center text-muted-foreground mt-2">
            You've used {currentUsage} audio messages. Choose a plan that fits your needs.
          </p>
        </DialogHeader>
        
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-lg border p-6 ${
                plan.highlighted
                  ? "border-primary shadow-lg scale-105"
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
                disabled={plan.name === "Free"}
              >
                {plan.name === "Free" ? "Current Plan" : "Upgrade Now"}
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
