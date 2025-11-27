import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AudioRecorder } from "@/components/AudioRecorder";
import { TranscriptionDisplay } from "@/components/TranscriptionDisplay";
import { SummaryDisplay } from "@/components/SummaryDisplay";
import { ActionItemsList } from "@/components/ActionItemsList";
import { HistoryDrawer } from "@/components/HistoryDrawer";
import { PlanDialog } from "@/components/PlanDialog";
import { TranscriptionSession, ActionItem } from "@/types/audio";
import { Headphones, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import { toast } from "sonner";

const Index = () => {
  const [currentSession, setCurrentSession] = useState<Partial<TranscriptionSession>>({
    transcription: "",
    summary: "",
    actionItems: [],
  });
  const [sessions, setSessions] = useState<TranscriptionSession[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [usageData, setUsageData] = useState<{ current_usage: number; max_usage: number; plan: string } | null>(null);
  const [showPlanDialog, setShowPlanDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchUsageData(session.user.id);
        loadTranscriptions(session.user.id);
        // Only check subscription on initial load, not repeatedly
        checkSubscription(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchUsageData(session.user.id);
        loadTranscriptions(session.user.id);
        // Don't call checkSubscription here - it will be called on demand
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const checkSubscription = async (userId?: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) {
        console.error('Error checking subscription:', error);
        // Don't block the UI - just log the error
        return;
      }
      console.log('Subscription status:', data);
      // Refresh usage data to get updated plan
      const userIdToUse = userId || user?.id;
      if (userIdToUse) {
        await fetchUsageData(userIdToUse);
      }
    } catch (error) {
      console.error('Error in checkSubscription:', error);
      // Non-blocking - page should still load
    }
  };

  const loadTranscriptions = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('transcriptions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading transcriptions:', error);
        return;
      }

      if (data) {
        const loadedSessions: TranscriptionSession[] = data.map(item => ({
          id: item.id,
          timestamp: new Date(item.created_at),
          transcription: item.transcription,
          summary: item.summary || '',
          title: item.title || undefined,
          actionItems: Array.isArray(item.action_items) ? item.action_items : [],
        }));
        setSessions(loadedSessions);
      }
    } catch (error) {
      console.error('Error in loadTranscriptions:', error);
    }
  };

  const fetchUsageData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('usage_tracking')
        .select('current_usage, max_usage, plan')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching usage:', error);
        return;
      }

      if (!data) {
        // Create initial usage record
        const { data: newData, error: insertError } = await supabase
          .from('usage_tracking')
          .insert({ user_id: userId, current_usage: 0, max_usage: 2, plan: 'free' })
          .select('current_usage, max_usage, plan')
          .single();

        if (insertError) {
          console.error('Error creating usage record:', insertError);
          return;
        }
        setUsageData(newData);
      } else {
        setUsageData(data);
      }
    } catch (error) {
      console.error('Error in fetchUsageData:', error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleAudioReady = async (audioBlob: Blob, fileName: string) => {
    if (!user) {
      toast.error("Please sign in to use this feature");
      return;
    }

    // Check usage limits
    if (usageData && usageData.current_usage >= usageData.max_usage) {
      setShowPlanDialog(true);
      toast.error("You've reached your usage limit. Please upgrade your plan.");
      return;
    }

    setIsProcessing(true);
    
    try {
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

      // Call edge function using Supabase client
      const { data, error } = await supabase.functions.invoke('transcribe-audio', {
        body: { 
          audio: base64Audio,
          plan: usageData?.plan || 'free'
        },
      });

      if (error) {
        throw new Error(error.message || 'Failed to process audio');
      }

      const { transcription, summary, title, actionItems: actionItemsData } = data;

      const actionItems: ActionItem[] = actionItemsData.map((item: any, index: number) => ({
        id: `${Date.now()}-${index}`,
        text: typeof item === 'string' ? item : item.text,
        completed: false,
        priority: item.priority || undefined,
        category: item.category || undefined,
      }));

      setCurrentSession({
        transcription,
        summary,
        title,
        actionItems,
      });

      // Save to Supabase
      const { data: savedTranscription, error: saveError } = await supabase
        .from('transcriptions')
        .insert({
          user_id: user.id,
          transcription,
          summary,
          title,
          action_items: actionItems,
        })
        .select()
        .single();

      if (saveError) {
        console.error('Error saving transcription:', saveError);
      } else if (savedTranscription) {
        // Add to sessions list
        const newSession: TranscriptionSession = {
          id: savedTranscription.id,
          timestamp: new Date(savedTranscription.created_at),
          transcription,
          summary,
          title,
          actionItems,
        };
        
        setSessions((prev) => [newSession, ...prev]);
      }
      
      // Update usage count
      if (usageData && user) {
        const newUsage = usageData.current_usage + 1;
        await supabase
          .from('usage_tracking')
          .update({ current_usage: newUsage, updated_at: new Date().toISOString() })
          .eq('user_id', user.id);
        
        setUsageData({ ...usageData, current_usage: newUsage });
      }

      toast.success("Audio transcribed successfully!");
    } catch (error) {
      console.error('Error processing audio:', error);
      toast.error(error instanceof Error ? error.message : "Failed to process audio. Please try again.");
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
    
    toast.success("Previous session has been restored");
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
          
          <div className="flex items-center gap-3">
            {user && usageData && (
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs text-muted-foreground">{user.email}</span>
                <span className="text-xs font-medium text-primary">
                  {usageData.plan === 'free' ? 'Free Plan' : 
                   usageData.plan === 'pro' ? 'Pro Plan' : 
                   usageData.plan === 'pro_plus' ? 'Pro Plus Plan' : 'Free Plan'}
                </span>
              </div>
            )}
            {usageData && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={async () => {
                  toast.info("Refreshing subscription status...");
                  await checkSubscription(user?.id);
                  toast.success("Subscription status updated");
                }}
                className="text-sm"
              >
                {usageData.current_usage}/{usageData.max_usage} used
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowPlanDialog(true)}
            >
              View Plans
            </Button>
            <HistoryDrawer sessions={sessions} onSelectSession={handleSelectSession} />
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
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
                title={currentSession.title}
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

      <PlanDialog
        open={showPlanDialog}
        onOpenChange={setShowPlanDialog}
        currentUsage={usageData?.current_usage || 0}
        maxUsage={usageData?.max_usage || 2}
        currentPlan={usageData?.plan || "free"}
      />
    </div>
  );
};

export default Index;
