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
    
    try {
      toast({
        title: "Processing audio",
        description: "Transcribing your audio file...",
      });

      // Convert blob to base64
      const reader = new FileReader();
      const base64Audio = await new Promise<string>((resolve, reject) => {
        reader.onloadend = () => {
          const base64 = reader.result as string;
          resolve(base64.split(',')[1]); // Remove data:audio/webm;base64, prefix
        };
        reader.onerror = reject;
        reader.readAsDataURL(audioBlob);
      });

      // Call edge function
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/transcribe-audio`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ audio: base64Audio }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to process audio');
      }

      const { transcription, summary, actionItems: actionItemTexts } = await response.json();

      const actionItems: ActionItem[] = actionItemTexts.map((text: string, index: number) => ({
        id: `${Date.now()}-${index}`,
        text,
        completed: false,
      }));

      setCurrentSession({
        transcription,
        summary,
        actionItems,
      });

      // Save to history
      const newSession: TranscriptionSession = {
        id: Date.now().toString(),
        timestamp: new Date(),
        transcription,
        summary,
        actionItems,
      };
      
      setSessions((prev) => [newSession, ...prev]);

      toast({
        title: "Processing complete",
        description: "Your audio has been transcribed successfully!",
      });
    } catch (error) {
      console.error('Error processing audio:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process audio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
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
