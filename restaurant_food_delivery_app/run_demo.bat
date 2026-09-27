@echo off
title TasteCraft Web App - Live Demo Server
echo ========================================================
echo   Launching TasteCraft Restaurant & Grocery Web App
echo ========================================================
echo Starting local web server on port 8080...
start "" "http://localhost:8080"
python -m http.server 8080
pause
