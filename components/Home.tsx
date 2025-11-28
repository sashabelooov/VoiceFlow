import React from 'react';
import { Page, Language } from '../types';
import { FileAudioIcon, SpeakerWaveIcon, DocumentTextIcon } from './Icons';
import { translations } from '../services/translations';

interface HomeProps {
  setPage: (page: Page) => void;
  language: Language;
}

export const Home: React.FC<HomeProps> = ({ setPage, language }) => {
  const t = translations[language];

  const scrollToExplore = () => {
    const element = document.getElementById('explore');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      
      {/* 1. HERO SECTION (Intro + Call to Action) */}
      <section className="w-full min-h-[80vh] flex flex-col items-center justify-center p-6 text-center animate-fade-in-down relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 dark:opacity-10">
           <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
           <div className="absolute top-10 right-10 w-72 h-72 bg-violet-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
           <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <h1 className="text-5xl sm:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 max-w-4xl">
          {t.hero.titleStart}<span className="text-indigo-600 dark:text-indigo-400">{t.hero.titleEnd}</span> {t.hero.subtitle}
        </h1>
        <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-10">
          {t.hero.desc}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={scrollToExplore}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-lg shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <FileAudioIcon className="w-5 h-5" />
            {t.hero.ctaDemo}
          </button>
        </div>
      </section>

      {/* DEMO LINKS SECTION */}
      <section id="explore" className="w-full max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          {t.explore.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">{t.explore.analyzeTitle}</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            {t.explore.analyzeDesc}
          </p>
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
            {t.explore.analyzeBtn} &rarr;
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
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">{t.explore.sttTitle}</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            {t.explore.sttDesc}
          </p>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
            {t.explore.sttBtn} &rarr;
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
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">{t.explore.ttsTitle}</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            {t.explore.ttsDesc}
          </p>
          <span className="text-violet-600 dark:text-violet-400 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
            {t.explore.ttsBtn} &rarr;
          </span>
        </div>
        </div>
      </section>

    </div>
  );
};