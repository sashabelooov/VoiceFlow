import React from 'react';
import { Page } from '../types';
import { FileAudioIcon, SpeakerWaveIcon, DocumentTextIcon } from './Icons';

interface HomeProps {
  setPage: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ setPage }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-6">
      <div className="text-center max-w-3xl mb-16 animate-fade-in-down">
        <h2 className="text-5xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
          VoiceFlow <span className="text-indigo-600 dark:text-indigo-400">Suite</span>
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          The all-in-one AI audio intelligence platform. Transcribe, analyze, summarize, and generate speech with professional accuracy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl animate-fade-in-up">
        
        {/* Analyze Card */}
        <div 
          onClick={() => setPage('analyze')}
          className="group relative bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FileAudioIcon className="w-32 h-32 text-indigo-600" />
          </div>
          <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
             <FileAudioIcon className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">Call Analysis</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Upload recordings to extract transcriptions, detect language, get smart summaries, and quality scoring.
          </p>
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
            Analyze Audio &rarr;
          </span>
        </div>

        {/* STT Card */}
        <div 
          onClick={() => setPage('stt')}
          className="group relative bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <DocumentTextIcon className="w-32 h-32 text-emerald-600" />
          </div>
          <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
             <DocumentTextIcon className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">Speech to Text</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Quickly convert any audio file into plain text. Perfect for meetings, notes, and quick dictations.
          </p>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
            Start Transcribing &rarr;
          </span>
        </div>

        {/* TTS Card */}
        <div 
          onClick={() => setPage('tts')}
          className="group relative bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-violet-500/50 dark:hover:border-violet-500/50 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <SpeakerWaveIcon className="w-32 h-32 text-violet-600" />
          </div>
          <div className="w-14 h-14 bg-violet-100 dark:bg-violet-900/30 rounded-2xl flex items-center justify-center text-violet-600 dark:text-violet-400 mb-6 group-hover:scale-110 transition-transform">
             <SpeakerWaveIcon className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">Text to Speech</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Convert written text into natural-sounding lifelike audio using advanced AI voice generation.
          </p>
          <span className="text-violet-600 dark:text-violet-400 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
            Generate Audio &rarr;
          </span>
        </div>

      </div>
    </div>
  );
};