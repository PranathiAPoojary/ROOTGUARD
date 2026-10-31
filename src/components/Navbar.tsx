import React from 'react';
import { ViewMode } from '../types';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="text-xl font-bold tracking-tight text-emerald-800 hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <svg
            className="w-6 h-6 text-emerald-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2Z" />
            <path d="M12 7v10" />
            <path d="m8 11 4-4 4 4" />
            <path d="M7 17c1.5-2 3-3 5-3s3.5 1 5 3" />
          </svg>
          <span>RootGuard</span>
        </button>

        {/* Zone 2: 4–5 single-line clean nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('home')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentView === 'home'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onNavigate('diagnostic')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentView === 'diagnostic'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Root Diagnostic
          </button>
          <button
            onClick={() => onNavigate('diseases')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentView === 'diseases'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Disease Library
          </button>
          <button
            onClick={() => onNavigate('history')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentView === 'history'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            History
          </button>
          <button
            onClick={() => onNavigate('research')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentView === 'research'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Model & Research
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentView === 'about'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            About
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('diagnostic')}
            className="px-4 py-2 text-sm font-medium text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            Analyze Root
          </button>
        </div>
      </div>
    </header>
  );
};
