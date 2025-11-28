import React, { useState } from 'react';
import { SpeakerWaveIcon } from './Icons';
import { generateSpeech } from '../services/geminiService';
import { base64ToWavBlob } from '../services/audioUtils';
import { DataLossWarning } from './DataLossWarning';
import { Language } from '../types';

interface TTSProps {
  language: Language;
}

export const TTS: React.FC<TTSProps> = ({ language }) => {
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setIsGenerating(true);
    setError(null);
    setAudioUrl(null);

    try {
      const base64Audio = await generateSpeech(text);
      // Gemini 2.5 Flash TTS defaults to 24kHz
      const blob = base64ToWavBlob(base64Audio, 24000);
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err: any) {
      setError(err.message || 'Failed to generate audio');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in-up p-4">
      <DataLossWarning language={language} />

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
            <audio controls src={audioUrl} className="w-full" autoPlay />
          </div>
        )}
      </div>
    </div>
  );
};