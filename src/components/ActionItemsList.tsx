import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ListTodo, Plus } from "lucide-react";
import { ActionItem } from "@/types/audio";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface ActionItemsListProps {
  actionItems: ActionItem[];
  isLoading: boolean;
  onToggle: (id: string) => void;
}

export const ActionItemsList = ({ actionItems, isLoading, onToggle }: ActionItemsListProps) => {
  return (
    <Card className="shadow-md bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ListTodo className="w-5 h-5 text-accent" />
          Action Items
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-[90%]" />
            <Skeleton className="h-6 w-[85%]" />
          </div>
        ) : actionItems.length > 0 ? (
          <div className="space-y-3">
            {actionItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-card hover:bg-accent/5 transition-colors"
              >
                <Checkbox
                  id={item.id}
                  checked={item.completed}
                  onCheckedChange={() => onToggle(item.id)}
                  className="mt-1"
                />
                <label
                  htmlFor={item.id}
                  className={`flex-1 cursor-pointer text-sm leading-relaxed ${
                    item.completed ? "line-through text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {item.text}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground italic">
            Action items will be extracted from the transcription.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
