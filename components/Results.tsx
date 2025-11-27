import React, { useState } from 'react';
import { AudioAnalysisResult } from '../types';
import { ClockIcon, LanguageIcon, FileAudioIcon, CheckIcon, UploadIcon, StarIcon, DocumentTextIcon, SpeakerWaveIcon } from './Icons';
import { formatDuration } from '../services/audioUtils';

interface ResultsProps {
  result: AudioAnalysisResult;
  onReset: () => void;
}

export const Results: React.FC<ResultsProps> = ({ result, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.transcription);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Determine score color for 1-5 scale
  const getScoreColor = (score: number) => {
    if (score >= 4) return "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30";
    if (score >= 3) return "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30";
    return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30";
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in-up pb-12">
      
      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        
        {/* Score Card */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4 transition-transform hover:scale-[1.01]">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getScoreColor(result.score)}`}>
            <StarIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Quality Score</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{result.score}/5</p>
          </div>
        </div>

        {/* Duration Card */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4 transition-transform hover:scale-[1.01]">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <ClockIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Duration</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{formatDuration(result.duration)}</p>
          </div>
        </div>

        {/* Language Card */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4 transition-transform hover:scale-[1.01]">
          <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400">
            <LanguageIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Language</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white truncate max-w-[120px]" title={result.language}>{result.language}</p>
          </div>
        </div>

        {/* Audio Player Card (Compact) */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4 transition-transform hover:scale-[1.01]">
          <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
             <SpeakerWaveIcon className="w-6 h-6" />
          </div>
          <div className="w-full min-w-0">
             <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Playback</p>
             {result.audioUrl ? (
               <audio controls className="w-full h-8 max-w-[140px] block" src={result.audioUrl} />
             ) : (
               <p className="text-xs text-slate-400">Unavailable</p>
             )}
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Summary & Analysis */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col h-full">
            <div className="p-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 flex items-center gap-2">
              <DocumentTextIcon className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Executive Summary</span>
            </div>
            <div className="p-6">
               <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                 {result.summary}
               </p>
            </div>
          </div>
        </div>

        {/* Right Column: Transcription */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                <FileAudioIcon className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                <span className="font-semibold">Transcription</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-500 transition-all active:scale-95"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5" />
                    </svg>
                    Copy Text
                  </>
                )}
              </button>
            </div>
            <div className="p-6 bg-white dark:bg-slate-800 min-h-[300px] max-h-[600px] overflow-y-auto custom-scrollbar">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap text-base">
                {result.transcription}
              </p>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={onReset}
          className="group flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-white transition-all shadow-lg hover:shadow-indigo-500/30 active:scale-95"
        >
          <UploadIcon className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-white dark:group-hover:text-white transition-colors" />
          Analyze Another Call
        </button>
      </div>
    </div>
  );
};