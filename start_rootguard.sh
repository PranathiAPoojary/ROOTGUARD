#!/usr/bin/env bash
# RootGuard - Startup Script for Linux / macOS / Bash
echo "=============================================================================="
echo "ROOTGUARD: AI-Based Early Prediction of Arecanut Root Diseases"
echo "=============================================================================="

# 1. Initialize DB
python3 backend/database/init_db.py

# 2. Start Full-Stack Dev Server
echo "Starting RootGuard full-stack system on port 3000..."
npm run dev
