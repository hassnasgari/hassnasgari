@echo off
chcp 65001 >nul
title GitHub Portfolio Status Checker - HassanDev
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0Check-GitHub-Status.ps1"
