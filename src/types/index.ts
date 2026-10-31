export type ViewMode =
  | 'home'
  | 'diagnostic'
  | 'diseases'
  | 'history'
  | 'research'
  | 'about';

export type SeverityLevel = 'HEALTHY' | 'LOW RISK' | 'MODERATE RISK' | 'HIGH RISK' | 'UNKNOWN';

export interface GridPatch {
  patch_id: string;
  row: number;
  col: number;
  bounding_box: [number, number, number, number];
  necrosis_index: number;
  is_suspicious: boolean;
  tissue_status: string;
  prominent_feature: string;
}

export interface AdaptiveGridAnalysis {
  grid_dimensions: [number, number];
  total_patches: number;
  suspicious_patches_count: number;
  patches: GridPatch[];
}

export interface DiseaseInfo {
  disease_key: string;
  name: string;
  vernacular_name?: string;
  causal_agent: string;
  category: string;
  root_symptoms: string;
  canopy_symptoms: string;
  favorable_conditions: string;
  preventive_measures: string;
  cultural_practices: string;
  recommended_treatments: string;
  chemical_controls: string;
  expert_consultation_triggers: string;
  citation_source: string;
}

export interface PipelineStageInfo {
  stage_number: number;
  name: string;
  description: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'FAILED';
  metrics?: Record<string, any>;
}

export interface PredictionResult {
  predicted_class: string;
  disease_name: string;
  confidence_percentage: number;
  severity_level: SeverityLevel;
  severity_explanation: string;
  affected_root_volume_percentage: number;
  symptoms_detected: string[];
  root_detection: {
    root_detected: boolean;
    bounding_box: [number, number, number, number];
    background_removed: boolean;
    segmentation_method: string;
    root_mask_coverage_pct?: number;
  };
  adaptive_grid_analysis: AdaptiveGridAnalysis;
  pipeline_stages?: PipelineStageInfo[];
  vedic_optimization?: {
    mac_kernel_sutra: string;
    scale_normalization_sutra: string;
    convolution_mac_operations: number;
    numerical_discrepancy: number;
  };
}

export interface HistoryItem {
  id: number;
  prediction_uuid: string;
  file_name: string;
  image_url: string;
  predicted_class: string;
  disease_name: string;
  confidence_score: number;
  severity_level: SeverityLevel;
  severity_explanation: string;
  affected_area_percentage: number;
  symptoms_detected: string[];
  processing_time_ms: number;
  vedic_convolution_used: boolean;
  created_at: string;
}

export interface ModelMetricsData {
  trained: boolean;
  model_version: string;
  architecture: string;
  training_accuracy: number;
  validation_accuracy: number;
  test_accuracy: number;
  precision_score: number;
  recall_score: number;
  f1_score: number;
  loss_val: number;
  confusion_matrix: number[][];
  class_labels: string[];
  dataset_distribution: Record<string, number>;
}

export interface VedicBenchmarkData {
  status: string;
  benchmark_timestamp: string;
  total_operations_evaluated: number;
  mathematical_correctness: {
    nikhilam_accuracy_pct: number;
    urdhva_accuracy_pct: number;
    convolution_accuracy_pct: number;
    numerical_discrepancy: number;
    verified: boolean;
  };
  nikhilam_sutra: {
    sutra_name: string;
    english_translation: string;
    target_pipeline: string;
    test_cases: number;
    iterations: number;
    vedic_execution_time_ms: number;
    conventional_time_ms: number;
    operations_per_second: number;
    algebraic_derivation: string;
  };
  urdhva_tiryagbhyam_sutra: {
    sutra_name: string;
    english_translation: string;
    target_pipeline: string;
    test_cases: number;
    iterations: number;
    vedic_execution_time_ms: number;
    conventional_time_ms: number;
    operations_per_second: number;
    algebraic_derivation: string;
  };
  academic_analysis: string;
}
