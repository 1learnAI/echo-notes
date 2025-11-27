import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { History, Calendar, FileText, ListTodo } from "lucide-react";
import { TranscriptionSession } from "@/types/audio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface HistoryDrawerProps {
  sessions: TranscriptionSession[];
  onSelectSession: (session: TranscriptionSession) => void;
}

export const HistoryDrawer = ({ sessions, onSelectSession }: HistoryDrawerProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="lg">
          <History className="w-4 h-4 mr-2" />
          History
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            Transcription History
          </SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-8rem)] mt-6">
          {sessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <History className="w-12 h-12 text-muted-foreground mb-3 opacity-50" />
              <p className="text-muted-foreground">No sessions yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Your transcription history will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => onSelectSession(session)}
                  className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/5 cursor-pointer transition-all group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {formatDate(session.timestamp)}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {session.actionItems.length} tasks
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-foreground line-clamp-2 mb-3 group-hover:text-primary transition-colors">
                    {session.transcription || "No transcription"}
                  </p>
                  
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {session.transcription.length} chars
                    </div>
                    <div className="flex items-center gap-1">
                      <ListTodo className="w-3 h-3" />
                      {session.actionItems.filter(item => !item.completed).length} pending
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
