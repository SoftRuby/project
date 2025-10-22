@echo off
ECHO ============================================
ECHO   Sign Language Translator - Stop Servers
ECHO ============================================
ECHO.

ECHO [INFO] Stopping all servers...
ECHO.

REM Kill Python processes (Flask backend)
ECHO [INFO] Stopping Backend Server (Flask)...
TASKKILL /F /FI "WINDOWTITLE eq Sign Language Translator - Backend*" >nul 2>&1
TASKKILL /F /IM python.exe /FI "MEMUSAGE gt 10000" >nul 2>&1

REM Kill Node processes (React frontend)
ECHO [INFO] Stopping Frontend Server (React/Vite)...
TASKKILL /F /FI "WINDOWTITLE eq Sign Language Translator - Frontend*" >nul 2>&1
TASKKILL /F /IM node.exe /FI "MEMUSAGE gt 10000" >nul 2>&1

ECHO.
ECHO [OK] All servers stopped!
ECHO.
PAUSE
