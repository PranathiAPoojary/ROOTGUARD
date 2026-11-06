import React, { useState } from 'react';

export function VisualRootInspector({ imageUrl, prediction }) {
  const [currentView, setCurrentView] = useState('grid_divisions');
  const [isGalleryMode, setIsGalleryMode] = useState(false);
  const [selectedPatchId, setSelectedPatchId] = useState(null);

  const { root_detection, adaptive_grid_analysis } = prediction;
  const patches = adaptive_grid_analysis.patches;
  const selectedPatch =
    patches.find((p) => p.patch_id === selectedPatchId) || patches[0];

  const views = [
    {
      key: 'original',
      step: '01',
      title: 'Original Photograph',
      subtitle: 'Raw close-up photograph of excavated arecanut root specimen',
    },
    {
      key: 'detected_region',
      step: '02',
      title: 'Detected Root Region',
      subtitle: 'Automated bounding box identifying the arecanut root cluster',
    },
    {
      key: 'cropped_root',
      step: '03',
      title: 'Cropped Root Image',
      subtitle: 'Extracted root zone with background soil minimized',
    },
    {
      key: 'grid_divisions',
      step: '04',
      title: 'Grid Divisions',
      subtitle: 'Adaptive 3x3 grid partitions for localized regional inspection',
    },
    {
      key: 'suspicious_regions',
      step: '05',
      title: 'Highlighted Suspicious Regions',
      subtitle: 'Necrotic cortical hotspots, fungal mycelium and gnaw lesions',
    },
    {
      key: 'final_prediction',
      step: '06',
      title: 'Final Prediction',
      subtitle: 'Combined pathological diagnosis, confidence score and severity',
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm space-y-0">
      {/* Visual Inspector Navigation Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
            <span>Automated Multistage Computer Vision View</span>
            <span aria-hidden="true">·</span>
            <span>Zero Manual Cropping Required</span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-0.5">
            Automatic Root Image Processing Pipeline
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Review the 6 visual stages executed automatically by OpenCV and the adaptive grid CNN feature extractor.
          </p>
        </div>

        {/* Gallery Mode Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsGalleryMode(!isGalleryMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              isGalleryMode
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            {isGalleryMode ? 'Switch to Single View' : 'View All 6 Stages Side-by-Side'}
          </button>
        </div>
      </div>

      {/* View Selector Tabs (when in Single View) */}
      {!isGalleryMode && (
        <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-100/50 p-1 text-xs font-medium text-slate-600 gap-1">
          {views.map((v) => (
            <button
              key={v.key}
              type="button"
              onClick={() => setCurrentView(v.key)}
              className={`px-3 py-2 rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
                currentView === v.key
                  ? 'bg-white text-slate-900 font-semibold shadow-xs'
                  : 'hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span className="font-mono text-emerald-700 font-bold text-[11px]">
                {v.step}
              </span>
              <span>{v.title}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main View Area */}
      <div className="p-5 sm:p-6 space-y-6">
        {isGalleryMode ? (
          /* Side-by-Side 6-Stage Gallery */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {views.map((v) => (
              <div
                key={v.key}
                className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 flex flex-col"
              >
                <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-emerald-700 font-bold uppercase">
                      Stage {v.step}
                    </div>
                    <div className="text-xs font-bold text-slate-900">
                      {v.title}
                    </div>
                  </div>
                </div>

                <div className="relative aspect-[4/3] bg-slate-900 flex items-center justify-center overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={v.title}
                    className={`w-full h-full object-cover ${
                      v.key === 'cropped_root'
                        ? 'scale-125'
                        : ''
                    }`}
                  />

                  {/* Stage Overlays */}
                  {v.key === 'detected_region' && (
                    <div className="absolute inset-4 border-2 border-emerald-400 rounded-lg pointer-events-none shadow-xs">
                      <span className="absolute top-1 left-1 bg-emerald-700 text-white text-[9px] font-mono px-1 rounded">
                        ROI: Areca catechu root
                      </span>
                    </div>
                  )}

                  {v.key === 'grid_divisions' && (
                    <div className="absolute inset-4 grid grid-cols-3 grid-rows-3 border border-emerald-400/80 pointer-events-none">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="border border-emerald-400/50 flex items-center justify-center">
                          <span className="text-[8px] font-mono text-white/90 bg-slate-900/60 px-1 rounded">
                            P_{Math.floor(i / 3)}_{i % 3}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {v.key === 'suspicious_regions' && (
                    <div className="absolute inset-4 grid grid-cols-3 grid-rows-3 pointer-events-none">
                      {patches.map((p, i) => (
                        <div
                          key={p.patch_id}
                          className={`border ${
                            p.is_suspicious
                              ? 'border-rose-400 bg-rose-500/25 ring-1 ring-rose-400'
                              : 'border-emerald-400/30'
                          } flex items-center justify-center`}
                        >
                          {p.is_suspicious && (
                            <span className="text-[9px] font-mono text-white bg-rose-700 px-1 rounded">
                              {p.necrosis_index}%
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {v.key === 'final_prediction' && (
                    <div className="absolute bottom-2 inset-x-2 bg-slate-900/90 backdrop-blur-xs text-white p-2 rounded-lg text-center text-xs space-y-0.5">
                      <div className="font-bold text-emerald-400 truncate">
                        {prediction.disease_name}
                      </div>
                      <div className="text-[10px] text-slate-300 font-mono">
                        {prediction.confidence_percentage}% · {prediction.severity_level}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-3 text-[11px] text-slate-500 bg-white border-t border-slate-100 flex-1">
                  {v.subtitle}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Single Detailed View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Viewport Canvas Card */}
            <div className="lg:col-span-7 bg-slate-900 rounded-xl overflow-hidden relative aspect-[4/3] flex items-center justify-center border border-slate-200 shadow-inner">
              <img
                src={imageUrl}
                alt="Arecanut root pipeline inspection"
                className={`w-full h-full object-cover transition-all ${
                  currentView === 'cropped_root' ? 'scale-125' : ''
                }`}
              />

              {/* Bounding Box on Detected Region */}
              {currentView === 'detected_region' && (
                <div className="absolute inset-6 border-3 border-emerald-400 rounded-lg pointer-events-none shadow-lg">
                  <div className="absolute top-2 left-2 bg-emerald-700 text-white text-xs font-mono font-bold px-2 py-0.5 rounded shadow">
                    Bounding Box: [X: 12%, Y: 10%, W: 76%, H: 80%]
                  </div>
                </div>
              )}

              {/* Adaptive 3x3 Grid */}
              {currentView === 'grid_divisions' && (
                <div className="absolute inset-6 grid grid-cols-3 grid-rows-3 border-2 border-emerald-400">
                  {patches.map((p) => {
                    const isSelected = p.patch_id === selectedPatch.patch_id;
                    return (
                      <button
                        key={p.patch_id}
                        type="button"
                        onClick={() => setSelectedPatchId(p.patch_id)}
                        className={`border border-emerald-400/70 p-2 flex flex-col justify-between text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-500/30 ring-2 ring-white'
                            : 'hover:bg-emerald-500/15'
                        }`}
                      >
                        <span className="text-[10px] font-mono text-white font-bold bg-slate-900/80 px-1 py-0.5 rounded self-start">
                          {p.patch_id}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-200 self-end">
                          Necrosis: {p.necrosis_index}%
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Suspicious Regions Highlighted */}
              {currentView === 'suspicious_regions' && (
                <div className="absolute inset-6 grid grid-cols-3 grid-rows-3">
                  {patches.map((p) => (
                    <div
                      key={p.patch_id}
                      className={`border p-2 flex flex-col justify-between ${
                        p.is_suspicious
                          ? 'border-2 border-rose-500 bg-rose-600/35 ring-1 ring-rose-400 animate-pulse'
                          : 'border border-emerald-400/20'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-white font-bold bg-slate-900/80 px-1 rounded self-start">
                        {p.patch_id}
                      </span>
                      {p.is_suspicious && (
                        <span className="text-[11px] font-bold text-white bg-rose-700 px-1.5 py-0.5 rounded self-end shadow">
                          ALERT: {p.necrosis_index}%
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Final Prediction Overlay */}
              {currentView === 'final_prediction' && (
                <div className="absolute inset-x-4 bottom-4 bg-slate-950/90 backdrop-blur-md text-white p-4 rounded-xl border border-white/20 shadow-xl space-y-1">
                  <div className="text-xs uppercase tracking-wider text-emerald-400 font-bold">
                    Aggregated Diagnosis
                  </div>
                  <div className="text-lg font-bold">{prediction.disease_name}</div>
                  <div className="flex items-center gap-4 text-xs text-slate-300 font-mono pt-1">
                    <span>Confidence: {prediction.confidence_percentage}%</span>
                    <span>·</span>
                    <span>Severity: {prediction.severity_level}</span>
                    <span>·</span>
                    <span>Affected Volume: {prediction.affected_root_volume_percentage}%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Inspection Stage Context & Patch Telemetry */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                  Stage Details
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  {views.find((v) => v.key === currentView)?.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {views.find((v) => v.key === currentView)?.subtitle}
                </p>
              </div>

              {/* Patch Details (when inspecting grid) */}
              {(currentView === 'grid_divisions' || currentView === 'suspicious_regions') && selectedPatch && (
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-800">
                      Selected Patch: <span className="font-mono text-emerald-700">{selectedPatch.patch_id}</span>
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        selectedPatch.is_suspicious
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {selectedPatch.tissue_status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <div className="text-slate-400 text-[10px] uppercase font-semibold">
                        Necrosis Index
                      </div>
                      <div className="font-mono font-bold text-slate-800">
                        {selectedPatch.necrosis_index}%
                      </div>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <div className="text-slate-400 text-[10px] uppercase font-semibold">
                        Row / Column
                      </div>
                      <div className="font-mono font-bold text-slate-800">
                        R{selectedPatch.row} : C{selectedPatch.col}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-700">Prominent Feature: </span>
                    {selectedPatch.prominent_feature}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
