import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface TranscriptionDisplayProps {
  transcription: string;
  isLoading: boolean;
}

export const TranscriptionDisplay = ({ transcription, isLoading }: TranscriptionDisplayProps) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="w-5 h-5 text-primary" />
          Transcription
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[95%]" />
          </div>
        ) : transcription ? (
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">
            {transcription}
          </p>
        ) : (
          <p className="text-muted-foreground italic">
            No transcription yet. Record or upload audio to get started.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
