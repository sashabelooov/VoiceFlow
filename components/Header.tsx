import React from 'react';
import { MoonIcon, SunIcon, Bars3Icon } from './Icons';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, onMenuClick }) => {
  return (
    <header className="w-full py-4 px-4 sm:px-8 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors"
          aria-label="Open menu"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight hidden sm:block">
            Voice<span className="text-indigo-600 dark:text-indigo-400">Flow</span>
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        </button>
        <a 
          href="#"
          className="text-sm font-medium text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors hidden sm:block"
        >
          Documentation
        </a>
      </div>
    </header>
  );
};