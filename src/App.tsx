/**
 * ROOTGUARD - AI-Based Early Prediction of Arecanut Root Diseases
 * Academic Engineering Mini-Project
 */

import React, { useState } from 'react';
import { ViewMode } from './types';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { DiagnosticView } from './components/DiagnosticView';
import { DiseaseLibraryView } from './components/DiseaseLibraryView';
import { HistoryView } from './components/HistoryView';
import { ResearchMetricsView } from './components/ResearchMetricsView';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedSampleKey, setSelectedSampleKey] = useState<string>('healthy');

  const handleSelectSample = (sampleKey: string) => {
    setSelectedSampleKey(sampleKey);
    setCurrentView('diagnostic');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Bar Navigation */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* Main View Router */}
      <main className="flex-1">
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
