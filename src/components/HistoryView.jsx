import React, { useState, useEffect } from 'react';

export function HistoryView({ onNavigate }) {
  const [history, setHistory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch('/api/history')
      .then((res) => res.json())
      .then((data) => {
        if (data.history) {
          setHistory(data.history);
        }
      })
      .catch((err) => console.error('Failed to load history:', err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
            <span>Diagnostic Audit Trail</span>
            <span aria-hidden="true">·</span>
            <span>Relational SQL Persistence · JavaScript Client</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Prediction History & Records
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Logged specimen diagnoses with confidence scores, risk categories, and processing durations.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('diagnostic')}
          className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
        >
          New Root Analysis
        </button>
      </div>

      {/* History Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Specimen File</th>
                <th className="px-6 py-4">Predicted Diagnosis</th>
                <th className="px-6 py-4">Severity Risk</th>
                <th className="px-6 py-4">Confidence</th>
                <th className="px-6 py-4">Affected Area</th>
                <th className="px-6 py-4">Latency</th>
                <th className="px-6 py-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-400">
                    No diagnostic records found. Run a new diagnosis in the console.
                  </td>
                </tr>
              ) : (
                history.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                      {item.created_at}
                    </td>
                    <td className="px-6 py-4 font-mono font-medium text-slate-900 whitespace-nowrap">
                      {item.file_name}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {item.disease_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.severity_level === 'HEALTHY'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.severity_level === 'LOW RISK'
                            ? 'bg-blue-100 text-blue-800'
                            : item.severity_level === 'MODERATE RISK'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-rose-100 text-rose-900'
                        }`}
                      >
                        {item.severity_level}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-slate-800">
                      {item.confidence_score}%
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-600">
                      {item.affected_area_percentage}%
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-500">
                      {item.processing_time_ms} ms
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedItem(item)}
                        className="text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer"
                      >
                        Inspect →
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Item Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase">
                  Prediction Audit Record
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedItem.disease_name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1 font-mono text-[11px]">
                <div>File: <span className="font-bold">{selectedItem.file_name}</span></div>
                <div>UUID: <span className="text-slate-500">{selectedItem.prediction_uuid}</span></div>
                <div>Created: <span className="text-slate-500">{selectedItem.created_at}</span></div>
              </div>

              <div>
                <div className="font-semibold text-slate-700 mb-1">Clinical Severity Rationale:</div>
                <p className="text-slate-600 bg-slate-50 p-3 rounded-lg leading-relaxed">
                  {selectedItem.severity_explanation}
                </p>
              </div>

              <div>
                <div className="font-semibold text-slate-700 mb-1">Observed Symptoms:</div>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  {selectedItem.symptoms_detected?.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
