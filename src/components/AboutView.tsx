import React from 'react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
          <span>Engineering Project Compendium</span>
          <span aria-hidden="true">·</span>
          <span>College Viva & Academic Documentation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          About Project RootGuard
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          An engineering solution targeting the early detection of devastating subterranean pathologies in Arecanut (Areca catechu) plantations using computer vision and Vedic mathematical computational principles.
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
          </ul>
        </div>
      </section>

      {/* Sustainable Development Goals (SDG) */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Global Impact Framework
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Alignment with UN Sustainable Development Goals (SDGs)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* SDG 2 */}
          <div className="p-5 rounded-xl border border-amber-200 bg-amber-50/50 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <span className="font-bold text-sm text-slate-900">Zero Hunger</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Protects smallholder farmers against sudden multi-acre plantation loss from Anabe Roga, securing rural livelihood and agricultural income stability (Target 2.3).
            </p>
          </div>

          {/* SDG 12 */}
          <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
                12
              </span>
              <span className="font-bold text-sm text-slate-900">Responsible Production</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Replaces blind preventative chemical fungicide dumping with targeted biological controls (<em>Trichoderma harzianum</em>, <em>Pseudomonas fluorescens</em>) and soil amendments (Target 12.4).
            </p>
          </div>

          {/* SDG 15 */}
          <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/50 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                15
              </span>
              <span className="font-bold text-sm text-slate-900">Life on Land</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Restores rhizosphere microbiome equilibrium and combats soil pest colonization through organic mulching, sunn hemp green manuring, and nematode biological management (Target 15.3).
            </p>
          </div>
        </div>
      </section>

      {/* College Viva Questions & Answers Panel */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            College Viva Voce Preparation
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Frequently Asked Project Defense Questions
          </h2>
        </div>

        <div className="space-y-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl space-y-2">
            <div className="font-bold text-slate-900 text-sm">
              Q1: Why does RootGuard strictly analyse Arecanut roots and reject leaves or coconut roots?
            </div>
            <p className="text-slate-600 leading-relaxed">
              <strong>Answer:</strong> Subterranean pathologies like <em>Ganoderma lucidum</em> manifest specific cortical browning, vascular stele discoloration, and fibrous core hollowing that are unique to the monocot fibrous root cylinder of <em>Areca catechu</em>. Broad leaves display non-specific yellowing that could be caused by drought, nutrition deficiency, or mites. By focusing strictly on washed root specimens and rejecting non-root organs or non-arecanut species, we prevent false positive misclassifications.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl space-y-2">
            <div className="font-bold text-slate-900 text-sm">
              Q2: How is Vedic Mathematics integrated into the computer vision pipeline?
            </div>
            <p className="text-slate-600 leading-relaxed">
              <strong>Answer:</strong> We implement two Vedic Sutras in <code className="font-mono text-emerald-800">backend/vedic_math.py</code>: <em>Nikhilam</em> (for base-offset intensity normalization and coordinate scaling) and <em>Urdhva Tiryagbhyam</em> (vertically and crosswise operator for 2D spatial convolution and Multiply-Accumulate [MAC] filter operations). While standard x86 CPUs execute multiplication in hardware ALUs, Vedic algorithms drastically reduce gate counts and power consumption when implemented in FPGA/ASIC edge diagnostic hardware for solar-powered farm sensors.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl space-y-2">
            <div className="font-bold text-slate-900 text-sm">
              Q3: Why use a 3x3 Adaptive Grid instead of classifying the entire image directly?
            </div>
            <p className="text-slate-600 leading-relaxed">
              <strong>Answer:</strong> Early stage root infections are localized (e.g., grub chew marks in the upper crown zone or fungal conk filaments in the lower basin). A global whole-image CNN classifier can miss subtle localized lesions when averaged across the whole frame. The 3x3 adaptive grid isolates nine discrete patches, computes patch-level necrosis indices, and pools regional attention to provide both accurate overall diagnosis and an independent, justifiable severity rating.
            </p>
          </div>
        </div>
      </section>

      {/* Institutional Acknowledgments */}
      <section className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="font-semibold text-slate-700">Grounded in Research Standards:</span>
          <p className="text-slate-500 mt-0.5">
            ICAR-Central Plantation Crops Research Institute (CPCRI), Tamil Nadu Agricultural University (TNAU), University of Horticultural Sciences (UHS) Bagalkot.
          </p>
        </div>
        <div className="font-mono text-[11px] text-slate-400 shrink-0">
          RootGuard Academic Mini-Project v1.4
        </div>
      </section>
    </div>
  );
};
