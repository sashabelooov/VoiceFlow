import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Polyfill for process.env in browser environments (Vite/Netlify)
// This prevents "process is not defined" errors which cause blank screens
if (typeof window !== 'undefined' && !(window as any).process) {
  // @ts-ignore
  (window as any).process = { env: {} };
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);