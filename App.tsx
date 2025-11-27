import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { AudioAnalyze } from './components/AudioAnalyze';
import { TTS } from './components/TTS';
import { STT } from './components/STT';
import { Page } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
  
  // Sidebar only used in Analyze page
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen flex flex-col text-slate-900 dark:text-slate-100 selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-900 dark:selection:text-indigo-100 transition-colors duration-300">
      
      {/* Sidebar handling is now mostly inside AudioAnalyze, but we need the padding logic here if sidebar is open AND we are on analyze page */}
      <div className={`transition-all duration-300 ease-out flex flex-col min-h-screen ${(currentPage === 'analyze' && isSidebarOpen) ? 'lg:pl-80' : 'pl-0'}`}>
        
        <Header 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          onMenuClick={toggleSidebar}
          currentPage={currentPage}
          setPage={setCurrentPage}
          showMenuButton={currentPage === 'analyze'}
        />

        <main className="flex-grow">
          {currentPage === 'home' && <Home setPage={setCurrentPage} />}
          {currentPage === 'analyze' && <AudioAnalyze isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}
          {currentPage === 'tts' && <TTS />}
          {currentPage === 'stt' && <STT />}
        </main>

        <footer className="py-6 text-center text-slate-400 dark:text-slate-600 text-sm">
          <p>&copy; 2025 VoiceFlow. Powered by VoiceFlow.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;