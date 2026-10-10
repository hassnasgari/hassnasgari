@echo off
chcp 65001 >nul
echo =======================================================
echo   Testing CoinGecko Bot Reliability Enhancer
echo =======================================================
echo.
python coingecko_enhancer.py
echo.
echo =======================================================
echo   Checking output text file...
echo =======================================================
if exist market_summary.txt (
    type market_summary.txt
) else (
    echo [ERROR] market_summary.txt not found!
)
pause
