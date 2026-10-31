import React, { useState, useEffect } from 'react';
import { HistoryItem, ViewMode } from '../types';

interface HistoryViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ onNavigate }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

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
            <span>Relational SQL Persistence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Prediction History & Records
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Logged specimen diagnoses with confidence scores, risk categories, and processing durations.
          </p>
        </div>

        <button
          onClick={() => onNavigate('diagnostic')}
          className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors whitespace-nowrap self-start sm:self-auto"
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
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    No previous predictions recorded yet. Run a root analysis to generate audit logs.
                  </td>
                </tr>
              ) : (
                history.map((item) => {
                  const isHealthy = item.predicted_class === 'healthy_arecanut_roots';
                  const isHigh = item.severity_level === 'HIGH RISK';

                  return (
                    <tr
                      key={item.prediction_uuid}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono text-slate-500 whitespace-nowrap">
                        {item.created_at}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap max-w-[200px] truncate">
                        {item.file_name}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-900 whitespace-nowrap">
                        {item.disease_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                            isHealthy
                              ? 'bg-emerald-100 text-emerald-800'
                              : isHigh
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.severity_level}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono tabular-nums text-slate-700 whitespace-nowrap">
                        {item.confidence_score}%
                      </td>
                      <td className="px-6 py-4 font-mono tabular-nums text-slate-700 whitespace-nowrap">
                        {item.affected_area_percentage}%
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
                        >
                          View Findings
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Item Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-400">
                  {selectedItem.prediction_uuid}
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                  {selectedItem.disease_name}
                </h2>
                <div className="text-xs text-slate-500 font-mono">
                  Captured: {selectedItem.created_at} · Latency: {selectedItem.processing_time_ms}ms
                </div>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Risk Assessment:</span>
                <span className="font-bold text-slate-900">{selectedItem.severity_level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Classification Confidence:</span>
                <span className="font-mono text-slate-900 font-bold">{selectedItem.confidence_score}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Affected Root Zone:</span>
                <span className="font-mono text-slate-900">{selectedItem.affected_area_percentage}% volume</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-semibold text-slate-900">
                Severity Level Explanation
              </div>
              <p className="text-slate-600 leading-relaxed bg-amber-50/50 p-3 rounded-lg border border-amber-100">
                {selectedItem.severity_explanation}
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-semibold text-slate-900">
                Symptoms Documented
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                {selectedItem.symptoms_detected.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
