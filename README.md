# ROOTGUARD
### AI-Based Early Prediction of Arecanut Root Diseases Using Vedic Mathematics
**Academic Engineering Capstone / Mini-Project**

---

## 1. Executive Summary & Strict Scope
**RootGuard** is an end-to-end, academic-grade artificial intelligence and computer vision diagnostic system created exclusively for **Arecanut Palm (Areca catechu)** root systems.

### Strict Scope Enforcement
- **Target Plant:** *Areca catechu* (Arecanut / Betel Nut Palm) only.
- **Target Organ:** Washed, uprooted subterranean root systems only.
- **Strict Rejection:** Rejects leaves, stems, nuts, coconut roots, banana rhizomes, mango roots, animals, human images, and non-root objects.
- **Out-of-Distribution Warning:** Displays `"INVALID IMAGE – Please upload a clear image of an Arecanut plant root."` if unsupported subjects, severe blur, or extreme exposure are detected.

---

## 2. Six Diagnostic Root Problem Categories
1. **Healthy Arecanut Roots** – Firm fibrous reddish-brown roots with clean ivory-white feeder tips.
2. **Ganoderma Root and Foot Rot (Anabe Roga)** (*Ganoderma lucidum / G. applanatum*) – Brittle black cortical rot with fungal mycelial strands.
3. **Fusarium Root Decay** (*Fusarium oxysporum / F. solani*) – Soft reddish-brown rot with sloughing cortex and internal vascular browning.
4. **Yellow Leaf Disease-Associated Root Damage** (*Phytoplasma*) – Feeder tip necrosis, spongy disintegrated fibrous root net, and nutrient transport failure.
5. **Root Grub Damage (White Grub)** (*Leucopholis burmeisteri*) – Transversely severed roots and chewed stump-ends causing palm loosening.
6. **Nematode-Associated Root Damage** (*Radopholus similis / Meloidogyne incognita*) – Reddish-black cortical lesions, cavity formation, and root galls.

---

## 3. Technology Stack
- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons.
- **Backend:** Python 3.10+ (Flask REST API) + Node.js / Express hybrid server.
- **Computer Vision:** Automated ROI bounding box, background soil suppression, adaptive 3x3 grid decomposition, patch-level necrosis scoring.
- **Artificial Intelligence:** MobileNetV2 transfer learning backbone + dense classifier with cross-entropy loss.
- **Vedic Mathematics:** `backend/vedic_math.py` implementing *Nikhilam Navatashcaramam Dashatah* and *Urdhva Tiryagbhyam* sutras for feature matrix transformations and convolution MAC acceleration.
- **Database:** SQLite (`database/rootguard.db`) with 7 relational tables: `users`, `predictions`, `disease_information`, `uploaded_images`, `dataset_images`, `model_metrics`, `vedic_math_benchmarks`.

---

## 4. Complete Project Directory Structure
```
ROOTGUARD/
│
├── frontend/ (and root SPA)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── HomeView.tsx
│   │   │   ├── DiagnosticView.tsx
│   │   │   ├── VisualRootInspector.tsx
│   │   │   ├── DiseaseLibraryView.tsx
│   │   │   ├── HistoryView.tsx
│   │   │   ├── ResearchMetricsView.tsx
│   │   │   ├── AboutView.tsx
│   │   │   └── Footer.tsx
│   │   ├── types/index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
│
├── backend/
│   ├── app.py                      # Complete Flask REST API server
│   ├── vedic_math.py               # Pure Vedic Mathematics module (Nikhilam & Urdhva)
│   ├── image_validation.py         # Out-of-distribution & Arecanut root validator
│   ├── disease_prediction.py       # Adaptive grid & severity inference engine
│   ├── recommendations.py          # ICAR-CPCRI agronomic advisory fetcher
│   ├── database/
│   │   └── init_db.py              # SQLite schema creation & seed script
│   └── requirements.txt            # Python dependencies
│
├── dataset/
│   ├── healthy_arecanut_roots/
│   ├── ganoderma_root_rot/
│   ├── fusarium_root_decay/
│   ├── yellow_leaf_root_damage/
│   ├── root_grub_damage/
│   ├── nematode_root_damage/
│   ├── invalid_images/
│   ├── dataset_manifest.json       # Genuine 2,060 specimen registry
│   └── README.md
│
├── training/
│   ├── train.py                    # CNN model training script
│   ├── evaluate.py                 # Confusion matrix & metric evaluator
│   └── preprocess.py               # Dataset splitting and augmentation
│
├── database/
│   └── rootguard.db                # SQLite database file
│
├── documentation/
│   └── ARCHITECTURE.md             # System architecture, DFD, ER diagram, Vedic math
│
├── start_rootguard.bat             # 1-click Windows startup script
├── start_rootguard.sh              # 1-click Linux/macOS startup script
├── server.ts                       # Full-stack Node + Express runtime bridge
├── README.md
└── metadata.json
```

---

## 5. Local Execution Instructions (Windows & VS Code)

### Prerequisites:
1. **Python 3.10+** (download from https://www.python.org/downloads/ - check "Add Python to PATH" during installation).
2. **Node.js 18+** (download from https://nodejs.org/).

### Quick Startup (Windows):
Double-click `start_rootguard.bat` in the project root folder.
Or run in VS Code Integrated Terminal (`Ctrl + ~`):
```cmd
.\start_rootguard.bat
```

### Manual Step-by-Step Startup:
1. **Install Node dependencies:**
   ```bash
   npm install
   ```
2. **Initialize SQLite Database:**
   ```bash
   python backend/database/init_db.py
   ```
3. **Start the Full-Stack Application:**
   ```bash
   npm run dev
   ```
   Open your browser to: **http://localhost:3000**

---

## 6. Standalone Python Flask Backend Execution
If running purely in Python mode on port 5000:
```bash
pip install -r backend/requirements.txt
python backend/database/init_db.py
python backend/app.py
```
Backend API will run at `http://127.0.0.1:5000`.

---

## 7. Model Training Pipeline
To retrain or evaluate the CNN classifier with new verified field photographs:
```bash
python training/train.py --epochs 25 --batch-size 16 --dataset-dir dataset/
python training/evaluate.py
```

---

## 8. Vedic Mathematics Benchmarking & Verification
Run the Vedic Mathematics standalone benchmark:
```bash
python backend/vedic_math.py --benchmark
```
- **Nikhilam Sutra:** Evaluated on intensity normalization scaling ($100\%$ numerical identity, zero drift).
- **Urdhva Tiryagbhyam:** Evaluated on 2D spatial convolution and MAC operators ($100\%$ numerical identity, zero drift).

---

## 9. Academic Viva Voce Defense Checklist
- **Why Arecanut roots only?** Underground pathologies exhibit distinct cortical browning and vascular stele discoloration only on *Areca catechu* monocot root cylinders. Foliar symptoms are non-specific and appear too late.
- **Why a 3x3 adaptive grid?** Infection starts in localized pockets. Whole-image global averaging can mask early lesions. Sub-region patch analysis localizes decay and yields an independent, justifiable severity rating.
- **How does severity differ from confidence?** Confidence represents classification probability ($0–100\%$). Severity represents physical root damage volume:
  - **Healthy:** $0\%$ damage.
  - **Low Risk:** $<15\%$ affected volume.
  - **Moderate Risk:** $15–40\%$ affected volume.
  - **High Risk:** $>40\%$ extensive root decay.
