export interface AudioAnalysisResult {
  transcription: string;
  language: string;
  duration: number; // in seconds
  summary: string;
  score: number; // 1-5
  audioUrl?: string;
  id?: string;
  fileName?: string;
  timestamp?: number;
}

export interface ProcessingState {
  status: 'idle' | 'processing' | 'success' | 'error';
  message?: string;
}

export interface GeminiResponse {
  language: string;
  transcription: string;
  summary: string;
  score: number;
}

export interface HistoryItem {
  id: string;
  result: AudioAnalysisResult;
}