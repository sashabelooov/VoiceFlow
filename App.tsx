import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Page, Language } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  // Although we are single page now, we might keep 'home' as default state for future nav highlighting
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
      
      {/* Sidebar padding logic: Apply padding if sidebar is open, regardless of "page" since it's all one page now */}
      <div className={`transition-all duration-300 ease-out flex flex-col min-h-screen ${isSidebarOpen ? 'lg:pl-80' : 'pl-0'}`}>
        
        <Header 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          onMenuClick={toggleSidebar}
          currentPage={currentPage}
          setPage={setCurrentPage}
          showMenuButton={true} // Always allow sidebar toggle for history
          language={language}
          setLanguage={setLanguage}
        />

        <main className="flex-grow">
          <Home 
            language={language} 
            isSidebarOpen={isSidebarOpen} 
            setIsSidebarOpen={setIsSidebarOpen} 
            setPage={setCurrentPage} 
          />
        </main>

        <footer className="py-6 text-center text-slate-400 dark:text-slate-600 text-sm">
          <p>&copy; 2025 VoiceFlow. Powered by VoiceFlow.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;