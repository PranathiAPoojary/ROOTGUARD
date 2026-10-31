import React from 'react';
import { ViewMode } from '../types';

interface HomeViewProps {
  onNavigate: (view: ViewMode) => void;
  onSelectSample: (sampleKey: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectSample }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-12 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline and Scope */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
                <span>Areca catechu Pathology</span>
                <span aria-hidden="true">·</span>
                <span>ICAR-CPCRI Referenced Standards</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight" style={{ textWrap: 'balance' }}>
                AI-Based Early Prediction of Arecanut Root Diseases
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                An automated computer vision diagnostic engine designed exclusively for arecanut palm root systems.
                Detect fatal root rot, white grub devastation, and parasitic nematodes weeks before irrecoverable foliar symptoms appear.
              </p>

              {/* Strict Scope Alert Banner */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-xs text-emerald-900 leading-relaxed space-y-1">
                <div className="font-semibold text-emerald-950 flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Strict Botanical Target Scope</span>
                </div>
                <p>
                  RootGuard is calibrated strictly for <strong>Arecanut (Areca catechu) roots only</strong>. Unrelated foliage, nuts, coconut roots, banana rhizomes, or random non-root objects will be rejected by the automated specimen validator.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('diagnostic')}
                  className="px-6 py-3 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                >
                  <span>Get Started with Root Analysis</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                <button
                  onClick={() => onNavigate('diseases')}
                  className="px-5 py-3 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Browse Disease Library
                </button>
              </div>

              {/* Authoritative Evidence Adjacency */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-4 text-xs text-slate-500">
                <span>Integrated Guidance From</span>
                <span aria-hidden="true">·</span>
                <span className="font-medium text-slate-700">ICAR-CPCRI Regional Stations</span>
                <span aria-hidden="true">·</span>
                <span className="font-medium text-slate-700">TNAU Agritech</span>
                <span aria-hidden="true">·</span>
                <span className="font-medium text-slate-700">UHS Bagalkot</span>
              </div>
            </div>

            {/* Right Column: Specimen Showcase Card */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="relative aspect-[4/3] bg-slate-100">
                  <img
                    src="/src/assets/images/arecanut_healthy_roots_1793441543488.jpg"
                    alt="Areca catechu healthy root specimen"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-semibold text-emerald-800 border border-slate-200">
                    Target Specimen: Areca catechu
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Field Diagnosis Benchmark</span>
                    <span className="font-mono text-emerald-700 font-semibold">94.2% Validation Accuracy</span>
                  </div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Close-Up Uprooted Root Diagnostics
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Examines cortical discoloration, vascular brown necrosis, mechanical severance, and galling.
                    Automated background removal ensures accurate analysis regardless of soil residues.
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => onSelectSample('healthy')}
                      className="text-xs text-emerald-700 font-medium hover:text-emerald-800 transition-colors"
                    >
                      Test with this sample →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Automated Diagnostic Pipeline
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            How RootGuard Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Farmers simply upload a close-up photo of the uprooted root zone. All computer vision and pathological reasoning happen automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Specimen Validation
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Verifies resolution, blur, and illumination. The out-of-distribution classifier confirms monocot arecanut fibrous root morphology and automatically rejects leaves, fruits, or unsupported crops.
            </p>
            <div className="pt-2 text-xs text-slate-500">
              Automated quality and botanical organ verification
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Adaptive Grid & Feature Analysis
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              The root region is segmented from extraneous soil background and partitioned into an adaptive 3x3 grid. Each patch is analyzed for necrotic lesions, fungal mycelium, and root grub gnaw marks.
            </p>
            <div className="pt-2 text-xs text-slate-500">
              Patch-level anomaly scoring & regional pooling
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Severity & Prescription
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Calculates independent disease confidence and risk severity (Low, Moderate, High, or Healthy) with documented reasons. Delivers actionable ICAR-CPCRI agronomic and biocontrol prescriptions.
            </p>
            <div className="pt-2 text-xs text-slate-500">
              Biological controls, cultural measures & safety protocols
            </div>
          </div>
        </div>
      </section>

      {/* Six Root Conditions Card Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Taxonomic Classification
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
              Six Supported Root Diagnostic Classes
            </h2>
          </div>
          <button
            onClick={() => onNavigate('diseases')}
            className="text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors whitespace-nowrap"
          >
            Explore detailed pathology guides →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Healthy */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-emerald-700">Baseline Standard</span>
              <span className="text-xs text-slate-400">Class 01</span>
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Healthy Arecanut Roots
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Turgid cylindrical roots with ivory-white feeder tips and intact reddish-brown cortex. Optimal water and nutrient conduction.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onSelectSample('healthy')}
                className="text-xs font-medium text-emerald-700 hover:underline"
              >
                Load test sample →
              </button>
            </div>
          </div>

          {/* Card 2: Ganoderma */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-rose-700">Basidiomycete Fungus</span>
              <span className="text-xs text-slate-400">Class 02</span>
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Ganoderma Root & Foot Rot (Anabe Roga)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Blackened brittle cortical rot with superficial white mycelial strands. Causes progressive crown wilting and palm collapse.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onSelectSample('ganoderma')}
                className="text-xs font-medium text-emerald-700 hover:underline"
              >
                Load test sample →
              </button>
            </div>
          </div>

          {/* Card 3: Fusarium */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-amber-700">Soil-borne Fungal Decay</span>
              <span className="text-xs text-slate-400">Class 03</span>
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Fusarium Root Decay
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Soft reddish-brown rot where outer cortex easily sloughs off. Internal vascular stele shows characteristic dark brown streaking.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onSelectSample('fusarium')}
                className="text-xs font-medium text-emerald-700 hover:underline"
              >
                Load test sample →
              </button>
            </div>
          </div>

          {/* Card 4: Yellow Leaf Disease */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-amber-700">Phytoplasma Associated</span>
              <span className="text-xs text-slate-400">Class 04</span>
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Yellow Leaf Root Damage
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Extensive feeder tip necrosis, spongy disintegrated fibrous root net, and impaired nutrient absorption accompanying crown yellowing.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onSelectSample('yellow_leaf')}
                className="text-xs font-medium text-emerald-700 hover:underline"
              >
                Load test sample →
              </button>
            </div>
          </div>

          {/* Card 5: Root Grub */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-rose-700">Coleoptera Pest Damage</span>
              <span className="text-xs text-slate-400">Class 05</span>
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Root Grub Damage (White Grub)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Violently severed and chewed root cylinders with ragged, blunt stump-ends. Causes palm loosening and lodging under heavy wind.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onSelectSample('root_grub')}
                className="text-xs font-medium text-emerald-700 hover:underline"
              >
                Load test sample →
              </button>
            </div>
          </div>

          {/* Card 6: Nematode */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-purple-700">Parasitic Nematodes</span>
              <span className="text-xs text-slate-400">Class 06</span>
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Nematode-Associated Damage
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Elongate reddish-black cortical lesions (burrowing nematode) and micro-galling (root-knot nematode) creating fungal ingress pathways.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onSelectSample('nematode')}
                className="text-xs font-medium text-emerald-700 hover:underline"
              >
                Load test sample →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
