@echo off
chcp 65001 >nul
echo ========================================================
echo   Android Reverse Engineering & Security Audit Kit
echo   Validation & Test Suite Runner
echo ========================================================
echo.

python test_analyzer.py
if %ERRORLEVEL% EQU 0 (
    echo.
    echo [SUCCESS] Android Security Analyzer validated with 0 errors.
) else (
    echo.
    echo [ERROR] Test execution failed with error code %ERRORLEVEL%.
)
pause
