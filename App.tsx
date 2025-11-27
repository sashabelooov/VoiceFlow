import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { Results } from './components/Results';
import { Sidebar } from './components/Sidebar';
import { AudioAnalysisResult, ProcessingState, HistoryItem } from './types';
import { getAudioDuration, fileToBase64 } from './services/audioUtils';
import { analyzeAudioContent } from './services/geminiService';
import { FileAudioIcon } from './components/Icons';

function App() {
  const [processingState, setProcessingState] = useState<ProcessingState>({ status: 'idle' });
  const [result, setResult] = useState<AudioAnalysisResult | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Initialize Dark Mode from system preference
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Apply Dark Mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleFileSelect = useCallback(async (file: File) => {
    setCurrentFile(file);
    setProcessingState({ status: 'processing', message: 'Reading audio metadata...' });

    try {
      // 1. Get Duration locally (fast, reliable)
      const duration = await getAudioDuration(file);
      
      // Create local URL for playback
      const audioUrl = URL.createObjectURL(file);

      setProcessingState({ status: 'processing', message: 'Analyzing conversation with Gemini AI...' });

      // 2. Prepare Base64
      const base64Data = await fileToBase64(file);

      // 3. Send to Gemini for detailed analysis
      const geminiResult = await analyzeAudioContent(base64Data, file.type);

      const timestamp = Date.now();
      const id = crypto.randomUUID();

      // 4. Create final result object
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
      
      // 5. Add to history (prepend)
      setHistory(prev => [{ id, result: finalResult }, ...prev]);
      
      setProcessingState({ status: 'success' });
      // Open sidebar on first success to show user where it is, or keep closed. 
      // Let's keep closed to not distract, or open if user prefers. 
      // Default: Keep closed, user can open.

    } catch (error: any) {
      console.error(error);
      setProcessingState({ 
        status: 'error', 
        message: error.message || "An unexpected error occurred while processing the audio." 
      });
    }
  }, []);

  const handleReset = () => {
    // We don't revoke object URL here anymore because it might be in history
    setResult(null);
    setCurrentFile(null);
    setProcessingState({ status: 'idle' });
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setResult(item.result);
    setProcessingState({ status: 'success' });
    // On mobile, close sidebar after selection
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const handleDeleteHistoryItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setHistory(prev => {
      const itemToDelete = prev.find(item => item.id === id);
      // Clean up memory if we delete
      if (itemToDelete?.result.audioUrl) {
        URL.revokeObjectURL(itemToDelete.result.audioUrl);
      }
      return prev.filter(item => item.id !== id);
    });

    // If deleting currently viewed item, reset view
    if (result?.id === id) {
      handleReset();
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-900 dark:text-slate-100 selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-900 dark:selection:text-indigo-100 transition-colors duration-300">
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        history={history}
        onSelect={handleSelectHistoryItem}
        onDelete={handleDeleteHistoryItem}
        currentItemId={result?.id}
      />

      <div className={`transition-all duration-300 ease-out ${isSidebarOpen ? 'lg:pl-80' : 'pl-0'}`}>
        <Header 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          onMenuClick={toggleSidebar}
        />

        <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8 min-h-[calc(100vh-80px)]">
          
          {/* Intro Text */}
          {processingState.status === 'idle' && (
            <div className="text-center mb-12 max-w-2xl animate-fade-in-down">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                VoiceFlow <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">Intelligence</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Upload call recordings to instantly get transcriptions, quality scores, conversation summaries, and operator analytics.
              </p>
            </div>
          )}

          {/* Upload State */}
          {processingState.status === 'idle' && (
            <div className="w-full animate-fade-in-up">
              <FileUpload 
                onFileSelect={handleFileSelect} 
                disabled={false} 
              />
              
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
            <div className="flex flex-col items-center justify-center animate-fade-in">
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-800 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-indigo-600 dark:border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileAudioIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-500 animate-pulse" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Analyzing Call</h3>
              <p className="text-slate-500 dark:text-slate-400">{processingState.message}</p>
              {currentFile && (
                 <p className="text-xs font-mono mt-4 text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                   {currentFile.name}
                 </p>
              )}
            </div>
          )}

          {/* Error State */}
          {processingState.status === 'error' && (
            <div className="text-center max-w-md animate-fade-in">
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
            <Results result={result} onReset={handleReset} />
          )}
        </main>

        <footer className="py-6 text-center text-slate-400 dark:text-slate-600 text-sm">
          <p>&copy; {new Date().getFullYear()} VoiceFlow. Powered by Gemini 2.5 Flash.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;