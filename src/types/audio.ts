export interface TranscriptionSession {
  id: string;
  timestamp: Date;
  audioFile?: File;
  transcription: string;
  summary: string;
  title?: string;
  actionItems: ActionItem[];
}

export interface ActionItem {
  id: string;
  text: string;
  completed: boolean;
  priority?: 'High' | 'Medium' | 'Low';
  category?: 'Work' | 'Personal' | 'Follow-Up' | 'Idea';
}
