import React, { useState } from 'react';
import { MoonIcon, SunIcon, Bars3Icon, XMarkIcon, LanguageIcon } from './Icons';
import { Page, Language } from '../types';
import { translations } from '../services/translations';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onMenuClick?: () => void;
  currentPage: Page;
  setPage: (page: Page) => void;
  showMenuButton?: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  darkMode, 
  toggleDarkMode, 
  onMenuClick,
  currentPage,
  setPage,
  showMenuButton = false,
  language,
  setLanguage
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[language].nav;

  const navItems: { id: Page; label: string }[] = [
    { id: 'home', label: t.home },
    { id: 'analyze', label: t.analyze },
    { id: 'stt', label: t.stt },
    { id: 'tts', label: t.tts },
  ];

  return (
    <header className="w-full py-4 px-4 sm:px-8 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showMenuButton && onMenuClick && (
            <button
              onClick={onMenuClick}
              className="p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors lg:hidden"
              aria-label="Open sidebar"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          )}

          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setPage('home')}
          >
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`
                px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                ${currentPage === item.id 
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}
              `}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Language Dropdown */}
          <div className="relative group">
            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors flex items-center gap-1">
              <LanguageIcon className="w-5 h-5" />
              <span className="text-xs font-bold uppercase">{language}</span>
            </button>
            <div className="absolute right-0 top-full mt-2 w-32 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right z-50">
              <button 
                onClick={() => setLanguage('en')}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 ${language === 'en' ? 'text-indigo-600 font-bold' : 'text-slate-600 dark:text-slate-300'}`}
              >
                English
              </button>
              <button 
                onClick={() => setLanguage('uz')}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 ${language === 'uz' ? 'text-indigo-600 font-bold' : 'text-slate-600 dark:text-slate-300'}`}
              >
                O'zbek
              </button>
              <button 
                onClick={() => setLanguage('ru')}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 ${language === 'ru' ? 'text-indigo-600 font-bold' : 'text-slate-600 dark:text-slate-300'}`}
              >
                Русский
              </button>
            </div>
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 md:hidden flex flex-col gap-2 shadow-xl animate-fade-in-down">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setPage(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`
                w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200
                ${currentPage === item.id 
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};