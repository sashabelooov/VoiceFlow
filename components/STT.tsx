import React, { useState } from 'react';
import { FileUpload } from './FileUpload';
import { fileToBase64 } from '../services/audioUtils';
import { transcribeAudio } from '../services/geminiService';
import { DocumentTextIcon, CheckIcon } from './Icons';
import { DataLossWarning } from './DataLossWarning';
import { Language } from '../types';

interface STTProps {
  language: Language;
}

export const STT: React.FC<STTProps> = ({ language }) => {
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setTranscription(null);

    try {
      const base64 = await fileToBase64(file);
      const text = await transcribeAudio(base64, file.type);
      setTranscription(text);
    } catch (err: any) {
      setError(err.message || 'Failed to transcribe audio.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (transcription) {
      navigator.clipboard.writeText(transcription);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in-up p-4">
      <DataLossWarning language={language} />

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Speech to Text</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Simple and fast audio transcription.
        </p>
      </div>

      <div className="space-y-8">
        {!transcription && !isLoading && (
          <FileUpload onFileSelect={handleFileSelect} disabled={isLoading} />
        )}

        {isLoading && (
          <div className="bg-white dark:bg-slate-800 p-12 rounded-3xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
             <div className="w-16 h-16 mb-4 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-lg font-medium text-slate-700 dark:text-slate-300">Transcribing audio...</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-center">
            {error}
            <button 
              onClick={() => setError(null)}
              className="block mx-auto mt-2 text-sm underline hover:text-red-800 dark:hover:text-red-300"
            >
              Try Again
            </button>
          </div>
        )}

        {transcription && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden animate-fade-in">
            <div className="p-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                <DocumentTextIcon className="w-5 h-5 text-emerald-500" />
                <span className="font-semibold">Transcription Result</span>
              </div>
              <div className="flex gap-2">
                 <button
                  onClick={() => setTranscription(null)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  New File
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-500 transition-all active:scale-95"
                >
                  {copied ? (
                    <>
                      <CheckIcon className="w-3.5 h-3.5 text-emerald-500" />
                      Copied
                    </>
                  ) : (
                    "Copy Text"
                  )}
                </button>
              </div>
            </div>
            <div className="p-6 max-h-[500px] overflow-y-auto custom-scrollbar">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                {transcription}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};