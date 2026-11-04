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

        {/* Zone 3: Actions (Export for VS Code + Primary Action) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href="/api/export/zip"
            download="rootguard-project.zip"
            className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-950 bg-white/90 hover:bg-emerald-50 border border-slate-300 hover:border-emerald-400 rounded-lg transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            title="Download full project archive to open in VS Code"
          >
            <svg className="w-4 h-4 text-emerald-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="hidden sm:inline">Export for VS Code</span>
            <span className="sm:hidden">Export</span>
          </a>

          <button
            onClick={() => onNavigate('diagnostic')}
            className="px-4 py-2 text-sm font-medium text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            Analyze Root
          </button>
        </div>
      </div>
    </header>
  );
};
