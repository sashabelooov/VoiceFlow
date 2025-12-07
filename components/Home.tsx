import React from 'react';
import { Page, Language } from '../types';
import { FileAudioIcon, UploadIcon, CheckIcon, StarIcon, ClockIcon, CpuChipIcon, SpeakerWaveIcon, DocumentTextIcon } from './Icons';
import { translations } from '../services/translations';

interface HomeProps {
  language: Language;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  setPage: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ language, setPage }) => {
  const t = translations[language];

  return (
    <div className="flex flex-col items-center w-full overflow-hidden">
      
      {/* 1. HERO SECTION (Split Layout) */}
      <section className="w-full min-h-[85vh] flex flex-col lg:flex-row items-center justify-between px-6 sm:px-12 lg:px-24 py-12 lg:py-0 relative">
        
        {/* Background Blobs (Subtle) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20 dark:opacity-10 pointer-events-none">
           <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-400 rounded-full mix-blend-multiply filter blur-[100px] animate-blob"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-400 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000"></div>
        </div>

        {/* Left: Text Content */}
        <div className="flex-1 text-center lg:text-left z-10 animate-fade-in-up max-w-2xl">
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
            {t.hero.titleStart}<span className="text-indigo-600 dark:text-indigo-400">{t.hero.titleEnd}</span> <br/>{t.hero.subtitle}
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
            {t.hero.desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={() => setPage('analyze')}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-lg shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <FileAudioIcon className="w-5 h-5" />
              {t.hero.ctaDemo}
            </button>
            <button 
              onClick={() => setPage('tts')}
              className="px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-full font-bold text-lg border border-slate-200 dark:border-slate-700 shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <SpeakerWaveIcon className="w-5 h-5" />
              {t.nav.tts}
            </button>
          </div>
        </div>

        {/* Right: Creative Visual (Orbital AI Wave with Logo) */}
        <div className="flex-1 w-full flex items-center justify-center mt-12 lg:mt-0 relative animate-fade-in">
          <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">
             
             {/* Orbiting Rings - Made Brighter */}
             <div className="absolute inset-0 border-2 border-dashed border-indigo-300 dark:border-indigo-500/60 rounded-full animate-[spin_12s_linear_infinite]"></div>
             <div className="absolute inset-8 border-2 border-dashed border-violet-300 dark:border-violet-500/60 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
             
             {/* Glowing Layers - Replaced fade-out PING with consistent PULSE to keep it light */}
             <div className="absolute inset-[20%] bg-indigo-400/20 dark:bg-indigo-400/20 rounded-full blur-xl"></div>
             <div className="absolute inset-[25%] bg-violet-400/20 dark:bg-violet-400/20 rounded-full animate-pulse"></div>

             {/* Main Center Core */}
             <div className="relative w-48 h-48 bg-gradient-to-br from-indigo-500 via-violet-500 to-indigo-500 rounded-full shadow-[0_0_60px_rgba(99,102,241,0.6)] flex items-center justify-center z-20 animate-[pulse_4s_ease-in-out_infinite]">
                
                {/* VoiceFlow Logo SVG (Recreated Large for Hero) */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" className="w-28 h-28 text-white drop-shadow-xl">
                    {/* Simple Circle Background */}
                    <circle cx="20" cy="20" r="18" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5" />

                    {/* Microphone Central Element */}
                    <rect x="16" y="11" width="8" height="12" rx="4" fill="white" />
                    <path d="M26 21v1a6 6 0 0 1-12 0v-1" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M20 28v4M16 32h8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />

                    {/* Chat Bubble (Right) */}
                    <path d="M28 14c2.2 0 4 1.8 4 4s-1.8 4-4 4-2.5 0-3.5-1l-2 1v-2c-1.5-1-2.5-2.5-2.5-4 0-2.2 1.8-4 4-4z" 
                          stroke="white" strokeWidth="1.5" fill="white" fillOpacity="0.2" />

                    {/* Digital Waves (Left) */}
                    <path d="M10 16v4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9" />
                    <path d="M7 14v8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
                    <path d="M4 17v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
                    
                    {/* AI Sparkle (Top Right) */}
                    <path d="M34 10l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" fill="white" />
                </svg>

                {/* Satellite Particle */}
                <div className="absolute -right-4 top-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1)] animate-bounce"></div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM vs SOLUTION */}
      <section className="w-full bg-slate-50 dark:bg-slate-900/50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t.problemSolution.title}</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* The Problem (Old Way) */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border-l-4 border-red-500 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                 <ClockIcon className="w-40 h-40 text-red-500" />
               </div>
               <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-6 flex items-center gap-2">
                 <span className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg"><ClockIcon className="w-5 h-5" /></span>
                 {t.problemSolution.problemHeader}
               </h3>
               <ul className="space-y-4 relative z-10">
                 <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                   <div className="w-1.5 h-1.5 mt-2 bg-red-400 rounded-full flex-shrink-0"></div>
                   {t.problemSolution.problem1}
                 </li>
                 <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                   <div className="w-1.5 h-1.5 mt-2 bg-red-400 rounded-full flex-shrink-0"></div>
                   {t.problemSolution.problem2}
                 </li>
                 <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                   <div className="w-1.5 h-1.5 mt-2 bg-red-400 rounded-full flex-shrink-0"></div>
                   {t.problemSolution.problem3}
                 </li>
               </ul>
            </div>

            {/* The Solution (VoiceFlow Way) */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border-l-4 border-emerald-500 shadow-xl scale-105 relative overflow-hidden ring-4 ring-emerald-500/10 dark:ring-emerald-500/20">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                 <CheckIcon className="w-40 h-40 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-6 flex items-center gap-2">
                 <span className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg"><CheckIcon className="w-5 h-5" /></span>
                 {t.problemSolution.solutionHeader}
               </h3>
               <ul className="space-y-4 relative z-10">
                 <li className="flex items-start gap-3 text-slate-700 dark:text-slate-200 font-medium">
                   <CheckIcon className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                   {t.problemSolution.solution1}
                 </li>
                 <li className="flex items-start gap-3 text-slate-700 dark:text-slate-200 font-medium">
                   <CheckIcon className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                   {t.problemSolution.solution2}
                 </li>
                 <li className="flex items-start gap-3 text-slate-700 dark:text-slate-200 font-medium">
                   <CheckIcon className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                   {t.problemSolution.solution3}
                 </li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (3 Steps) */}
      <section className="w-full py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t.howItWorks.title}</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 relative group hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/30">1</div>
              <div className="mt-6 mb-4 w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <UploadIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t.howItWorks.step1Title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.howItWorks.step1Desc}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 relative group hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/30">2</div>
              <div className="mt-6 mb-4 w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                 <CpuChipIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t.howItWorks.step2Title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.howItWorks.step2Desc}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 relative group hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/30">3</div>
              <div className="mt-6 mb-4 w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <StarIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t.howItWorks.step3Title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.howItWorks.step3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Capabilities (Links to other pages) */}
      <section className="w-full py-20 bg-slate-50 dark:bg-slate-900/50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t.explore.title}</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Link to TTS */}
             <div onClick={() => setPage('tts')} className="cursor-pointer group bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                  <SpeakerWaveIcon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.explore.ttsTitle}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">{t.explore.ttsDesc}</p>
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  {t.explore.ttsBtn} &rarr;
                </span>
             </div>

             {/* Link to STT */}
             <div onClick={() => setPage('stt')} className="cursor-pointer group bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <DocumentTextIcon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.explore.sttTitle}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">{t.explore.sttDesc}</p>
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  {t.explore.sttBtn} &rarr;
                </span>
             </div>

             {/* Link to Analyze */}
             <div onClick={() => setPage('analyze')} className="cursor-pointer group bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <FileAudioIcon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.explore.analyzeTitle}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">{t.explore.analyzeDesc}</p>
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  {t.explore.analyzeBtn} &rarr;
                </span>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
};
