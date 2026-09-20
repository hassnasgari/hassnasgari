@echo off
chcp 65001 >nul
title GitHub Push - HassanDev Profile
echo ======================================================
echo    Connecting and Pushing to GitHub (Profile README)
echo ======================================================
echo.
cd /d "%~dp0"
git push -u origin main
echo.
echo ======================================================
echo Done! Press any key to close this window.
echo ======================================================
pause
