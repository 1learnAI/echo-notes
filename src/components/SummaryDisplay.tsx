import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface SummaryDisplayProps {
  summary: string;
  isLoading: boolean;
}

export const SummaryDisplay = ({ summary, isLoading }: SummaryDisplayProps) => {
  return (
    <Card className="shadow-md bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ScrollText className="w-5 h-5 text-primary" />
          Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[85%]" />
          </div>
        ) : summary ? (
          <p className="text-foreground leading-relaxed">
            {summary}
          </p>
        ) : (
          <p className="text-muted-foreground italic">
            Summary will be generated after transcription.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
