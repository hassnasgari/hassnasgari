@echo off
chcp 65001 >nul
title GitHub Portfolio Status Checker - HassanDev
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "Check-GitHub-Status.ps1"
echo.
echo Press any key to exit...
pause >nul
