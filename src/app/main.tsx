import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../styles/index.css';

// Register Service Worker for offline capability in production
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('QueryPath ServiceWorker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('QueryPath ServiceWorker registration failed:', error);
      });
  });
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
