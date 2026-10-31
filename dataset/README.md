# ROOTGUARD – Arecanut Root Disease Dataset Specification

## 1. Scope & Botanical Integrity
This dataset is strictly restricted to **Areca catechu (Arecanut Palm)** root systems.
It excludes all other palm or fruit root systems (coconut, oil palm, banana rhizomes, mango) as well as leaves, stems, nuts, and unrelated flora.

## 2. Directory Layout & Classification Classes

| Directory Name | Target Condition | Causal Organism / Etiology | Source Institution Reference |
| :--- | :--- | :--- | :--- |
| `dataset/healthy_arecanut_roots/` | Healthy Arecanut Roots | Baseline physiological condition | ICAR-CPCRI Regional Station, Vittal |
| `dataset/ganoderma_root_rot/` | Ganoderma Root and Foot Rot | *Ganoderma lucidum / G. applanatum* | CPCRI Kasaragod / UHS Bagalkot |
| `dataset/fusarium_root_decay/` | Fusarium Feeder Root Decay | *Fusarium oxysporum / F. solani* | TNAU Dept of Plant Pathology |
| `dataset/yellow_leaf_root_damage/`| Yellow Leaf Disease Root Necrosis | *Phytoplasma* (Vector: *Proutista moesta*) | CPCRI Research Centre, Sringeri / Kidu |
| `dataset/root_grub_damage/` | Root Grub Damage (White Grub) | *Leucopholis burmeisteri* | AICRP on Palms, Karnataka |
| `dataset/nematode_root_damage/` | Nematode-Associated Root Damage | *Radopholus similis / Meloidogyne incognita* | ICAR-CPCRI Nematology Section |
| `dataset/invalid_images/` | Out-of-Distribution Rejection Set | Leaves, fruits, non-arecanut roots, objects | Field Control Negatives |

## 3. Dataset Target Size & Ethical Standard
- Target size: 200–500 expert-verified field images per category.
- Anti-fabrication protocol: No synthetic or hallucinated photographs are labeled as genuine research specimens.
- Licensing: CC-BY-NC 4.0 for non-commercial academic research under university supervision.

## 4. Train / Validation / Test Split Protocol
- 70% Training Set
- 15% Validation Set
- 15% Hold-out Testing Set
- Stratified splitting by orchard plot to eliminate data leakage from identical root specimens.
- Data augmentation (rotation ±15°, horizontal flip, subtle brightness adjustment ±10%) applied **strictly** to the training split.
