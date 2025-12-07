import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { AudioAnalyze } from './components/AudioAnalyze';
import { STT } from './components/STT';
import { TTS } from './components/TTS';
import { Page, Language } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  // Initialize Dark Mode from system preference
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Apply Dark Mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen flex flex-col text-slate-900 dark:text-slate-100 selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-900 dark:selection:text-indigo-100 transition-colors duration-300">
      
      {/* Sidebar padding logic: Only for Analyze page where history sidebar exists */}
      <div className={`transition-all duration-300 ease-out flex flex-col min-h-screen ${isSidebarOpen && currentPage === 'analyze' ? 'lg:pl-80' : 'pl-0'}`}>
        
        <Header 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          onMenuClick={toggleSidebar}
          currentPage={currentPage}
          setPage={setCurrentPage}
          showMenuButton={currentPage === 'analyze'}
          language={language}
          setLanguage={setLanguage}
        />

        <main className="flex-grow">
          {currentPage === 'home' && (
            <Home 
              language={language} 
              isSidebarOpen={isSidebarOpen} 
              setIsSidebarOpen={setIsSidebarOpen} 
              setPage={setCurrentPage} 
            />
          )}
          
          {currentPage === 'tts' && (
            <div className="w-full py-12 bg-slate-50 dark:bg-slate-900/50 min-h-[calc(100vh-80px)]">
               <div className="max-w-7xl mx-auto w-full">
                  <TTS language={language} />
               </div>
            </div>
          )}

          {currentPage === 'stt' && (
            <div className="w-full py-12 min-h-[calc(100vh-80px)]">
               <div className="max-w-7xl mx-auto w-full">
                  <STT language={language} />
               </div>
            </div>
          )}

          {currentPage === 'analyze' && (
             <div className="w-full py-12 bg-slate-50 dark:bg-slate-900/50 min-h-[calc(100vh-80px)]">
                <div className="max-w-7xl mx-auto w-full">
                   <AudioAnalyze 
                      language={language} 
                      isSidebarOpen={isSidebarOpen} 
                      setIsSidebarOpen={setIsSidebarOpen} 
                   />
                </div>
             </div>
          )}
        </main>

        <footer className="py-6 text-center text-slate-400 dark:text-slate-600 text-sm border-t border-slate-100 dark:border-slate-800">
          <p>&copy; 2025 VoiceFlow. Powered by VoiceFlow.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
