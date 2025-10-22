@echo off
ECHO ============================================
ECHO   Sign Language Translator - Startup
ECHO ============================================
ECHO.

REM Color codes for Windows Terminal
COLOR 0A

REM Check if Python is installed
python --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    ECHO [ERROR] Python is not installed or not in PATH!
    ECHO Please install Python 3.8 or higher from https://www.python.org/
    PAUSE
    EXIT /B 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    ECHO [ERROR] Node.js is not installed or not in PATH!
    ECHO Please install Node.js from https://nodejs.org/
    PAUSE
    EXIT /B 1
)

ECHO [OK] Python and Node.js are installed
ECHO.

REM ============================================
REM Backend Setup
REM ============================================
ECHO ============================================
ECHO   Setting up Backend...
ECHO ============================================

CD backend

REM Check if virtual environment exists
IF NOT EXIST "venv\" (
    ECHO [INFO] Creating Python virtual environment...
    python -m venv venv
    ECHO [OK] Virtual environment created
) ELSE (
    ECHO [OK] Virtual environment already exists
)

REM Activate virtual environment
ECHO [INFO] Activating virtual environment...
CALL venv\Scripts\activate.bat

REM Check if requirements are installed by checking for Flask
python -c "import flask" >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    ECHO [INFO] Installing Python requirements...
    ECHO This may take a few minutes...
    pip install -r requirements.txt
    IF %ERRORLEVEL% EQU 0 (
        ECHO [OK] Backend requirements installed successfully
    ) ELSE (
        ECHO [ERROR] Failed to install backend requirements
        PAUSE
        EXIT /B 1
    )
) ELSE (
    ECHO [OK] Backend requirements already installed
)

CD ..

REM ============================================
REM Frontend Setup
REM ============================================
ECHO.
ECHO ============================================
ECHO   Setting up Frontend...
ECHO ============================================

CD frontend

REM Check if node_modules exists
IF NOT EXIST "node_modules\" (
    ECHO [INFO] Installing frontend dependencies...
    ECHO This may take a few minutes...
    CALL npm install
    IF %ERRORLEVEL% EQU 0 (
        ECHO [OK] Frontend dependencies installed successfully
    ) ELSE (
        ECHO [ERROR] Failed to install frontend dependencies
        PAUSE
        EXIT /B 1
    )
) ELSE (
    ECHO [OK] Frontend dependencies already installed
)

CD ..

REM ============================================
REM Start Servers
REM ============================================
ECHO.
ECHO ============================================
ECHO   Starting Servers...
ECHO ============================================
ECHO.
ECHO [INFO] Backend will run on: http://localhost:5000
ECHO [INFO] Frontend will run on: http://localhost:3000
ECHO.
ECHO [TIP] Press Ctrl+C in each window to stop the servers
ECHO.
TIMEOUT /T 3

REM Start backend in new window
ECHO [INFO] Starting Backend Server...
START "Sign Language Translator - Backend (Flask)" CMD /K "CD /D %~dp0backend && CALL venv\Scripts\activate.bat && python app.py"

REM Wait a bit for backend to start
TIMEOUT /T 2

REM Start frontend in new window
ECHO [INFO] Starting Frontend Server...
START "Sign Language Translator - Frontend (React)" CMD /K "CD /D %~dp0frontend && npm run dev"

ECHO.
ECHO ============================================
ECHO   Servers Started Successfully!
ECHO ============================================
ECHO.
ECHO Backend:  http://localhost:5000
ECHO Frontend: http://localhost:3000
ECHO.
ECHO [TIP] The application will open automatically in ~10 seconds
ECHO [TIP] If not, open http://localhost:3000 in your browser
ECHO.

REM Wait for servers to start, then open browser
TIMEOUT /T 10
START http://localhost:3000

ECHO.
ECHO [INFO] All systems running!
ECHO [INFO] Check the server windows for logs
ECHO [INFO] This window can be closed safely
ECHO.
PAUSE
