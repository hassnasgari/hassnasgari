@echo off
title Anna Agentic Studio - Local Server
echo ==========================================================
echo   Launching Anna Agentic Studio (DoraHacks Hackathon BUIDL)
echo ==========================================================
echo Starting local web server on port 8085...
start "" "http://localhost:8085"
python -m http.server 8085
pause
