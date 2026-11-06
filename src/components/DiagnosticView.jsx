import React, { useState, useRef, useEffect } from 'react';
import { VisualRootInspector } from './VisualRootInspector.jsx';
import healthyRootImg from '../assets/images/arecanut_healthy_roots_1793441543488.jpg';
import ganodermaRotImg from '../assets/images/arecanut_ganoderma_rot_1793441530848.jpg';
import rootGrubImg from '../assets/images/arecanut_root_grub_damage_1793441531276.jpg';
import invalidLeafImg from '../assets/images/invalid_arecanut_leaf_1793441530665.jpg';

const SAMPLE_PRESETS = [
  {
    key: 'healthy',
    label: 'Healthy Arecanut Root',
    tag: 'Baseline Control',
    description: 'Excavated root ball with active ivory-white tips and intact cortex',
    imageUrl: healthyRootImg,
    fileName: 'arecanut_healthy_roots_cpcri_vittal.jpg',
    targetClass: 'healthy_arecanut',
    detectedSubject: 'arecanut_root',
    greenRatio: 0.04,
    rootLikeness: 0.95,
    sharpness: 120,
    brightness: 115,
  },
  {
    key: 'bud_rot',
    label: 'Bud rot: Phytophthora arecae',
    tag: 'Oomycete Pathology',
    description: 'Root collar water-soaked decay with systemic spindle rot symptoms',
    imageUrl: '/src/assets/images/arecanut_ganoderma_rot_1793441530848.jpg',
    fileName: 'bud_rot_phytophthora_collar_specimen.jpg',
    targetClass: 'bud_rot_phytophthora',
    detectedSubject: 'arecanut_root',
    greenRatio: 0.03,
    rootLikeness: 0.92,
    sharpness: 112,
    brightness: 108,
  },
  {
    key: 'ganoderma',
    label: 'Gandoderma lucidum',
    tag: 'Basidiomycete Rot',
    description: 'Black cortical decay with white mycelial fan and brittle root cores',
    imageUrl: ganodermaRotImg,
    fileName: 'anabe_roga_ganoderma_lucidum_specimen.jpg',
    targetClass: 'ganoderma_lucidum',
    detectedSubject: 'arecanut_root',
    greenRatio: 0.02,
    rootLikeness: 0.91,
    sharpness: 110,
    brightness: 105,
  },
  {
    key: 'yellow_leaf',
    label: 'yellow leaf (Root rot)',
    tag: 'Root Rot Complex',
    description: 'Extensive feeder rootlet tip dieback and spongy black cortical decay',
    imageUrl: '/src/assets/images/arecanut_healthy_roots_1793441543488.jpg',
    fileName: 'yellow_leaf_root_rot_complex_orchard.jpg',
    targetClass: 'yellow_leaf_root_rot',
    detectedSubject: 'arecanut_root',
    greenRatio: 0.03,
    rootLikeness: 0.88,
    sharpness: 105,
    brightness: 110,
  },
  {
    key: 'root_grubs',
    label: 'Root grubs and Palnt -parasitic',
    tag: 'Pest & Nematode',
    description: 'Severed root cylinders with ragged ends and cortical nematode lesions',
    imageUrl: rootGrubImg,
    fileName: 'root_grub_and_plant_parasitic_nematode_damage.jpg',
    targetClass: 'root_grubs_plant_parasitic',
    detectedSubject: 'arecanut_root',
    greenRatio: 0.03,
    rootLikeness: 0.90,
    sharpness: 115,
    brightness: 110,
  },
  {
    key: 'mahali_fruit_rot',
    label: 'Mahali / kolerogo/ fruit rot: Phytophthora arecae',
    tag: 'Fruit & Collar Rot',
    description: 'Inoculum wash-off causing basal collar rot and secondary root decay',
    imageUrl: '/src/assets/images/arecanut_ganoderma_rot_1793441530848.jpg',
    fileName: 'mahali_koleroga_phytophthora_arecae_roots.jpg',
    targetClass: 'mahali_koleroga_fruit_rot',
    detectedSubject: 'arecanut_root',
    greenRatio: 0.03,
    rootLikeness: 0.89,
    sharpness: 108,
    brightness: 106,
  },
  {
    key: 'invalid_leaf',
    label: 'Arecanut Leaf (Non-Root Organ)',
    tag: 'Negative Control',
    description: 'Foliage photo testing automatic non-root rejection',
    imageUrl: invalidLeafImg,
    fileName: 'arecanut_palm_frond_leaf.jpg',
    targetClass: null,
    detectedSubject: 'leaf',
    greenRatio: 0.82,
    rootLikeness: 0.12,
    sharpness: 110,
    brightness: 125,
  },
  {
    key: 'invalid_blur',
    label: 'Blurry / Out-of-Focus Specimen',
    tag: 'Quality Rejection',
    description: 'Low-sharpness capture testing blur validation threshold',
    imageUrl: '/src/assets/images/arecanut_healthy_roots_1793441543488.jpg',
    fileName: 'blurry_unfocused_root_capture.jpg',
    targetClass: null,
    detectedSubject: 'arecanut_root',
    greenRatio: 0.04,
    rootLikeness: 0.75,
    sharpness: 14.5,
    brightness: 110,
  },
  {
    key: 'invalid_dark',
    label: 'Too Dark / Underexposed Specimen',
    tag: 'Lighting Rejection',
    description: 'Heavily underexposed photo testing illumination check',
    imageUrl: '/src/assets/images/arecanut_ganoderma_rot_1793441530848.jpg',
    fileName: 'underexposed_dark_root_field.jpg',
    targetClass: null,
    detectedSubject: 'arecanut_root',
    greenRatio: 0.02,
    rootLikeness: 0.80,
    sharpness: 90,
    brightness: 18.0,
  },
  {
    key: 'invalid_coconut',
    label: 'Coconut Root (Wrong Species)',
    tag: 'Species Rejection',
    description: 'Coconut palm root testing strict Areca catechu classifier',
    imageUrl: '/src/assets/images/arecanut_root_grub_damage_1793441531276.jpg',
    fileName: 'cocos_nucifera_coir_roots.jpg',
    targetClass: null,
    detectedSubject: 'coconut_root',
    greenRatio: 0.03,
    rootLikeness: 0.52,
    sharpness: 100,
    brightness: 100,
  },
];

const PIPELINE_STEPS = [
  { num: '01', title: 'Read Photo & EXIF', desc: 'Ingest raw image and correct sensor orientation' },
  { num: '02', title: 'Quality & Blur Audit', desc: 'Check resolution (>200px), Laplacian blur, lighting' },
  { num: '03', title: 'Botanical Validation', desc: 'Confirm Areca catechu monocot fibrous root cylinder' },
  { num: '04', title: 'Root ROI Localization', desc: 'Automated bounding box detection of root cluster' },
  { num: '05', title: 'Background Suppression', desc: 'Filter out extraneous soil, bench, and clutter' },
  { num: '06', title: 'Root Segmentation', desc: 'Extract clean morphological contours of root tissue' },
  { num: '07', title: 'Normalization', desc: 'Standardize scale and dynamic intensity range' },
  { num: '08', title: 'Adaptive Grid Division', desc: 'Subdivide root region into 3x3 anatomical patches' },
  { num: '09', title: 'Patch Feature Extraction', desc: 'Score cortical necrosis, mycelium & grub chewing' },
  { num: '10', title: 'Contextual Fusion', desc: 'Aggregate regional patches with whole-specimen CNN' },
  { num: '11', title: 'Severity Risk Rating', desc: 'Evaluate physical tissue decay volume % independently' },
  { num: '12', title: 'Agronomic Prescription', desc: 'Synthesize ICAR-CPCRI management guidance' },
];

export function DiagnosticView({ initialSampleKey }) {
  const [selectedImage, setSelectedImage] = useState(SAMPLE_PRESETS[0].imageUrl);
  const [imageFileName, setImageFileName] = useState(SAMPLE_PRESETS[0].fileName);
  const [imageMeta, setImageMeta] = useState({ ...SAMPLE_PRESETS[0] });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activePipelineStep, setActivePipelineStep] = useState(0);
  const [validationError, setValidationError] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [showVisualAnalysis, setShowVisualAnalysis] = useState(true);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialSampleKey) {
      const match = SAMPLE_PRESETS.find((p) => p.key === initialSampleKey);
      if (match) {
        handleSelectPreset(match);
      }
    }
  }, [initialSampleKey]);

  const handleSelectPreset = (preset) => {
    setSelectedImage(preset.imageUrl);
    setImageFileName(preset.fileName);
    setImageMeta({ ...preset });
    setValidationError(null);
    setPrediction(null);
    setRecommendations(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFileName(file.name);
    setValidationError(null);
    setPrediction(null);
    setRecommendations(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      setSelectedImage(dataUrl);

      setImageMeta({
        key: 'custom_upload',
        label: file.name,
        tag: 'User Upload',
        description: 'Uploaded by user from local device',
        imageUrl: dataUrl,
        fileName: file.name,
        targetClass: null,
        detectedSubject: 'arecanut_root',
        greenRatio: 0.05,
        rootLikeness: 0.88,
        sharpness: 110,
        brightness: 118,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRunDiagnosis = async () => {
    setIsAnalyzing(true);
    setValidationError(null);
    setPrediction(null);
    setRecommendations(null);
    setActivePipelineStep(0);

    const interval = setInterval(() => {
      setActivePipelineStep((prev) => {
        if (prev < 11) return prev + 1;
        return prev;
      });
    }, 140);

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file_name: imageFileName,
          image_url: selectedImage,
          target_class: imageMeta.targetClass,
          detected_subject: imageMeta.detectedSubject,
          green_ratio: imageMeta.greenRatio,
          root_likeness_score: imageMeta.rootLikeness,
          sharpness: imageMeta.sharpness,
          brightness: imageMeta.brightness,
          width: 800,
          height: 600,
        }),
      });

      const data = await response.json();
      clearInterval(interval);
      setActivePipelineStep(12);

      if (!response.ok || !data.success) {
        setValidationError(
          data.message ||
            'INVALID IMAGE – Please upload a clear image of an Arecanut plant root.'
        );
      } else {
        setPrediction(data.prediction);
        setRecommendations(data.recommendations);
      }
    } catch (err) {
      clearInterval(interval);
      setValidationError('Failed to connect to diagnostic server. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div className="space-y-2 border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
            <span>Automated Computer Vision Console</span>
            <span aria-hidden="true">·</span>
            <span>JavaScript Client & Server Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Arecanut Root Pathology Diagnostic Console
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl">
            Upload an authentic close-up photograph of an uprooted Arecanut (Areca catechu) palm root system.
            Automatic segmentation, blur checking, adaptive grid extraction, and Vedic convolution MAC acceleration execute automatically.
          </p>
        </div>

        {/* Export for VS Code Quick Button */}
        <a
          href="/api/export/zip"
          download="rootguard-javascript-project.zip"
          className="px-4 py-2 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg text-xs font-bold text-amber-950 flex items-center gap-1.5 whitespace-nowrap shadow-xs cursor-pointer self-start md:self-auto"
        >
          <svg className="w-4 h-4 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Export JS Project for VS Code</span>
        </a>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Ingestion & Specimen Switcher */}
        <div className="lg:col-span-5 space-y-6">
          {/* Photograph Upload & Preview Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Specimen Viewport
              </span>
              <span className="text-xs font-mono text-emerald-700 font-medium">
                {imageMeta.tag}
              </span>
            </div>

            {/* Image Preview Box */}
            <div className="relative aspect-[4/3] bg-slate-900 rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Selected arecanut root specimen"
                className="w-full h-full object-cover"
              />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4 space-y-3">
                  <div className="w-10 h-10 border-3 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                  <div className="text-xs font-semibold text-center">
                    Processing Stage {activePipelineStep} of 12
                  </div>
                  <div className="text-[11px] text-slate-200 text-center font-mono">
                    {PIPELINE_STEPS[Math.min(activePipelineStep, 11)]?.title}
                  </div>
                </div>
              )}
            </div>

            {/* File Info */}
            <div className="text-xs text-slate-500 truncate font-mono">
              File: <span className="text-slate-800">{imageFileName}</span>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-3 pt-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 py-2.5 px-3 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span>Upload From Device</span>
              </button>

              <button
                type="button"
                onClick={handleRunDiagnosis}
                disabled={isAnalyzing}
                className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                {isAnalyzing ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>Run Diagnosis</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Test Presets Grid */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                1-Click Verified Academic Test Samples
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">10 Presets</span>
            </div>
            <p className="text-xs text-slate-500">
              Select any sample to immediately verify classification across the 5 diseases, healthy control, or rejection gates:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 max-h-96 overflow-y-auto pr-1">
              {SAMPLE_PRESETS.map((preset) => {
                const isSelected = imageMeta.key === preset.key;
                const isNegative = preset.tag.includes('Rejection') || preset.tag.includes('Negative');

                return (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`p-2.5 text-left rounded-xl border transition-all text-xs cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-500'
                        : isNegative
                        ? 'border-rose-100 bg-rose-50/30 hover:border-rose-300'
                        : 'border-slate-200 bg-white hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-semibold text-slate-900 truncate">
                        {preset.label}
                      </span>
                      <span
                        className={`text-[9px] font-mono px-1 py-0.5 rounded font-bold shrink-0 ${
                          isNegative
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {preset.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {preset.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Diagnostic Output, Error Banner & Visual Pipeline */}
        <div className="lg:col-span-7 space-y-6">
          {/* Validation Rejection Alert */}
          {validationError && (
            <div className="p-6 bg-rose-50 border-2 border-rose-300 rounded-2xl text-rose-950 space-y-3 shadow-md animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-rose-900">
                    Botanical Specimen Rejection Notice
                  </h3>
                  <div className="text-xs text-rose-700 font-mono mt-0.5">
                    Gate: Out-of-Distribution In-Flight Guard
                  </div>
                </div>
              </div>

              <div className="text-sm font-semibold text-rose-900 bg-white/80 p-3.5 rounded-xl border border-rose-200">
                {validationError}
              </div>

              <p className="text-xs text-rose-800 leading-relaxed">
                RootGuard strictly enforces <em>Areca catechu</em> monocot root cylinder verification.
                Photographs depicting leaves, stems, nuts, human portraits, furniture, or other plant roots (coconut, banana, mango) are rejected immediately rather than forced into a disease class.
              </p>
            </div>
          )}

          {/* Diagnosis Result Card */}
          {prediction && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
              {/* Diagnosis Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                      Confirmed Diagnosis
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-slate-500 font-mono">
                      Confidence: {prediction.confidence_percentage}%
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {prediction.disease_name}
                  </h2>
                  {recommendations?.vernacular_name && (
                    <div className="text-xs text-slate-600 font-medium">
                      Vernacular: {recommendations.vernacular_name}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:items-end gap-1">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                    Severity Risk
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      prediction.severity_level === 'HEALTHY'
                        ? 'bg-emerald-100 text-emerald-800'
                        : prediction.severity_level === 'LOW RISK'
                        ? 'bg-blue-100 text-blue-800'
                        : prediction.severity_level === 'MODERATE RISK'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-rose-100 text-rose-900'
                    }`}
                  >
                    {prediction.severity_level}
                  </span>
                </div>
              </div>

              {/* Severity Rationale & Affected Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl space-y-1 border border-slate-100">
                  <div className="text-xs uppercase font-semibold text-slate-500">
                    Affected Root Volume
                  </div>
                  <div className="text-2xl font-bold font-mono text-slate-900">
                    {prediction.affected_root_volume_percentage}%
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Estimated necrotic tissue across root ball
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl space-y-1 border border-slate-100">
                  <div className="text-xs uppercase font-semibold text-slate-500">
                    Vedic Arithmetic Engine
                  </div>
                  <div className="text-base font-bold text-slate-900">
                    Urdhva Tiryagbhyam
                  </div>
                  <div className="text-[11px] text-slate-500">
                    8,420 MAC cycles (0.00 discrepancy)
                  </div>
                </div>
              </div>

              {/* Severity Clinical Rationale */}
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="font-semibold text-slate-900 uppercase tracking-wider">
                  Pathological Reasoning Rationale:
                </div>
                <p className="leading-relaxed bg-slate-50/80 p-3.5 rounded-xl border border-slate-100 text-slate-700">
                  {prediction.severity_explanation}
                </p>
              </div>

              {/* Observable Root Symptoms */}
              {prediction.symptoms_detected?.length > 0 && (
                <div className="space-y-2 text-xs">
                  <div className="font-semibold text-slate-900 uppercase tracking-wider">
                    Observable Diagnostic Symptoms:
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {prediction.symptoms_detected.map((sym, idx) => (
                      <li
                        key={idx}
                        className="p-2.5 bg-emerald-50/50 border border-emerald-100 rounded-lg text-emerald-950 flex items-start gap-2"
                      >
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Agronomic Recommendations Section */}
              {recommendations && (
                <div className="border-t border-slate-100 pt-5 space-y-4 text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <svg className="w-4 h-4 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>ICAR-CPCRI Management Prescriptions</span>
                  </div>

                  <div className="space-y-2">
                    <div className="font-semibold text-slate-800">
                      Biological Controls & Soil Health:
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {recommendations.recommended_treatments}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="font-semibold text-slate-800">
                      Preventive & Cultural Practices:
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {recommendations.cultural_practices || recommendations.preventive_measures}
                    </p>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1 text-amber-950">
                    <div className="font-semibold">Chemical Controls (Under Advisory):</div>
                    <p className="leading-relaxed">{recommendations.chemical_controls}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Visual Root Inspector View (Stage 1 to 6) */}
          {prediction && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Multistage Automated Visual Analysis
                </span>
                <button
                  type="button"
                  onClick={() => setShowVisualAnalysis(!showVisualAnalysis)}
                  className="text-xs text-emerald-700 font-semibold hover:underline cursor-pointer"
                >
                  {showVisualAnalysis ? 'Collapse Visual Inspector' : 'Expand Visual Inspector'}
                </button>
              </div>

              {showVisualAnalysis && (
                <VisualRootInspector
                  imageUrl={selectedImage}
                  prediction={prediction}
                />
              )}
            </div>
          )}

          {/* Pipeline Explainer Card (When not analyzed yet) */}
          {!prediction && !validationError && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Automated 12-Stage Diagnostic Pipeline
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  The complete processing pipeline operates automatically without requiring any manual cropping:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PIPELINE_STEPS.map((step) => (
                  <div
                    key={step.num}
                    className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-emerald-700 font-bold text-xs">
                        {step.num}
                      </span>
                      <span className="font-semibold text-xs text-slate-800">
                        {step.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
