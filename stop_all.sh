#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "============================================"
echo "   Sign Language Translator - Stop Servers"
echo "============================================"
echo ""

echo -e "${BLUE}[INFO]${NC} Stopping all servers..."
echo ""

# Stop Flask backend (Python)
echo -e "${BLUE}[INFO]${NC} Stopping Backend Server (Flask)..."
pkill -f "python.*app.py" 2>/dev/null
if [ $? -eq 0 ]; then
    echo -e "${GREEN}[OK]${NC} Backend stopped"
else
    echo -e "${BLUE}[INFO]${NC} Backend was not running"
fi

# Stop Vite frontend (Node)
echo -e "${BLUE}[INFO]${NC} Stopping Frontend Server (Vite)..."
pkill -f "vite" 2>/dev/null
if [ $? -eq 0 ]; then
    echo -e "${GREEN}[OK]${NC} Frontend stopped"
else
    echo -e "${BLUE}[INFO]${NC} Frontend was not running"
fi

echo ""
echo -e "${GREEN}[OK]${NC} All servers stopped!"
echo ""
