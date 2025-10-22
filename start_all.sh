#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "============================================"
echo "   Sign Language Translator - Startup"
echo "============================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}[ERROR]${NC} Python 3 is not installed!"
    echo "Please install Python 3.8 or higher"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}[ERROR]${NC} Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}[OK]${NC} Python and Node.js are installed"
echo ""

# ============================================
# Backend Setup
# ============================================
echo "============================================"
echo "   Setting up Backend..."
echo "============================================"

cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo -e "${BLUE}[INFO]${NC} Creating Python virtual environment..."
    python3 -m venv venv
    echo -e "${GREEN}[OK]${NC} Virtual environment created"
else
    echo -e "${GREEN}[OK]${NC} Virtual environment already exists"
fi

# Activate virtual environment
echo -e "${BLUE}[INFO]${NC} Activating virtual environment..."
source venv/bin/activate

# Check if requirements are installed
if ! python -c "import flask" &> /dev/null; then
    echo -e "${BLUE}[INFO]${NC} Installing Python requirements..."
    echo "This may take a few minutes..."
    pip install -r requirements.txt
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}[OK]${NC} Backend requirements installed successfully"
    else
        echo -e "${RED}[ERROR]${NC} Failed to install backend requirements"
        exit 1
    fi
else
    echo -e "${GREEN}[OK]${NC} Backend requirements already installed"
fi

cd ..

# ============================================
# Frontend Setup
# ============================================
echo ""
echo "============================================"
echo "   Setting up Frontend..."
echo "============================================"

cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}[INFO]${NC} Installing frontend dependencies..."
    echo "This may take a few minutes..."
    npm install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}[OK]${NC} Frontend dependencies installed successfully"
    else
        echo -e "${RED}[ERROR]${NC} Failed to install frontend dependencies"
        exit 1
    fi
else
    echo -e "${GREEN}[OK]${NC} Frontend dependencies already installed"
fi

cd ..

# ============================================
# Start Servers
# ============================================
echo ""
echo "============================================"
echo "   Starting Servers..."
echo "============================================"
echo ""
echo -e "${BLUE}[INFO]${NC} Backend will run on: http://localhost:5000"
echo -e "${BLUE}[INFO]${NC} Frontend will run on: http://localhost:3000"
echo ""
echo -e "${YELLOW}[TIP]${NC} Press Ctrl+C to stop both servers"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}[INFO]${NC} Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}[OK]${NC} Servers stopped"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start backend
echo -e "${BLUE}[INFO]${NC} Starting Backend Server..."
cd backend
source venv/bin/activate
python app.py &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Start frontend
echo -e "${BLUE}[INFO]${NC} Starting Frontend Server..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "============================================"
echo "   Servers Started Successfully!"
echo "============================================"
echo ""
echo -e "${GREEN}Backend:${NC}  http://localhost:5000"
echo -e "${GREEN}Frontend:${NC} http://localhost:3000"
echo ""
echo -e "${YELLOW}[TIP]${NC} Open http://localhost:3000 in your browser"
echo -e "${YELLOW}[TIP]${NC} Press Ctrl+C to stop both servers"
echo ""

# Open browser (optional, comment out if not needed)
sleep 5
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:3000 &> /dev/null
elif command -v open &> /dev/null; then
    open http://localhost:3000 &> /dev/null
fi

# Wait for background processes
wait
