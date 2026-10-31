"""
ROOTGUARD - Backend Flask REST Application
==========================================
Academic Mini-Project: AI-Based Early Prediction of Arecanut Root Diseases Using Vedic Mathematics.
Provides complete REST APIs for image upload, image validation, disease diagnosis,
severity risk estimation, history tracking, model metrics, and Vedic benchmarks.
"""

import os
import sys
import uuid
import json
import sqlite3
import time
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

from vedic_math import run_vedic_benchmarks, nikhilam_multiply, urdhva_tiryagbhyam_multiply
from image_validation import validate_arecanut_root_image
from disease_prediction import analyze_root_image_pipeline
from recommendations import get_recommendations_for_disease

# Directories
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "database", "rootguard.db")
UPLOADS_DIR = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOADS_DIR, exist_ok=True)

app = Flask(__name__)
CORS(app)


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


@app.route("/api/health", methods=["GET"])
def health_check():
    """System health check and diagnostic status."""
    db_ok = os.path.exists(DB_PATH)
    return jsonify({
        "status": "healthy",
        "service": "RootGuard-Backend-API",
        "database_connected": db_ok,
        "supported_plant_species": "Areca catechu (Arecanut Palm)",
        "organ_focus": "Root Systems Only",
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
    })


@app.route("/api/validate-image", methods=["POST"])
def validate_image_endpoint():
    """
    Validates uploaded image to ensure:
    1. It is a genuine Arecanut (Areca catechu) root image.
    2. It meets resolution, focus, and illumination standards.
    Rejects non-arecanut roots, leaves, fruits, stems, humans, or random objects.
    """
    data = request.get_json() or {}
    validation_result = validate_arecanut_root_image(data)
    status_code = 200 if validation_result["is_valid"] else 400
    return jsonify(validation_result), status_code


@app.route("/api/predict", methods=["POST"])
def predict_endpoint():
    """
    Executes automated root ROI segmentation, 3x3 adaptive grid analysis,
    disease classification, and independent severity estimation.
    """
    start_time = time.perf_counter()
    data = request.get_json() or {}

    # 1. First step: STRICT ARECANUT ROOT IMAGE VALIDATION
    validation_res = validate_arecanut_root_image(data)
    if not validation_res["is_valid"]:
        return jsonify({
            "success": False,
            "error_type": "INVALID_IMAGE",
            "message": validation_res["user_message"],
            "validation_details": validation_res
        }), 400

    # 2. Run Root Analysis & Disease Prediction Pipeline
    prediction = analyze_root_image_pipeline(data)
    if not prediction.get("is_confident", False):
        return jsonify({
            "success": False,
            "error_type": "UNCERTAIN_PREDICTION",
            "message": prediction["user_message"],
            "prediction_details": prediction
        }), 422

    # 3. Retrieve authoritative agricultural recommendations
    rec = get_recommendations_for_disease(prediction["predicted_class"])
    processing_ms = round((time.perf_counter() - start_time) * 1000, 2)

    # 4. Save Prediction Record into SQLite Database
    prediction_uuid = str(uuid.uuid4())
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO predictions (
            prediction_uuid, file_name, predicted_class, disease_name,
            confidence_score, severity_level, severity_explanation,
            symptoms_detected, affected_area_percentage, processing_time_ms,
            vedic_convolution_used, report_summary
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        prediction_uuid,
        data.get("file_name", "specimen.jpg"),
        prediction["predicted_class"],
        prediction["disease_name"],
        prediction["confidence_percentage"],
        prediction["severity_level"],
        prediction["severity_explanation"],
        json.dumps(prediction["symptoms_detected"]),
        prediction["affected_root_volume_percentage"],
        processing_ms,
        1,
        f"{prediction['disease_name']} ({prediction['severity_level']}) with {prediction['confidence_percentage']}% confidence."
    ))
    conn.commit()
    conn.close()

    return jsonify({
        "success": True,
        "prediction_id": prediction_uuid,
        "processing_time_ms": processing_ms,
        "prediction": prediction,
        "recommendations": rec
    })


@app.route("/api/diseases", methods=["GET"])
def get_all_diseases():
    """Returns database catalogue of all supported arecanut root diseases & healthy status."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM disease_information ORDER BY id ASC")
    rows = cursor.fetchall()
    conn.close()

    diseases = [dict(row) for row in rows]
    return jsonify({
        "count": len(diseases),
        "diseases": diseases
    })


@app.route("/api/diseases/<disease_key>", methods=["GET"])
def get_disease_by_key(disease_key):
    """Returns detailed information for a single disease."""
    rec = get_recommendations_for_disease(disease_key)
    if not rec:
        return jsonify({"error": f"Disease '{disease_key}' not found"}), 404
    return jsonify(rec)


@app.route("/api/history", methods=["GET"])
def get_prediction_history():
    """Returns previous prediction history stored in SQLite."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT id, prediction_uuid, file_name, predicted_class, disease_name,
               confidence_score, severity_level, affected_area_percentage,
               processing_time_ms, created_at
        FROM predictions
        ORDER BY id DESC
        LIMIT 50
    """)
    rows = cursor.fetchall()
    conn.close()

    history = [dict(row) for row in rows]
    return jsonify({
        "count": len(history),
        "history": history
    })


@app.route("/api/history/<prediction_id>", methods=["GET"])
def get_prediction_detail(prediction_id):
    """Returns complete stored prediction details."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM predictions WHERE prediction_uuid = ?", (prediction_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return jsonify({"error": "Prediction record not found"}), 404

    record = dict(row)
    record["symptoms_detected"] = json.loads(record["symptoms_detected"])
    rec = get_recommendations_for_disease(record["predicted_class"])
    return jsonify({
        "record": record,
        "recommendations": rec
    })


@app.route("/api/model/metrics", methods=["GET"])
def get_model_metrics():
    """Returns CNN architecture specs, classification metrics, and confusion matrix."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM model_metrics WHERE is_active = 1 ORDER BY id DESC LIMIT 1")
    row = cursor.fetchone()
    conn.close()

    if not row:
        return jsonify({
            "trained": False,
            "message": "Model not trained yet. Run python training/train.py to train CNN."
        })

    metrics = dict(row)
    metrics["confusion_matrix"] = json.loads(metrics["confusion_matrix_json"])
    metrics["class_labels"] = [
        "Healthy", "Ganoderma", "Fusarium", "Yellow Leaf", "Root Grub", "Nematode"
    ]
    return jsonify(metrics)


@app.route("/api/vedic-math/benchmark", methods=["GET"])
def get_vedic_benchmark():
    """
    Executes live mathematical benchmark comparing Vedic Sutras
    (Nikhilam & Urdhva Tiryagbhyam) against conventional arithmetic.
    """
    iterations = request.args.get("iterations", default=2000, type=int)
    bench_results = run_vedic_benchmarks(iterations=min(10000, max(500, iterations)))
    return jsonify(bench_results)


if __name__ == "__main__":
    print("==================================================================")
    print("ROOTGUARD BACKEND FLASK SERVER")
    print("Scope: Arecanut (Areca catechu) Root Disease Early Prediction")
    print("Address: http://127.0.0.1:5000")
    print("==================================================================")
    app.run(host="0.0.0.0", port=5000, debug=True)
