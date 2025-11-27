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
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100 border-red-300';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 border-yellow-300';
      case 'Low': return 'text-green-600 bg-green-100 border-green-300';
      default: return '';
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'Work': return 'text-blue-600 bg-blue-100 border-blue-300';
      case 'Personal': return 'text-purple-600 bg-purple-100 border-purple-300';
      case 'Follow-Up': return 'text-orange-600 bg-orange-100 border-orange-300';
      case 'Idea': return 'text-pink-600 bg-pink-100 border-pink-300';
      default: return '';
    }
  };

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
                <div className="flex-1">
                  <label
                    htmlFor={item.id}
                    className={`cursor-pointer text-sm leading-relaxed block ${
                      item.completed ? "line-through text-muted-foreground" : "text-foreground"
                    }`}
                  >
                    {item.text}
                  </label>
                  {(item.priority || item.category) && (
                    <div className="flex gap-2 mt-2">
                      {item.priority && (
                        <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                      )}
                      {item.category && (
                        <span className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                      )}
                    </div>
                  )}
                </div>
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
