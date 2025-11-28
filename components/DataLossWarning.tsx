import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../services/translations';

interface DataLossWarningProps {
  language: Language;
}

export const DataLossWarning: React.FC<DataLossWarningProps> = ({ language }) => {
  const [isVisible, setIsVisible] = useState(true);
  const t = translations[language].warning;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 dark:border-slate-800 animate-fade-in-up">
        <div className="p-6">
          <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-4 text-amber-600 dark:text-amber-500 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">
            {t.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-center leading-relaxed text-sm">
            {t.message}
          </p>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-center">
          <button
            onClick={() => setIsVisible(false)}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95 text-sm"
          >
            {t.btn}
          </button>
        </div>
      </div>
    </div>
  );
};