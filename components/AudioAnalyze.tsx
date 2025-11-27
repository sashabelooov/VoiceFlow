import React, { useState, useCallback } from 'react';
import { FileUpload } from './FileUpload';
import { Results } from './Results';
import { Sidebar } from './Sidebar';
import { AudioAnalysisResult, ProcessingState, HistoryItem } from '../types';
import { getAudioDuration, fileToBase64 } from '../services/audioUtils';
import { analyzeAudioContent } from '../services/geminiService';
import { FileAudioIcon } from './Icons';

interface AudioAnalyzeProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export const AudioAnalyze: React.FC<AudioAnalyzeProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [processingState, setProcessingState] = useState<ProcessingState>({ status: 'idle' });
  const [result, setResult] = useState<AudioAnalysisResult | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleFileSelect = useCallback(async (file: File) => {
    setCurrentFile(file);
    setProcessingState({ status: 'processing', message: 'Reading audio metadata...' });

    try {
      const duration = await getAudioDuration(file);
      const audioUrl = URL.createObjectURL(file);

      setProcessingState({ status: 'processing', message: 'Analyzing conversation with Gemini AI...' });

      const base64Data = await fileToBase64(file);
      const geminiResult = await analyzeAudioContent(base64Data, file.type);

      const timestamp = Date.now();
      const id = crypto.randomUUID();

      const finalResult: AudioAnalysisResult = {
        id,
        fileName: file.name,
        timestamp,
        duration,
        language: geminiResult.language,
        transcription: geminiResult.transcription,
        summary: geminiResult.summary,
        score: geminiResult.score,
        audioUrl: audioUrl
      };

      setResult(finalResult);
      setHistory(prev => [{ id, result: finalResult }, ...prev]);
      setProcessingState({ status: 'success' });
      
    } catch (error: any) {
      console.error(error);
      setProcessingState({ 
        status: 'error', 
        message: error.message || "An unexpected error occurred while processing the audio." 
      });
    }
  }, []);

  const handleReset = () => {
    setResult(null);
    setCurrentFile(null);
    setProcessingState({ status: 'idle' });
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setResult(item.result);
    setProcessingState({ status: 'success' });
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const handleDeleteHistoryItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setHistory(prev => {
      const itemToDelete = prev.find(item => item.id === id);
      if (itemToDelete?.result.audioUrl) {
        URL.revokeObjectURL(itemToDelete.result.audioUrl);
      }
      return prev.filter(item => item.id !== id);
    });

    if (result?.id === id) {
      handleReset();
    }
  };

  return (
    <>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        history={history}
        onSelect={handleSelectHistoryItem}
        onDelete={handleDeleteHistoryItem}
        currentItemId={result?.id}
      />

      <div className="w-full">
        {/* Intro Text */}
        {processingState.status === 'idle' && (
          <div className="text-center mb-12 max-w-2xl mx-auto animate-fade-in-down pt-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Call Intelligence Analysis
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Upload call recordings to extract transcriptions, scoring, and summaries.
            </p>
          </div>
        )}

        {/* Upload State */}
        {processingState.status === 'idle' && (
          <div className="w-full animate-fade-in-up px-4">
            <FileUpload onFileSelect={handleFileSelect} disabled={false} />
            <div className="mt-8 flex justify-center gap-8 text-sm text-slate-400 dark:text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                Quality Scoring
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                Smart Summaries
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                Transcriptions
              </div>
            </div>
          </div>
        )}

        {/* Processing State */}
        {processingState.status === 'processing' && (
          <div className="flex flex-col items-center justify-center animate-fade-in pt-12">
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-800 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-indigo-600 dark:border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FileAudioIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-500 animate-pulse" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Analyzing Call</h3>
            <p className="text-slate-500 dark:text-slate-400">{processingState.message}</p>
          </div>
        )}

        {/* Error State */}
        {processingState.status === 'error' && (
          <div className="text-center max-w-md mx-auto animate-fade-in pt-12">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500 dark:text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Analysis Failed</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8">{processingState.message}</p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Success State */}
        {processingState.status === 'success' && result && (
          <div className="px-4 pt-4">
             <Results result={result} onReset={handleReset} />
          </div>
        )}
      </div>
    </>
  );
};