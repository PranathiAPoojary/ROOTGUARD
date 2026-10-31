# ROOTGUARD – System Architecture & Engineering Documentation

## 1. System Overview
**RootGuard** is an AI-driven agricultural diagnostic platform designed exclusively for **Arecanut (Areca catechu)** palm roots. It provides early detection, out-of-distribution invalid image rejection, automated root region extraction, adaptive 3x3 grid patch analysis, independent severity risk estimation, and ICAR-CPCRI agronomic treatment plans.

---

## 2. System Architecture Diagram

```
+-----------------------------------------------------------------------------------+
|                                 USER LAYER                                        |
|  +---------------------+   +-----------------------+   +-----------------------+  |
|  |   Farmer Interface  |   | Agricultural Officer  |   | Student / Researcher  |  |
|  +----------+----------+   +-----------+-----------+   +-----------+-----------+  |
+-------------|--------------------------|---------------------------|--------------+
              |                          |                           |
              v                          v                           v
+-----------------------------------------------------------------------------------+
|                                PRESENTATION TIER                                  |
|   React 19 SPA + Tailwind CSS v4 + Motion + Lucide                                |
|   - Image Drag & Drop Uploader with EXIF / Quality Pre-check                      |
|   - Diagnostic Console (Root Segmentation, Adaptive Grid Heatmap, Risk Gauges)    |
|   - ICAR-CPCRI Agronomic Prescription & Printable Report Generator                |
|   - Historical Audit Trail & Disease Knowledge Library                            |
+----------------------------------------+------------------------------------------+
                                         | REST API (JSON / HTTP)
                                         v
+-----------------------------------------------------------------------------------+
|                                APPLICATION SERVER                                 |
|   Full-Stack Express / Node.js Engine (with Python Subprocess Core)               |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  | 1. Image Ingestion & Strict Botanical Validation Pipeline                   |  |
|  |    - Resolution (>200x200), Sharpness (Laplacian var > 25.0)                |  |
|  |    - Luminance Range (30-235), Green Foliage Ratio (< 40%)                  |  |
|  |    - Monocot Fibrous Cylindrical Root vs Dicot / Non-Root Classifier        |  |
|  |    - Out-of-Distribution (OOD) Filter -> Rejection Message                  |  |
|  +-----------------------------------------------------------------------------+  |
|  | 2. Automated Root Detection & Segmentation Engine                           |  |
|  |    - Background Subtraction & Foreground Bounding Box Isolation            |  |
|  |    - 3x3 Adaptive Grid Patch Decomposition                                  |  |
|  |    - Patch-level Necrosis Index & Mycelial Mat Evaluation                   |  |
|  +-----------------------------------------------------------------------------+  |
|  | 3. Vedic Mathematics Computational Acceleration Module                      |  |
|  |    - Nikhilam Sutra: Base-multiplication for Intensity Scaling             |  |
|  |    - Urdhva Tiryagbhyam: Vertically & Crosswise MAC Operator for Filters     |  |
|  |    - Micro-benchmark comparison vs IEEE 754 Standard Arithmetic             |  |
|  +-----------------------------------------------------------------------------+  |
|  | 4. Disease Inference & Severity Assessment Model                            |  |
|  |    - 6 Supported Diagnostic Classes                                         |  |
|  |    - Independent Severity Level (Low, Moderate, High Risk, or Healthy)      |  |
|  |    - Confidence Threshold Gate (< 60% triggers rejection)                   |  |
|  +-----------------------------------------------------------------------------+  |
+----------------------------------------+------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                                  DATA TIER                                        |
|   SQLite Relational Database (database/rootguard.db)                              |
|   - Tables: users, predictions, disease_information, uploaded_images,             |
|             dataset_images, model_metrics, vedic_math_benchmarks                  |
+-----------------------------------------------------------------------------------+
```

---

## 3. Data Flow Diagram (DFD Level 1)

```
[Farmer / User] 
       │ 1. Uploads close-up root photograph
       ▼
(Process 1.0: Image Validation)
       ├──> Sharpness < 25 or Non-Root Organ? ──> [Reject: "INVALID IMAGE – Upload Arecanut root"]
       │
       ▼ (Valid Arecanut Root)
(Process 2.0: Automated ROI & Segmentation)
       ├──> Isolate root boundary
       ├──> Mask soil & extraneous background
       ├──> Subdivide into 3x3 Adaptive Grid
       │
       ▼
(Process 3.0: Vedic MAC Patch Analysis & CNN Inference)
       ├──> Urdhva Tiryagbhyam spatial feature convolution
       ├──> Compute patch necrosis index
       ├──> Aggregate regional weights into disease probability vector
       │
       ▼
(Process 4.0: Risk & Severity Assessment)
       ├──> Evaluate affected root volume percentage
       ├──> Assign Severity: LOW (<15%), MODERATE (15-40%), HIGH (>40%), HEALTHY (0%)
       │
       ▼
(Process 5.0: DB Persistence & Recommendation Retrieval)
       ├──> Query ICAR-CPCRI agronomic guidelines from disease_information table
       ├──> Insert diagnostic audit record into predictions table
       │
       ▼
[Results Presentation Layer: Report, Visual Heatmap, Treatment Steps]
```

---

## 4. Entity-Relationship (ER) Schema

```
+--------------------+        +---------------------+
|       users        |        |   uploaded_images   |
+--------------------+        +---------------------+
| id (PK)            | 1    * | id (PK)             |
| username           +--------+ file_name           |
| full_name          |        | file_path           |
| role               |        | file_size_bytes     |
| location           |        | is_arecanut_root    |
| created_at         |        | quality_score       |
+---------+----------+        +----------+----------+
          | 1                            | 1
          |                              |
          | *                            | *
+---------v------------------------------v----------+
|                   predictions                     |
+---------------------------------------------------+
| id (PK)                                           |
| prediction_uuid (UNIQUE)                          |
| user_id (FK -> users.id)                          |
| image_id (FK -> uploaded_images.id)               |
| file_name                                         |
| predicted_class                                   |
| disease_name                                      |
| confidence_score                                  |
| severity_level                                    |
| severity_explanation                              |
| symptoms_detected (JSON)                          |
| affected_area_percentage                          |
| processing_time_ms                                |
| vedic_convolution_used                            |
| created_at                                        |
+---------------------------------------------------+

+-------------------------------------+   +------------------------------------+
|         disease_information         |   |           model_metrics            |
+-------------------------------------+   +------------------------------------+
| id (PK)                             |   | id (PK)                            |
| disease_key (UNIQUE)                |   | model_version                      |
| name                                |   | architecture                       |
| vernacular_name (Kannada)           |   | training_accuracy                  |
| causal_agent                        |   | validation_accuracy                |
| category                            |   | test_accuracy                      |
| root_symptoms                       |   | precision_score                    |
| canopy_symptoms                     |   | recall_score                       |
| favorable_conditions                |   | f1_score                           |
| preventive_measures                 |   | confusion_matrix_json              |
| cultural_practices                  |   | is_active                          |
| recommended_treatments              |   +------------------------------------+
| chemical_controls                   |
| expert_consultation_triggers        |   +------------------------------------+
| citation_source (ICAR-CPCRI / TNAU) |   |       vedic_math_benchmarks        |
+-------------------------------------+   +------------------------------------+
                                          | id (PK)                            |
                                          | sutra_name                         |
                                          | operations_count                   |
                                          | vedic_latency_ms                   |
                                          | conventional_latency_ms            |
                                          | accuracy_percentage                |
                                          | numerical_drift                    |
                                          +------------------------------------+
```

---

## 5. Vedic Mathematics Implementation Rationale

Vedic Mathematics algorithms originate from the ancient Indian mathematical treatises reconstructed by Swami Bharati Krishna Tirtha. In this project:

1. **Nikhilam Navatashcaramam Dashatah ("All from 9 and the last from 10")**:
   - Used in feature normalisation offsets where numbers are subtracted from a common baseline (power of 10 or working base).
   - Reduces multi-bit subtraction into direct complement mapping.
   - Formula: $(B + d_1)(B + d_2) = B(B + d_1 + d_2) + d_1 d_2$.

2. **Urdhva Tiryagbhyam ("Vertically and Crosswise")**:
   - Fundamental universal multiplication sutra.
   - Ideal for 2D spatial image convolution and matrix Multiply-Accumulate (MAC) units.
   - Replaces traditional multi-stage shift-and-add trees with columnar parallel cross-multiplications.

**Academic Honesty Disclosure**:
Standard x86/ARM CPUs execute multiplication using dedicated hardware multiplier circuits in single-digit clock cycles. The practical real-world advantage of Vedic algorithms emerges primarily in **ASIC and FPGA hardware architectures** (such as low-power edge IoT devices deployed in agricultural orchards), where Vedic multipliers save up to 25–40% silicon area and dynamic switching power compared to conventional Wallace-tree multipliers.

---

## 6. Sustainable Development Goals (SDG) Alignment

- **SDG 2: Zero Hunger (Target 2.3 & 2.4)**: Protects smallholder farmer livelihood and yield security in palm plantations across South and Southeast Asia.
- **SDG 12: Responsible Consumption and Production (Target 12.4)**: Minimizes indiscriminate chemical pesticide and fungicide application by guiding farmers towards targeted biological controls (*Trichoderma harzianum*, *Pseudomonas fluorescens*).
- **SDG 15: Life on Land (Target 15.3)**: Combats soil pathogen infestation, prevents soil degradation, and fosters soil microbial health through organic root basin management.
