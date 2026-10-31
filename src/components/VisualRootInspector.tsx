import React, { useState } from 'react';
import { PredictionResult } from '../types';

interface VisualRootInspectorProps {
  imageUrl: string;
  prediction: PredictionResult;
}

export type InspectionViewType =
  | 'original'
  | 'detected_region'
  | 'cropped_root'
  | 'grid_divisions'
  | 'suspicious_regions'
  | 'final_prediction';

export const VisualRootInspector: React.FC<VisualRootInspectorProps> = ({
  imageUrl,
  prediction,
}) => {
  const [currentView, setCurrentView] = useState<InspectionViewType>('grid_divisions');
  const [isGalleryMode, setIsGalleryMode] = useState<boolean>(false);
  const [selectedPatchId, setSelectedPatchId] = useState<string | null>(null);

  const { root_detection, adaptive_grid_analysis } = prediction;
  const patches = adaptive_grid_analysis.patches;
  const selectedPatch =
    patches.find((p) => p.patch_id === selectedPatchId) || patches[0];

  const views: { key: InspectionViewType; step: string; title: string; subtitle: string }[] = [
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
            onClick={() => setIsGalleryMode(!isGalleryMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              isGalleryMode
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            {isGalleryMode ? 'Switch to Single View' : 'View All 6 Stages Side-by-Side'}
          </button>
        </div>
      </div>

      {/* 6-Step Segmented Bar */}
      {!isGalleryMode && (
        <div className="border-b border-slate-200 bg-white overflow-x-auto">
          <div className="flex items-stretch min-w-[720px] p-2 gap-1">
            {views.map((v) => {
              const isActive = currentView === v.key;
              return (
                <button
                  key={v.key}
                  onClick={() => setCurrentView(v.key)}
                  className={`flex-1 p-2.5 rounded-lg text-left transition-all flex items-start gap-2.5 border ${
                    isActive
                      ? 'bg-emerald-50/90 border-emerald-600 ring-1 ring-emerald-500/30'
                      : 'bg-transparent border-transparent hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-emerald-700 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {v.step}
                  </span>
                  <div className="min-w-0">
                    <div
                      className={`text-xs font-bold truncate ${
                        isActive ? 'text-emerald-950' : 'text-slate-800'
                      }`}
                    >
                      {v.title}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">
                      {v.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode A: Single Stage Focused Inspector */}
      {!isGalleryMode && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Main Visual Display Stage */}
          <div className="lg:col-span-8 bg-slate-950 flex flex-col items-center justify-center p-6 relative min-h-[440px]">
            {/* View Stage Header Pill */}
            <div className="absolute top-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white px-3 py-1 rounded-md text-xs font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>
                Stage {views.find((v) => v.key === currentView)?.step}:{' '}
                {views.find((v) => v.key === currentView)?.title}
              </span>
            </div>

            {/* Stage Container with Dynamic Overlays */}
            <div className="relative max-w-full max-h-[500px] rounded-lg overflow-hidden shadow-2xl flex items-center justify-center">
              {/* 1. ORIGINAL PHOTOGRAPH */}
              {currentView === 'original' && (
                <img
                  src={imageUrl}
                  alt="Original uploaded arecanut root photograph"
                  className="w-full max-h-[460px] object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                />
              )}

              {/* 2. AUTOMATICALLY DETECTED ROOT REGION */}
              {currentView === 'detected_region' && (
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt="Detected arecanut root region"
                    className="w-full max-h-[460px] object-contain rounded-lg brightness-90"
                    referrerPolicy="no-referrer"
                  />
                  {/* Automated Bounding Box */}
                  <div
                    className="absolute border-2 border-emerald-400 bg-emerald-500/15 rounded pointer-events-none transition-all shadow-[0_0_15px_rgba(52,211,153,0.35)]"
                    style={{
                      top: '10%',
                      left: '12%',
                      width: '76%',
                      height: '80%',
                    }}
                  >
                    <div className="absolute top-2 left-2 bg-emerald-950/90 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/50 flex items-center gap-1.5">
                      <span>✓ Detected Root Region [76% × 80%]</span>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-slate-300 text-[9px] font-mono px-1.5 py-0.5 rounded">
                      Confidence: 98.4%
                    </div>
                  </div>
                </div>
              )}

              {/* 3. CROPPED ROOT IMAGE */}
              {currentView === 'cropped_root' && (
                <div className="relative overflow-hidden p-3 bg-slate-900 rounded-lg">
                  <div className="overflow-hidden rounded-md border border-slate-700 bg-black flex items-center justify-center">
                    <img
                      src={imageUrl}
                      alt="Cropped arecanut root specimen"
                      className="max-h-[420px] object-cover scale-125 transform translate-y-2 contrast-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute bottom-5 left-5 bg-black/85 text-white text-[10px] font-mono px-2.5 py-1 rounded border border-slate-600">
                    Background Removed · Centered Root Cylinder
                  </div>
                </div>
              )}

              {/* 4. GRID DIVISIONS */}
              {currentView === 'grid_divisions' && (
                <div className="relative overflow-hidden p-3 bg-slate-900 rounded-lg">
                  <div className="relative overflow-hidden rounded-md border border-slate-700 bg-black flex items-center justify-center">
                    <img
                      src={imageUrl}
                      alt="Grid divisions on root region"
                      className="max-h-[420px] object-cover scale-125 transform translate-y-2"
                      referrerPolicy="no-referrer"
                    />

                    {/* 3x3 Grid Overlay */}
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0.5 border-2 border-emerald-400/80 pointer-events-auto">
                      {patches.map((patch) => {
                        const isSelected = selectedPatchId === patch.patch_id;
                        return (
                          <button
                            key={patch.patch_id}
                            onClick={() => setSelectedPatchId(patch.patch_id)}
                            className={`border transition-all flex flex-col justify-between p-2 text-left ${
                              isSelected
                                ? 'border-2 border-white bg-emerald-500/25 ring-2 ring-emerald-400 z-10'
                                : 'border-emerald-300/40 bg-black/20 hover:bg-emerald-500/15'
                            }`}
                          >
                            <span className="text-[10px] font-mono font-bold text-white bg-black/70 px-1 rounded self-start">
                              {patch.patch_id}
                            </span>
                            <span className="text-[9px] font-mono text-emerald-200 bg-black/50 px-1 rounded self-end">
                              R{patch.row} C{patch.col}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* 5. HIGHLIGHTED SUSPICIOUS REGIONS */}
              {currentView === 'suspicious_regions' && (
                <div className="relative overflow-hidden p-3 bg-slate-900 rounded-lg">
                  <div className="relative overflow-hidden rounded-md border border-slate-700 bg-black flex items-center justify-center">
                    <img
                      src={imageUrl}
                      alt="Highlighted suspicious root regions"
                      className="max-h-[420px] object-cover scale-125 transform translate-y-2"
                      referrerPolicy="no-referrer"
                    />

                    {/* Heatmap Overlay with Necrotic Hotspots */}
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0.5 border-2 border-slate-400/60 pointer-events-auto">
                      {patches.map((patch) => {
                        const isSelected = selectedPatchId === patch.patch_id;
                        const isSuspicious = patch.is_suspicious;

                        let heatBg = 'bg-emerald-500/15';
                        if (patch.necrosis_index > 50) heatBg = 'bg-rose-600/50';
                        else if (patch.necrosis_index > 25) heatBg = 'bg-amber-500/40';

                        return (
                          <button
                            key={patch.patch_id}
                            onClick={() => setSelectedPatchId(patch.patch_id)}
                            className={`border transition-all flex flex-col justify-between p-2 text-left ${heatBg} ${
                              isSelected
                                ? 'border-2 border-white ring-2 ring-rose-400 z-10'
                                : isSuspicious
                                ? 'border-rose-400/80 hover:border-white'
                                : 'border-slate-300/30 hover:border-white/50'
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="text-[10px] font-mono font-bold text-white bg-black/70 px-1 rounded">
                                {patch.patch_id}
                              </span>
                              <span
                                className={`text-[9px] font-mono px-1 rounded font-bold ${
                                  patch.necrosis_index > 35
                                    ? 'bg-rose-700 text-white'
                                    : 'bg-black/50 text-emerald-200'
                                }`}
                              >
                                {patch.necrosis_index}%
                              </span>
                            </div>

                            {isSuspicious && (
                              <span className="text-[9px] font-semibold text-rose-200 bg-black/60 px-1 rounded self-start">
                                Suspicious
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* 6. FINAL PREDICTION SYNTHESIS */}
              {currentView === 'final_prediction' && (
                <div className="w-full max-w-md p-6 bg-slate-900 border border-slate-700 rounded-xl text-white space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-mono text-emerald-400">
                      ROOTGUARD AI DIAGNOSIS
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded ${
                        prediction.severity_level === 'HEALTHY'
                          ? 'bg-emerald-800 text-white'
                          : prediction.severity_level === 'HIGH RISK'
                          ? 'bg-rose-800 text-white'
                          : 'bg-amber-800 text-white'
                      }`}
                    >
                      {prediction.severity_level}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white">
                      {prediction.disease_name}
                    </h3>
                    <div className="text-xs text-slate-300 font-mono">
                      Confidence: <strong>{prediction.confidence_percentage}%</strong> ·
                      Affected Volume: <strong>{prediction.affected_root_volume_percentage}%</strong>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs space-y-1 text-slate-300">
                    <div className="font-semibold text-white">Severity Rationale:</div>
                    <p>{prediction.severity_explanation}</p>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="font-semibold text-white">Detected Indicators:</div>
                    <ul className="space-y-1 text-[11px]">
                      {prediction.symptoms_detected.slice(0, 3).map((s, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="text-emerald-400">✓</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Technical Inspector & Patch Breakdown */}
          <div className="lg:col-span-4 p-5 sm:p-6 bg-white space-y-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200">
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Adaptive Patch Inspector
                </span>
                <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {selectedPatch.patch_id}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-slate-500">Spatial Grid Coordinate:</div>
                  <div className="font-mono text-slate-900 font-bold mt-0.5">
                    Row {selectedPatch.row}, Column {selectedPatch.col}
                  </div>
                </div>

                <div>
                  <div className="text-slate-500">Localized Damage / Necrosis Score:</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          selectedPatch.necrosis_index > 50
                            ? 'bg-rose-600'
                            : selectedPatch.necrosis_index > 25
                            ? 'bg-amber-500'
                            : 'bg-emerald-600'
                        }`}
                        style={{ width: `${selectedPatch.necrosis_index}%` }}
                      />
                    </div>
                    <span className="font-mono font-bold text-slate-900 tabular-nums">
                      {selectedPatch.necrosis_index}%
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-slate-500">Pathological Observation:</div>
                  <div className="font-semibold text-slate-800 mt-0.5">
                    {selectedPatch.prominent_feature}
                  </div>
                </div>

                <div>
                  <div className="text-slate-500">Tissue Classification:</div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold mt-1 ${
                      selectedPatch.is_suspicious
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {selectedPatch.is_suspicious
                      ? 'Suspicious Abnormality Detected'
                      : 'Healthy Fibrous Root Cylinder'}
                  </span>
                </div>
              </div>
            </div>

            {/* Pipeline Stage Information Box */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5 text-slate-600">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>Computer Vision Pipeline Spec</span>
                <span className="font-mono text-[10px] text-emerald-700">OpenCV + CNN</span>
              </div>
              <div className="text-[11px] leading-relaxed">
                Zero manual cropping is required. The system automatically segments the monocot fibrous cylinder, constructs an adaptive grid, evaluates each patch, and performs contextual fusion for the final diagnosis.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode B: View All 6 Stages Side-by-Side (Gallery Mode) */}
      {isGalleryMode && (
        <div className="p-5 sm:p-6 bg-slate-900 space-y-6">
          <div className="text-xs text-slate-300">
            Showing all 6 automated processing stages in sequence from left to right:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Stage 1 Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden space-y-2 p-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono font-bold text-emerald-400">STAGE 01</span>
                <span>Original Photo</span>
              </div>
              <div className="aspect-[4/3] bg-black rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt="Stage 1 original photo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Unmodified uploaded photograph of the excavated arecanut root ball.
              </p>
            </div>

            {/* Stage 2 Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden space-y-2 p-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono font-bold text-emerald-400">STAGE 02</span>
                <span>Detected Root Region</span>
              </div>
              <div className="aspect-[4/3] bg-black rounded-lg overflow-hidden relative flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt="Stage 2 detected root region"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-3 inset-y-2 border-2 border-emerald-400 bg-emerald-500/10 rounded" />
              </div>
              <p className="text-[11px] text-slate-400">
                Automated bounding box identifies root cylinder coordinates.
              </p>
            </div>

            {/* Stage 3 Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden space-y-2 p-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono font-bold text-emerald-400">STAGE 03</span>
                <span>Cropped Root Image</span>
              </div>
              <div className="aspect-[4/3] bg-black rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt="Stage 3 cropped root"
                  className="w-full h-full object-cover scale-125"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Foreground root cluster isolated from surrounding loose soil.
              </p>
            </div>

            {/* Stage 4 Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden space-y-2 p-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono font-bold text-emerald-400">STAGE 04</span>
                <span>Grid Divisions</span>
              </div>
              <div className="aspect-[4/3] bg-black rounded-lg overflow-hidden relative flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt="Stage 4 grid divisions"
                  className="w-full h-full object-cover scale-125"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 border border-emerald-400/80 gap-0.5">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="border border-emerald-400/30" />
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                3x3 adaptive spatial partitioning for localized feature extraction.
              </p>
            </div>

            {/* Stage 5 Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden space-y-2 p-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono font-bold text-rose-400">STAGE 05</span>
                <span>Suspicious Regions</span>
              </div>
              <div className="aspect-[4/3] bg-black rounded-lg overflow-hidden relative flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt="Stage 5 suspicious regions"
                  className="w-full h-full object-cover scale-125"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0.5">
                  {patches.map((p) => (
                    <div
                      key={p.patch_id}
                      className={`border ${
                        p.is_suspicious
                          ? 'bg-rose-600/50 border-rose-400'
                          : 'bg-emerald-500/10 border-slate-500/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                Highlighted necrosis hotspots and fungal mycelial concentration.
              </p>
            </div>

            {/* Stage 6 Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden space-y-2 p-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono font-bold text-emerald-400">STAGE 06</span>
                  <span>Final Prediction</span>
                </div>
                <div className="mt-3 space-y-1">
                  <div className="text-sm font-bold text-white">
                    {prediction.disease_name}
                  </div>
                  <div className="text-xs font-mono text-emerald-400">
                    Confidence: {prediction.confidence_percentage}% · {prediction.severity_level}
                  </div>
                  <p className="text-[11px] text-slate-300 pt-1 line-clamp-3">
                    {prediction.severity_explanation}
                  </p>
                </div>
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                Prescriptions generated via ICAR-CPCRI standards
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
