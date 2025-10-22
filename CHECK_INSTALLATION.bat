@echo off
ECHO ============================================
ECHO   Installation Checker
ECHO ============================================
ECHO.

REM Check Python
ECHO Checking Python...
python --version 2>nul
IF %ERRORLEVEL% EQU 0 (
    ECHO [OK] Python is installed
) ELSE (
    ECHO [X] Python is NOT installed
    ECHO     Download from: https://www.python.org/downloads/
)
ECHO.

REM Check Node.js
ECHO Checking Node.js...
node --version 2>nul
IF %ERRORLEVEL% EQU 0 (
    ECHO [OK] Node.js is installed
) ELSE (
    ECHO [X] Node.js is NOT installed
    ECHO     Download from: https://nodejs.org/
)
ECHO.

REM Check npm
ECHO Checking npm...
npm --version 2>nul
IF %ERRORLEVEL% EQU 0 (
    ECHO [OK] npm is installed
) ELSE (
    ECHO [X] npm is NOT installed
    ECHO     Install Node.js to get npm
)
ECHO.

REM Check pip
ECHO Checking pip...
pip --version 2>nul
IF %ERRORLEVEL% EQU 0 (
    ECHO [OK] pip is installed
) ELSE (
    ECHO [X] pip is NOT installed
    ECHO     Install Python to get pip
)
ECHO.

REM Check Backend Requirements
ECHO Checking Backend Requirements...
IF EXIST "backend\venv\" (
    ECHO [OK] Virtual environment exists
    CALL backend\venv\Scripts\activate.bat
    python -c "import flask" 2>nul
    IF %ERRORLEVEL% EQU 0 (
        ECHO [OK] Backend requirements installed
    ) ELSE (
        ECHO [!] Backend requirements NOT installed
        ECHO     Run: cd backend ^&^& pip install -r requirements.txt
    )
) ELSE (
    ECHO [!] Virtual environment NOT created
    ECHO     Run: cd backend ^&^& python -m venv venv
)
ECHO.

REM Check Frontend Requirements
ECHO Checking Frontend Requirements...
IF EXIST "frontend\node_modules\" (
    ECHO [OK] Frontend dependencies installed
) ELSE (
    ECHO [!] Frontend dependencies NOT installed
    ECHO     Run: cd frontend ^&^& npm install
)
ECHO.

REM Check Models
ECHO Checking AI Models...
IF EXIST "backend\model_vgg16.h5" (
    ECHO [OK] VGG16 model found
) ELSE (
    ECHO [!] VGG16 model NOT found (will use dummy model)
    ECHO     Add: backend\model_vgg16.h5
)

IF EXIST "backend\model_resnet.h5" (
    ECHO [OK] ResNet50 model found
) ELSE (
    ECHO [!] ResNet50 model NOT found (will use dummy model)
    ECHO     Add: backend\model_resnet.h5
)
ECHO.

ECHO ============================================
ECHO   Installation Check Complete
ECHO ============================================
ECHO.
ECHO If everything shows [OK], you're ready to run:
ECHO   start_all.bat
ECHO.
PAUSE
