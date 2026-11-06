import React from 'react';

export function Footer({ onNavigate }) {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16 py-10 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="font-bold text-slate-900 text-sm flex items-center justify-center md:justify-start gap-2">
            <span>RootGuard</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="font-normal text-xs text-slate-600">
              Arecanut Root Disease Early Prediction System (JavaScript Edition)
            </span>
          </div>
          <p className="text-slate-500 text-[11px]">
            Academic Engineering College Project · Grounded in ICAR-CPCRI Pathology Standards
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => onNavigate('diagnostic')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Diagnostic Console
          </button>
          <button
            type="button"
            onClick={() => onNavigate('diseases')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Disease Library
          </button>
          <button
            type="button"
            onClick={() => onNavigate('history')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            History
          </button>
          <button
            type="button"
            onClick={() => onNavigate('research')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Research & Benchmarks
          </button>
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            About Project
          </button>
        </nav>
      </div>
    </footer>
  );
}
