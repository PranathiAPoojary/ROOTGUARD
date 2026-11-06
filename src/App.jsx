/**
 * ROOTGUARD - AI-Based Early Prediction of Arecanut Root Diseases
 * Academic Engineering Mini-Project
 * Pure JavaScript Frontend (.jsx)
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar.jsx';
import { HomeView } from './components/HomeView.jsx';
import { DiagnosticView } from './components/DiagnosticView.jsx';
import { DiseaseLibraryView } from './components/DiseaseLibraryView.jsx';
import { HistoryView } from './components/HistoryView.jsx';
import { ResearchMetricsView } from './components/ResearchMetricsView.jsx';
import { AboutView } from './components/AboutView.jsx';
import { Footer } from './components/Footer.jsx';
import plantationBg from './assets/images/arecanut_plantation_mist_1793443555451.jpg';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedSampleKey, setSelectedSampleKey] = useState('healthy');
  const [backdropMode, setBackdropMode] = useState('vibrant');

  const handleSelectSample = (sampleKey) => {
    setSelectedSampleKey(sampleKey);
    setCurrentView('diagnostic');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900/5 text-slate-900 font-sans relative selection:bg-emerald-100 selection:text-emerald-900">
      {/* Prominent Full-Screen Arecanut Palm Plantation Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <img
          src={plantationBg}
          alt="Arecanut palm plantation atmospheric backdrop"
          className={`w-full h-full object-cover object-center transition-all duration-300 filter contrast-105 saturate-115 scale-105 ${
            backdropMode === 'full'
              ? 'opacity-95'
              : backdropMode === 'vibrant'
              ? 'opacity-85'
              : 'opacity-50'
          }`}
          referrerPolicy="no-referrer"
        />
        {/* Subtle scrim preserving authentic green palm trees, winding red soil path, and morning mist */}
        <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-slate-900/25" />
      </div>

      {/* Floating Background Presence Control Badge */}
      <aside aria-label="Backdrop display control" className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-emerald-900/20 shadow-lg text-xs font-medium text-slate-800">
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
        </span>
        <span className="text-slate-700 font-semibold">Plantation Backdrop:</span>
        <div className="flex items-center gap-1 bg-slate-100/90 p-0.5 rounded-full border border-slate-200">
          <button
            type="button"
            onClick={() => setBackdropMode('vibrant')}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
              backdropMode === 'vibrant'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Set vibrant backdrop visibility (85%)"
          >
            Vibrant (85%)
          </button>
          <button
            type="button"
            onClick={() => setBackdropMode('full')}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
              backdropMode === 'full'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Set maximum photo visibility (100%)"
          >
            Full View (100%)
          </button>
          <button
            type="button"
            onClick={() => setBackdropMode('subtle')}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
              backdropMode === 'subtle'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Set subtle backdrop visibility (50%)"
          >
            Subtle (50%)
          </button>
        </div>
      </aside>

      {/* Top Bar Navigation */}
      <div className="relative z-40">
        <Navbar currentView={currentView} onNavigate={handleNavigate} />
      </div>

      {/* Main View Router */}
      <main className="flex-1 relative z-10">
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onSelectSample={handleSelectSample}
          />
        )}

        {currentView === 'diagnostic' && (
          <DiagnosticView initialSampleKey={selectedSampleKey} />
        )}

        {currentView === 'diseases' && (
          <DiseaseLibraryView
            onNavigate={handleNavigate}
            onSelectSample={handleSelectSample}
          />
        )}

        {currentView === 'history' && (
          <HistoryView onNavigate={handleNavigate} />
        )}

        {currentView === 'research' && <ResearchMetricsView />}

        {currentView === 'about' && <AboutView />}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
