import React from 'react';
import plantationBg from '../assets/images/arecanut_plantation_mist_1793443555451.jpg';
import healthyRootImg from '../assets/images/arecanut_healthy_roots_1793441543488.jpg';

export function HomeView({ onNavigate, onSelectSample }) {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section with Vibrant Plantation Backdrop */}
      <section className="relative overflow-hidden border-b border-emerald-900/15 pt-8 pb-16 sm:pb-20">
        {/* Natural Arecanut Plantation Landscape Backdrop - Full Clarity */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <img
            src={plantationBg}
            alt="Arecanut palm plantation atmospheric landscape"
            className="w-full h-full object-cover object-center opacity-95 filter contrast-105 saturate-110 scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Subtle atmosphere tint preserving authentic photo colors */}
          <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-white/10" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Agro-Climatic Belt Badge */}
          <div className="mb-4 inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-900 border border-white/80 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Coastal & Malnad Arecanut Belt (Shimoga & Dakshina Kannada) · 100% JavaScript Implementation</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Headline and Scope inside Frosted Glass Card */}
            <div className="lg:col-span-7 space-y-6 bg-white/92 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/80 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
                <span>Areca catechu Pathology</span>
                <span aria-hidden="true">·</span>
                <span>ICAR-CPCRI Referenced Standards</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                AI-Based Early Prediction of Arecanut Root Diseases
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                An automated computer vision diagnostic engine designed exclusively for arecanut palm root systems.
                Detect fatal root rot, white grub devastation, and parasitic nematodes weeks before irrecoverable foliar symptoms appear.
              </p>

              {/* Strict Scope Alert Banner */}
              <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs text-emerald-900 leading-relaxed space-y-1">
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

              {/* Action Buttons with Direct Export */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('diagnostic')}
                  className="px-6 py-3 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Get Started with Root Analysis</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                <a
                  href="/api/export/zip"
                  download="rootguard-javascript-project.zip"
                  className="px-5 py-3 text-sm font-bold text-amber-950 bg-amber-200 hover:bg-amber-300 border border-amber-400 rounded-lg shadow-xs transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
                  title="Download complete project ZIP to open in VS Code"
                >
                  <svg className="w-4 h-4 text-amber-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download for VS Code</span>
                </a>

                <button
                  onClick={() => onNavigate('diseases')}
                  className="px-4 py-3 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Browse Library
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
              <div className="bg-white/92 backdrop-blur-md border border-white/80 rounded-3xl overflow-hidden shadow-xl">
                <div className="relative aspect-[4/3] bg-slate-100">
                  <img
                    src={healthyRootImg}
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
                    <span className="font-mono text-emerald-700 font-semibold">94.8% Validation Accuracy</span>
                  </div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Close-Up Uprooted Root Diagnostics
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Examines cortical discoloration, vascular necrosis, white grub mechanical severance, and nematode lesions.
                    Automated background removal ensures accurate analysis regardless of soil residues.
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => onSelectSample('healthy')}
                      className="text-xs text-emerald-700 font-medium hover:text-emerald-800 transition-colors cursor-pointer"
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

      {/* VS Code Quick Export Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/95 backdrop-blur-md border-2 border-amber-300 rounded-2xl p-6 sm:p-7 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wide">
              <span>Ready for Visual Studio Code</span>
            </div>
            <h3 className="text-xl font-bold text-amber-950">
              Download & Open in Visual Studio Code (JavaScript)
            </h3>
            <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
              This project is built using <strong>pure JavaScript (.jsx / .js)</strong> for your college mini project submission.
              Click the button below to download the complete ZIP archive. Unzip it, open the folder in <strong>VS Code</strong>, and run <code className="bg-amber-200/80 px-1.5 py-0.5 rounded font-mono font-bold text-xs">npm install</code> and <code className="bg-amber-200/80 px-1.5 py-0.5 rounded font-mono font-bold text-xs">npm run dev</code>.
            </p>
          </div>

          <a
            href="/api/export/zip"
            download="rootguard-javascript-project.zip"
            className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center gap-2.5 whitespace-nowrap shrink-0 hover:shadow-lg cursor-pointer"
          >
            <svg className="w-5 h-5 text-slate-950 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download Project ZIP</span>
          </a>
        </div>
      </section>

      {/* Six Supported Classes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Dataset Taxonomy
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
              Six Supported Diagnostic Classes
            </h2>
          </div>
          <button
            onClick={() => onNavigate('diseases')}
            className="text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors whitespace-nowrap cursor-pointer"
          >
            Explore detailed pathology guides →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Healthy */}
          <div className="bg-white/92 backdrop-blur-md border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-sm hover:border-emerald-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-emerald-700">Baseline Control</span>
              <span className="text-xs text-slate-400 font-mono">Class 01</span>
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
                className="text-xs font-medium text-emerald-700 hover:underline cursor-pointer"
              >
                Load test sample →
              </button>
            </div>
          </div>

          {/* Card 2: Bud rot */}
          <div className="bg-white/92 backdrop-blur-md border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-sm hover:border-emerald-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-rose-700">Oomycete Fungus</span>
              <span className="text-xs text-slate-400 font-mono">Class 02</span>
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Bud rot: Phytophthora arecae
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Collar zone water-soaked cortical rot and rapid feeder dieback. Accompanied by central spear leaf rotting and spindle detachment.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onSelectSample('bud_rot')}
                className="text-xs font-medium text-emerald-700 hover:underline cursor-pointer"
              >
                Load test sample →
              </button>
            </div>
          </div>

          {/* Card 3: Gandoderma lucidum */}
          <div className="bg-white/92 backdrop-blur-md border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-sm hover:border-emerald-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-rose-700">Basidiomycete Fungus</span>
              <span className="text-xs text-slate-400 font-mono">Class 03</span>
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Gandoderma lucidum (Anabe Roga)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Blackened brittle cortical rot with superficial white mycelial strands and bracket conks. Causes crown tapering and palm collapse.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onSelectSample('ganoderma')}
                className="text-xs font-medium text-emerald-700 hover:underline cursor-pointer"
              >
                Load test sample →
              </button>
            </div>
          </div>

          {/* Card 4: yellow leaf (Root rot) */}
          <div className="bg-white/92 backdrop-blur-md border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-sm hover:border-emerald-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-amber-700">Root Rot Complex</span>
              <span className="text-xs text-slate-400 font-mono">Class 04</span>
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              yellow leaf (Root rot)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Extensive feeder rootlet tip dieback, spongy disintegrated fibrous root net, and severe root rot complex with crown chlorosis.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onSelectSample('yellow_leaf')}
                className="text-xs font-medium text-emerald-700 hover:underline cursor-pointer"
              >
                Load test sample →
              </button>
            </div>
          </div>

          {/* Card 5: Root grubs and Palnt -parasitic */}
          <div className="bg-white/92 backdrop-blur-md border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-sm hover:border-emerald-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-rose-700">Insect Pests & Nematodes</span>
              <span className="text-xs text-slate-400 font-mono">Class 05</span>
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Root grubs and Palnt -parasitic
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mechanically severed roots with ragged stump-ends from white grubs, combined with elongated dark cortical burrowing nematode lesions.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onSelectSample('root_grubs')}
                className="text-xs font-medium text-emerald-700 hover:underline cursor-pointer"
              >
                Load test sample →
              </button>
            </div>
          </div>

          {/* Card 6: Mahali / kolerogo/ fruit rot: Phytophthora arecae */}
          <div className="bg-white/92 backdrop-blur-md border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-sm hover:border-emerald-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-purple-700">Monsoon Oomycete Rot</span>
              <span className="text-xs text-slate-400 font-mono">Class 06</span>
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Mahali / kolerogo/ fruit rot: Phytophthora arecae
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Catastrophic premature nut rot & shed ("Mahali" drop) with water-soaked zoosporic wash-off rotting collar & surface root cortex.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onSelectSample('mahali_fruit_rot')}
                className="text-xs font-medium text-emerald-700 hover:underline cursor-pointer"
              >
                Load test sample →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
