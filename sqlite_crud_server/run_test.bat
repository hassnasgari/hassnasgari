@echo off
chcp 65001 >nul
title SQLite CRUD Server - Test Runner
echo =======================================================
echo     Starting Server & Running Automated Tests...
echo =======================================================
cd /d "%~dp0"

if not exist venv (
    echo Setting up Python virtual environment...
    python -m venv venv
    call .\venv\Scripts\pip install flask flask-sqlalchemy
)

echo Starting Flask server in background...
start /b "" ".\venv\Scripts\python.exe" server.py >nul 2>&1

timeout /t 3 /nobreak >nul

echo.
echo Running automated API tests...
echo.
.\venv\Scripts\python.exe test_api.py

echo.
echo =======================================================
echo Done! Press any key to close.
echo =======================================================
pause
