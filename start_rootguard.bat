@echo off
TITLE RootGuard - Arecanut Root Disease Prediction System
echo ==============================================================================
echo ROOTGUARD: AI-Based Early Prediction of Arecanut Root Diseases
echo Academic Engineering Mini-Project
echo ==============================================================================
echo.

echo [1/4] Checking Python environment...
python --version
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH! Please install Python 3.10+.
    pause
    exit /b
)

echo [2/4] Checking Node.js environment...
node --version
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in PATH! Please install Node 18+.
    pause
    exit /b
)

echo [3/4] Initializing SQLite database and seeding ICAR-CPCRI disease library...
python backend/database/init_db.py

echo [4/4] Starting RootGuard Full-Stack Server...
echo.
echo Application will be available at: http://localhost:3000
echo Backend API available at:         http://localhost:3000/api
echo.
npm run dev

pause
