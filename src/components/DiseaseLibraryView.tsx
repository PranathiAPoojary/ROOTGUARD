import React, { useState, useEffect } from 'react';
import { DiseaseInfo, ViewMode } from '../types';

interface DiseaseLibraryViewProps {
  onNavigate: (view: ViewMode) => void;
  onSelectSample: (sampleKey: string) => void;
}

export const DiseaseLibraryView: React.FC<DiseaseLibraryViewProps> = ({
  onNavigate,
  onSelectSample,
}) => {
  const [diseases, setDiseases] = useState<DiseaseInfo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/diseases')
      .then((res) => res.json())
      .then((data) => {
        if (data.diseases) {
          setDiseases(data.diseases);
          if (data.diseases.length > 0) {
            setExpandedKey(data.diseases[0].disease_key);
          }
        }
      })
      .catch((err) => console.error('Failed to load diseases:', err));
  }, []);

  const categories = [
    { key: 'all', label: 'All Conditions' },
    { key: 'Fungal', label: 'Fungal Diseases' },
    { key: 'Phytoplasma', label: 'Phytoplasma' },
    { key: 'Pest', label: 'Insect Pests' },
    { key: 'Nematode', label: 'Nematodes' },
    { key: 'Healthy', label: 'Healthy Roots' },
  ];

  const filteredDiseases = diseases.filter((d) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      d.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.causal_agent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.root_symptoms.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
          <span>Authoritative Pathology Compendium</span>
          <span aria-hidden="true">·</span>
          <span>ICAR-CPCRI & TNAU Grounded</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Arecanut Root Disease & Pest Library
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          Comprehensive scientific database of arecanut palm root conditions. Review diagnostic field symptoms, causal organisms, favorable microclimates, and verified integrated pest management (IPM) protocols.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Filter Segmented Control */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium w-full sm:w-auto">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setSelectedCategory(c.key)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                selectedCategory === c.key
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-72 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search symptoms, pathogens..."
            className="w-full px-3.5 py-2 pl-9 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all placeholder:text-slate-400"
          />
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Disease Cards List */}
      <div className="space-y-4">
        {filteredDiseases.map((d) => {
          const isExpanded = expandedKey === d.disease_key;
          const isHealthy = d.disease_key === 'healthy_arecanut_roots';

          return (
            <div
              key={d.disease_key}
              className={`bg-white border rounded-2xl overflow-hidden transition-all shadow-sm ${
                isHealthy
                  ? 'border-emerald-200'
                  : isExpanded
                  ? 'border-emerald-400/80 ring-1 ring-emerald-300/40'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Card Header Accordion Trigger */}
              <button
                onClick={() => setExpandedKey(isExpanded ? null : d.disease_key)}
                className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={`font-semibold ${
                        isHealthy ? 'text-emerald-700' : 'text-slate-600'
                      }`}
                    >
                      {d.category}
                    </span>
                    {d.vernacular_name && (
                      <>
                        <span aria-hidden="true" className="text-slate-300">
                          ·
                        </span>
                        <span className="text-slate-500">{d.vernacular_name}</span>
                      </>
                    )}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">{d.name}</h2>
                  <div className="text-xs text-slate-500 italic">
                    Etiology: {d.causal_agent}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-semibold text-emerald-700 hidden sm:inline">
                    {isExpanded ? 'Hide Details' : 'View Full Protocol'}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Expanded Comprehensive Information */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-6 text-xs text-slate-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left: Symptoms & Microclimate */}
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="font-semibold text-slate-900 uppercase tracking-wider">
                          Primary Root Symptoms
                        </div>
                        <p className="leading-relaxed text-slate-600">{d.root_symptoms}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="font-semibold text-slate-900 uppercase tracking-wider">
                          Canopy & Foliar Indicators
                        </div>
                        <p className="leading-relaxed text-slate-600">{d.canopy_symptoms}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="font-semibold text-slate-900 uppercase tracking-wider">
                          Favorable Environmental Conditions
                        </div>
                        <p className="leading-relaxed text-slate-600">{d.favorable_conditions}</p>
                      </div>
                    </div>

                    {/* Right: Management & Treatments */}
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="font-semibold text-slate-900 uppercase tracking-wider">
                          Preventive & Cultural Practices
                        </div>
                        <p className="leading-relaxed text-slate-600">{d.preventive_measures}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="font-semibold text-slate-900 uppercase tracking-wider">
                          Biological & Agronomic Treatments
                        </div>
                        <p className="leading-relaxed text-slate-600">{d.recommended_treatments}</p>
                      </div>

                      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1 text-amber-950">
                        <div className="font-semibold">
                          Authorized Chemical Controls & Safety Notice
                        </div>
                        <p className="leading-relaxed">{d.chemical_controls}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="font-semibold text-rose-900 uppercase tracking-wider">
                          Expert Escalation Triggers
                        </div>
                        <p className="leading-relaxed text-slate-600">{d.expert_consultation_triggers}</p>
                      </div>
                    </div>
                  </div>

                  {/* Citation Footer */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-400 text-[11px]">
                    <div>
                      Source Standard: <span className="text-slate-600 font-medium">{d.citation_source}</span>
                    </div>

                    <button
                      onClick={() => {
                        onNavigate('diagnostic');
                        if (d.disease_key === 'healthy_arecanut_roots') onSelectSample('healthy');
                        else if (d.disease_key === 'ganoderma_root_rot') onSelectSample('ganoderma');
                        else if (d.disease_key === 'root_grub_damage') onSelectSample('root_grub');
                        else onSelectSample('healthy');
                      }}
                      className="text-emerald-700 hover:text-emerald-800 font-semibold"
                    >
                      Test in Diagnostic Console →
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
