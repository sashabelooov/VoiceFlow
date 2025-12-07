import React, { useState } from 'react';
import { SpeakerWaveIcon } from './Icons';
import { generateSpeech } from '../services/geminiService';
import { base64ToWavBlob, changeAudioSpeed } from '../services/audioUtils';
import { DataLossWarning } from './DataLossWarning';
import { Language } from '../types';

interface TTSProps {
  language: Language;
}

export const TTS: React.FC<TTSProps> = ({ language }) => {
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [originalBlob, setOriginalBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Speed selection state
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isProcessingDownload, setIsProcessingDownload] = useState(false);

  // Warning state
  const [showWarning, setShowWarning] = useState(false);
  const [hasSeenWarning, setHasSeenWarning] = useState(false);

  const handleGenerate = async () => {
    if (!text.trim()) return;
    
    // Show warning on first generation
    if (!hasSeenWarning) {
      setShowWarning(true);
      setHasSeenWarning(true);
    }

    setIsGenerating(true);
    setError(null);
    setAudioUrl(null);
    setOriginalBlob(null);

    try {
      const base64Audio = await generateSpeech(text);
      // Gemini 2.5 Flash TTS defaults to 24kHz
      const blob = base64ToWavBlob(base64Audio, 24000);
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setOriginalBlob(blob);
    } catch (err: any) {
      setError(err.message || 'Failed to generate audio');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadClick = () => {
    setShowSpeedMenu(!showSpeedMenu);
  };

  const processAndDownload = async (speed: number) => {
    if (!originalBlob) return;
    
    setIsProcessingDownload(true);
    setShowSpeedMenu(false);

    try {
      // Process audio to change speed
      const processedBlob = await changeAudioSpeed(originalBlob, speed);
      const url = URL.createObjectURL(processedBlob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `voiceflow_tts_${speed}x.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error processing audio:", error);
      alert("Failed to process audio speed.");
    } finally {
      setIsProcessingDownload(false);
    }
  };

  const speeds = [1.0, 1.25, 1.5, 1.75, 2.0];

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in-up p-4">
      <DataLossWarning 
        language={language} 
        isOpen={showWarning} 
        onClose={() => setShowWarning(false)} 
      />

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Text to Speech</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Turn your text into lifelike audio instantly.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Enter Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something here to convert to speech..."
          className="w-full h-40 p-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none custom-scrollbar"
        />

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {text.length} characters
          </div>
          <button
            onClick={handleGenerate}
            disabled={!text.trim() || isGenerating}
            className={`
              flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all
              ${!text.trim() || isGenerating 
                ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed' 
                : 'bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-500/30 active:scale-95'}
            `}
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <SpeakerWaveIcon className="w-5 h-5" />
                Generate Audio
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm">
            {error}
          </div>
        )}

        {audioUrl && (
          <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 animate-fade-in">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Result</h3>
            <div className="flex flex-col gap-4">
               <audio controls src={audioUrl} className="w-full" />
               
               <div className="relative inline-block self-end">
                  <button 
                     onClick={handleDownloadClick}
                     disabled={isProcessingDownload}
                     className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-2"
                  >
                     {isProcessingDownload ? (
                        <>
                           <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
                           Processing...
                        </>
                     ) : (
                        <>
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M12 12.75l3 3.75m-3-3.75l-3 3.75m3-3.75v-9.75" />
                           </svg>
                           Download Audio
                        </>
                     )}
                  </button>

                  {/* Speed Selection Dropdown */}
                  {showSpeedMenu && (
                     <div className="absolute bottom-full right-0 mb-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-fade-in-up z-10">
                        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700">
                           <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Speed</span>
                        </div>
                        {speeds.map(speed => (
                           <button
                              key={speed}
                              onClick={() => processAndDownload(speed)}
                              className="w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex justify-between items-center"
                           >
                              <span>{speed}x Speed</span>
                              {speed === 1.0 && <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-500">Normal</span>}
                           </button>
                        ))}
                     </div>
                  )}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
