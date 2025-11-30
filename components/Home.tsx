import React from 'react';
import { Page, Language } from '../types';
import { FileAudioIcon, SpeakerWaveIcon, DocumentTextIcon, UploadIcon, CheckIcon, StarIcon, ClockIcon, CpuChipIcon } from './Icons';
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
          {/* Badge Removed */}
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
            {t.hero.titleStart}<span className="text-indigo-600 dark:text-indigo-400">{t.hero.titleEnd}</span> <br/>{t.hero.subtitle}
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
            {t.hero.desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={scrollToExplore}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-lg shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <FileAudioIcon className="w-5 h-5" />
              {t.hero.ctaDemo}
            </button>
          </div>
        </div>

        {/* Right: Creative Visual (Microphone + Waves) */}
        <div className="flex-1 w-full flex items-center justify-center mt-12 lg:mt-0 relative animate-fade-in">
          <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">
             
             {/* Sound Wave Animations */}
             <div className="absolute inset-0 bg-indigo-500/10 rounded-full animate-ping [animation-duration:3s]"></div>
             <div className="absolute inset-4 bg-indigo-500/20 rounded-full animate-ping [animation-duration:3s] [animation-delay:1s]"></div>
             <div className="absolute inset-8 bg-indigo-500/30 rounded-full animate-ping [animation-duration:3s] [animation-delay:2s]"></div>

             {/* Static Outer Rings */}
             <div className="absolute w-[90%] h-[90%] border border-indigo-200 dark:border-indigo-800 rounded-full"></div>
             <div className="absolute w-[70%] h-[70%] border border-indigo-300 dark:border-indigo-700 rounded-full"></div>

             {/* Main Center Circle (Microphone) */}
             <div className="relative w-40 h-40 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-full shadow-[0_0_80px_rgba(79,70,229,0.6)] flex items-center justify-center z-20">
                {/* Custom Microphone Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-20 h-20">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
                
                {/* AI Sparkle Badge */}
                <div className="absolute -top-2 -right-2 bg-white dark:bg-slate-900 p-2 rounded-full shadow-lg border border-indigo-100 dark:border-indigo-900 animate-bounce">
                  <StarIcon className="w-6 h-6 text-amber-500 fill-amber-500" />
                </div>
             </div>

             {/* Floating Elements */}
             <div className="absolute top-0 right-10 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-xl animate-bounce-slow z-30 max-w-[140px]">
               <div className="flex gap-1 h-4 items-end">
                  <div className="w-1.5 bg-indigo-500 h-full rounded-full animate-[pulse_1s_ease-in-out_infinite]"></div>
                  <div className="w-1.5 bg-indigo-500 h-[60%] rounded-full animate-[pulse_1.5s_ease-in-out_infinite]"></div>
                  <div className="w-1.5 bg-indigo-500 h-[80%] rounded-full animate-[pulse_1.2s_ease-in-out_infinite]"></div>
                  <div className="w-1.5 bg-indigo-500 h-[40%] rounded-full animate-[pulse_0.8s_ease-in-out_infinite]"></div>
               </div>
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

      {/* 4. EXPLORE SECTION */}
      <section id="explore" className="w-full bg-slate-100 dark:bg-slate-950 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t.explore.title}</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <p className="text-slate-500 dark:text-slate-400 mb-6 min-h-[48px]">
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
            <p className="text-slate-500 dark:text-slate-400 mb-6 min-h-[48px]">
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
            <p className="text-slate-500 dark:text-slate-400 mb-6 min-h-[48px]">
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
