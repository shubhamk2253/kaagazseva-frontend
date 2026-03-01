import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

// 1. Global Styles (Tailwind must be first)
import './index.css'; 

/**
 * KAAGAZSEVA - Root Mounting Point
 * StrictMode is enabled to catch side-effect bugs in development.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);