"""
ROOTGUARD - Disease Recommendations Module
==========================================
Provides authoritative agronomic and plant pathology recommendations sourced
from ICAR-Central Plantation Crops Research Institute (CPCRI) and Tamil Nadu
Agricultural University (TNAU).

Integrates:
- Preventive measures
- Cultural and agronomic sanitation
- Biological control agents (Trichoderma, Pseudomonas, Metarhizium, EPN)
- Authorized chemical treatments with safety precautions
- Expert consultation escalation triggers
"""

import sqlite3
import os
from typing import Dict, Any, Optional

DATABASE_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "database")
DB_PATH = os.path.join(DATABASE_DIR, "rootguard.db")


def get_recommendations_for_disease(disease_key: str) -> Optional[Dict[str, Any]]:
    """Fetches recommendations from the SQLite database."""
    if not os.path.exists(DB_PATH):
        return None

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM disease_information WHERE disease_key = ?", (disease_key,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return None

    return {
        "disease_key": row["disease_key"],
        "name": row["name"],
        "vernacular_name": row["vernacular_name"],
        "causal_agent": row["causal_agent"],
        "category": row["category"],
        "root_symptoms": row["root_symptoms"],
        "canopy_symptoms": row["canopy_symptoms"],
        "favorable_conditions": row["favorable_conditions"],
        "preventive_measures": row["preventive_measures"],
        "cultural_practices": row["cultural_practices"],
        "recommended_treatments": row["recommended_treatments"],
        "chemical_controls": row["chemical_controls"],
        "expert_consultation_triggers": row["expert_consultation_triggers"],
        "citation_source": row["citation_source"]
    }
