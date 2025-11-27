import { useState } from "react";
import { AudioRecorder } from "@/components/AudioRecorder";
import { TranscriptionDisplay } from "@/components/TranscriptionDisplay";
import { SummaryDisplay } from "@/components/SummaryDisplay";
import { ActionItemsList } from "@/components/ActionItemsList";
import { HistoryDrawer } from "@/components/HistoryDrawer";
import { TranscriptionSession, ActionItem } from "@/types/audio";
import { useToast } from "@/hooks/use-toast";
import { Headphones } from "lucide-react";

const Index = () => {
  const [currentSession, setCurrentSession] = useState<Partial<TranscriptionSession>>({
    transcription: "",
    summary: "",
    actionItems: [],
  });
  const [sessions, setSessions] = useState<TranscriptionSession[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleAudioReady = async (audioBlob: Blob, fileName: string) => {
    setIsProcessing(true);
    
    // Simulate processing - in production, this would call the OpenAI API
    toast({
      title: "Processing audio",
      description: "Transcribing your audio file...",
    });

    setTimeout(() => {
      // Mock transcription
      const mockTranscription = `This is a sample transcription of the audio file "${fileName}". In a production environment, this would be processed using OpenAI's Whisper API to convert speech to text accurately.`;
      
      const mockSummary = "Sample summary: The audio discusses key topics and important points that need to be addressed.";
      
      const mockActionItems: ActionItem[] = [
        { id: "1", text: "Review the transcription for accuracy", completed: false },
        { id: "2", text: "Follow up on key points discussed", completed: false },
        { id: "3", text: "Share summary with team members", completed: false },
      ];

      setCurrentSession({
        transcription: mockTranscription,
        summary: mockSummary,
        actionItems: mockActionItems,
      });

      // Save to history
      const newSession: TranscriptionSession = {
        id: Date.now().toString(),
        timestamp: new Date(),
        transcription: mockTranscription,
        summary: mockSummary,
        actionItems: mockActionItems,
      };
      
      setSessions((prev) => [newSession, ...prev]);
      setIsProcessing(false);

      toast({
        title: "Processing complete",
        description: "Your audio has been transcribed successfully!",
      });
    }, 2000);
  };

  const handleToggleActionItem = (id: string) => {
    setCurrentSession((prev) => ({
      ...prev,
      actionItems: prev.actionItems?.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    }));
  };

  const handleSelectSession = (session: TranscriptionSession) => {
    setCurrentSession({
      transcription: session.transcription,
      summary: session.summary,
      actionItems: session.actionItems,
    });
    
    toast({
      title: "Session loaded",
      description: "Previous session has been restored",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Audio to Text</h1>
              <p className="text-sm text-muted-foreground">Transcribe, summarize, and organize</p>
            </div>
          </div>
          
          <HistoryDrawer sessions={sessions} onSelectSession={handleSelectSession} />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          {/* Recording Section */}
          <section className="flex justify-center">
            <AudioRecorder
              onAudioReady={handleAudioReady}
              isProcessing={isProcessing}
            />
          </section>

          {/* Results Grid */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <TranscriptionDisplay
                transcription={currentSession.transcription || ""}
                isLoading={isProcessing}
              />
            </div>
            
            <SummaryDisplay
              summary={currentSession.summary || ""}
              isLoading={isProcessing}
            />
            
            <ActionItemsList
              actionItems={currentSession.actionItems || []}
              isLoading={isProcessing}
              onToggle={handleToggleActionItem}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
