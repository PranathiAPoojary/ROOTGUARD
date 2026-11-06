import React from 'react';

export function AboutView() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
          <span>Engineering Project Compendium</span>
          <span aria-hidden="true">·</span>
          <span>College Viva & Academic Documentation · JavaScript Edition</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          About Project RootGuard
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          An engineering solution targeting the early detection of devastating subterranean pathologies in Arecanut (Areca catechu) plantations using computer vision, deep learning, and Vedic mathematical computational principles.
        </p>
      </div>

      {/* Project Objectives & Core Architecture */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm">
            01
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Problem Statement & Motivation
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Arecanut is a high-value commercial plantation crop supporting over 1.2 million farm families in Karnataka, Kerala, Assam, and Tamil Nadu.
            Subterranean root disorders—such as <em>Ganoderma</em> Foot Rot (Anabe Roga), <em>Fusarium</em> decay, and <em>Leucopholis</em> root grubs—operate covertly beneath the soil.
            By the time visible crown yellowing or trunk bleeding occurs, over 60–80% of the fibrous root system is already destroyed, leading to fatal tree death and huge economic losses.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm">
            02
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Engineered Innovations in RootGuard
          </h2>
          <ul className="space-y-2 text-xs text-slate-600 leading-relaxed list-disc list-inside">
            <li>
              <strong>Strict Botanical In-Distribution Guard:</strong> Rejects leaves, coconut roots, fruits, and clutter rather than forcing an invalid image into a disease class.
            </li>
            <li>
              <strong>Automated Root Segmentation:</strong> Background soil suppression eliminates diagnostic confusion caused by varying soil moisture or mud.
            </li>
            <li>
              <strong>3x3 Adaptive Grid Decomposition:</strong> Prevents whole-image bias by assessing necrotic severity across nine discrete anatomical sub-regions.
            </li>
            <li>
              <strong>Integrated Vedic Multipliers:</strong> Implements Nikhilam and Urdhva Tiryagbhyam sutras for high-efficiency feature matrix transformations.
            </li>
            <li>
              <strong>100% Pure JavaScript Architecture:</strong> Fully built with JavaScript (.jsx frontend + Node.js backend) for university submission compatibility.
            </li>
          </ul>
        </div>
      </section>

      {/* Dataset Specifications */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">
          Curated Dataset Specification & Classes
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          The machine learning classification pipeline is calibrated against six core target categories:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs pt-2">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-emerald-800">1. Healthy Arecanut Roots</span>
            <p className="text-slate-500 text-[11px]">Normal control with ivory-white feeder tips</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-rose-800">2. Bud rot: Phytophthora arecae</span>
            <p className="text-slate-500 text-[11px]">Water-soaked collar softening and spear leaf necrosis</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-rose-800">3. Gandoderma lucidum</span>
            <p className="text-slate-500 text-[11px]">Anabe Roga foot rot with black cortical decomposition</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-amber-800">4. yellow leaf (Root rot)</span>
            <p className="text-slate-500 text-[11px]">Phytoplasma-associated feeder dieback & rotting</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-rose-800">5. Root grubs & Parasitic Nematodes</span>
            <p className="text-slate-500 text-[11px]">Chewed root cylinders and burrowing nematode lesions</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="font-bold text-purple-800">6. Mahali / fruit rot: P. arecae</span>
            <p className="text-slate-500 text-[11px]">Monsoon zoosporic wash-off rotting collar & surface roots</p>
          </div>
        </div>
      </section>
    </div>
  );
}
