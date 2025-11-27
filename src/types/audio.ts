export interface TranscriptionSession {
  id: string;
  timestamp: Date;
  audioFile?: File;
  transcription: string;
  summary: string;
  actionItems: ActionItem[];
}

export interface ActionItem {
  id: string;
  text: string;
  completed: boolean;
}
