#!/bin/bash

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "============================================"
echo "   Installation Checker"
echo "============================================"
echo ""

# Check Python
echo "Checking Python..."
if command -v python3 &> /dev/null; then
    echo -e "${GREEN}[OK]${NC} Python is installed: $(python3 --version)"
else
    echo -e "${RED}[X]${NC} Python is NOT installed"
    echo "     Download from: https://www.python.org/downloads/"
fi
echo ""

# Check Node.js
echo "Checking Node.js..."
if command -v node &> /dev/null; then
    echo -e "${GREEN}[OK]${NC} Node.js is installed: $(node --version)"
else
    echo -e "${RED}[X]${NC} Node.js is NOT installed"
    echo "     Download from: https://nodejs.org/"
fi
echo ""

# Check npm
echo "Checking npm..."
if command -v npm &> /dev/null; then
    echo -e "${GREEN}[OK]${NC} npm is installed: $(npm --version)"
else
    echo -e "${RED}[X]${NC} npm is NOT installed"
    echo "     Install Node.js to get npm"
fi
echo ""

# Check pip
echo "Checking pip..."
if command -v pip &> /dev/null || command -v pip3 &> /dev/null; then
    echo -e "${GREEN}[OK]${NC} pip is installed"
else
    echo -e "${RED}[X]${NC} pip is NOT installed"
    echo "     Install Python to get pip"
fi
echo ""

# Check Backend Requirements
echo "Checking Backend Requirements..."
if [ -d "backend/venv" ]; then
    echo -e "${GREEN}[OK]${NC} Virtual environment exists"
    source backend/venv/bin/activate
    if python -c "import flask" &> /dev/null; then
        echo -e "${GREEN}[OK]${NC} Backend requirements installed"
    else
        echo -e "${YELLOW}[!]${NC} Backend requirements NOT installed"
        echo "     Run: cd backend && pip install -r requirements.txt"
    fi
    deactivate 2>/dev/null
else
    echo -e "${YELLOW}[!]${NC} Virtual environment NOT created"
    echo "     Run: cd backend && python3 -m venv venv"
fi
echo ""

# Check Frontend Requirements
echo "Checking Frontend Requirements..."
if [ -d "frontend/node_modules" ]; then
    echo -e "${GREEN}[OK]${NC} Frontend dependencies installed"
else
    echo -e "${YELLOW}[!]${NC} Frontend dependencies NOT installed"
    echo "     Run: cd frontend && npm install"
fi
echo ""

# Check Models
echo "Checking AI Models..."
if [ -f "backend/model_vgg16.h5" ]; then
    echo -e "${GREEN}[OK]${NC} VGG16 model found"
else
    echo -e "${YELLOW}[!]${NC} VGG16 model NOT found (will use dummy model)"
    echo "     Add: backend/model_vgg16.h5"
fi

if [ -f "backend/model_resnet.h5" ]; then
    echo -e "${GREEN}[OK]${NC} ResNet50 model found"
else
    echo -e "${YELLOW}[!]${NC} ResNet50 model NOT found (will use dummy model)"
    echo "     Add: backend/model_resnet.h5"
fi
echo ""

echo "============================================"
echo "   Installation Check Complete"
echo "============================================"
echo ""
echo "If everything shows [OK], you're ready to run:"
echo "  ./start_all.sh"
echo ""
