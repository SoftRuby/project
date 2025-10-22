# 🚀 Easy Startup Guide

Quick and easy way to start your Sign Language Translator with automated setup!

## 📋 Files Included

### Windows Users
- **`start_all.bat`** - Automatically installs requirements and starts both servers
- **`stop_all.bat`** - Stops all running servers

### Linux/Mac Users
- **`start_all.sh`** - Automatically installs requirements and starts both servers
- **`stop_all.sh`** - Stops all running servers

## 🎯 Quick Start

### Windows

#### First Time / Anytime
Simply double-click `start_all.bat` or run in terminal:
```bash
start_all.bat
```

The script will automatically:
1. ✅ Check if Python and Node.js are installed
2. ✅ Create Python virtual environment (if needed)
3. ✅ Install backend requirements (if needed)
4. ✅ Install frontend dependencies (if needed)
5. ✅ Start backend server on http://localhost:5000
6. ✅ Start frontend server on http://localhost:3000
7. ✅ Open the app in your browser automatically

#### To Stop Servers
Double-click `stop_all.bat` or press `Ctrl+C` in the server windows.

---

### Linux / Mac

#### First Time / Anytime
Run in terminal:
```bash
./start_all.sh
```

Or make it executable first:
```bash
chmod +x start_all.sh
./start_all.sh
```

The script will automatically:
1. ✅ Check if Python and Node.js are installed
2. ✅ Create Python virtual environment (if needed)
3. ✅ Install backend requirements (if needed)
4. ✅ Install frontend dependencies (if needed)
5. ✅ Start backend server on http://localhost:5000
6. ✅ Start frontend server on http://localhost:3000
7. ✅ Open the app in your browser automatically

#### To Stop Servers
Press `Ctrl+C` in the terminal, or run:
```bash
./stop_all.sh
```

---

## 📖 What Happens When You Run start_all?

### Step 1: Prerequisites Check
```
✓ Checking Python installation...
✓ Checking Node.js installation...
```

If Python or Node.js is not installed, you'll get an error message with download links.

### Step 2: Backend Setup
```
✓ Creating/checking virtual environment...
✓ Checking if requirements are installed...
✓ Installing requirements (only if needed)...
```

### Step 3: Frontend Setup
```
✓ Checking if node_modules exists...
✓ Installing dependencies (only if needed)...
```

### Step 4: Start Servers
```
✓ Starting Backend on http://localhost:5000
✓ Starting Frontend on http://localhost:3000
✓ Opening browser automatically...
```

---

## 🎨 What You'll See

### Windows
Two separate command windows will open:
1. **Backend Window** - Flask server logs
2. **Frontend Window** - Vite dev server logs

Plus your default browser will open to http://localhost:3000

### Linux/Mac
Both servers run in the same terminal with colored output.
Your default browser will open to http://localhost:3000

---

## 💡 Smart Features

### Intelligent Installation
- **First Run**: Installs all requirements (takes 2-5 minutes)
- **Subsequent Runs**: Skips installation, starts immediately (takes 5-10 seconds)

### Detection Logic
The scripts check:
- ✅ If `backend/venv` exists (Python virtual environment)
- ✅ If Python packages are installed (checks for Flask)
- ✅ If `frontend/node_modules` exists (Node dependencies)

### Only Installs When Needed
```
First run:     Install everything → Start servers
Second run:    Skip installation → Start servers immediately
After updates: Install new packages → Start servers
```

---

## 🔧 Troubleshooting

### "Python is not installed"

**Solution:**
1. Download Python 3.8+ from https://python.org/downloads/
2. During installation, check ✅ "Add Python to PATH"
3. Restart terminal and run the script again

### "Node.js is not installed"

**Solution:**
1. Download Node.js from https://nodejs.org/
2. Install the LTS version
3. Restart terminal and run the script again

### "Failed to install requirements"

**Solution:**
```bash
# Windows
cd backend
venv\Scripts\activate.bat
pip install -r requirements.txt

# Linux/Mac
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

### "Port 5000 already in use"

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
# Note the PID and kill it in Task Manager

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### "Port 3000 already in use"

**Solution:**
Vite will automatically use port 3001 instead, or you can kill the process:
```bash
# Windows
netstat -ano | findstr :3000

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Servers won't stop

**Windows:**
- Run `stop_all.bat`
- Or manually close the server windows
- Or use Task Manager to end Python/Node processes

**Linux/Mac:**
- Run `./stop_all.sh`
- Or press `Ctrl+C` in the terminal
- Or use: `pkill -f "python.*app.py" && pkill -f "vite"`

---

## 🎯 Usage Patterns

### Daily Development Workflow

```bash
# Morning - Start working
start_all.bat    # or ./start_all.sh

# ... work on the project ...

# Evening - Stop servers
stop_all.bat     # or ./stop_all.sh
```

### After Git Pull

```bash
# If requirements were updated, just run:
start_all.bat    # or ./start_all.sh

# The script will detect and install new packages
```

### Fresh Start

```bash
# Delete everything and reinstall:

# Windows
rd /s /q backend\venv
rd /s /q frontend\node_modules
start_all.bat

# Linux/Mac
rm -rf backend/venv
rm -rf frontend/node_modules
./start_all.sh
```

---

## 📊 Script Comparison

| Feature | Manual Setup | start_all Script |
|---------|-------------|------------------|
| Check prerequisites | ❌ Manual | ✅ Automatic |
| Create venv | ❌ Manual | ✅ Automatic |
| Install Python packages | ❌ Manual | ✅ Automatic (if needed) |
| Install Node modules | ❌ Manual | ✅ Automatic (if needed) |
| Start backend | ❌ Manual | ✅ Automatic |
| Start frontend | ❌ Manual | ✅ Automatic |
| Open browser | ❌ Manual | ✅ Automatic |
| Separate windows | ❌ Manual | ✅ Automatic (Windows) |
| Time (first run) | ~5 min | ~3 min |
| Time (next runs) | ~30 sec | ~10 sec |

---

## 🔐 Security Notes

- ✅ Scripts only install packages from requirements files
- ✅ Uses Python virtual environment (isolated)
- ✅ No admin/sudo privileges required
- ✅ All installations are local to the project
- ✅ No system-wide changes

---

## 🎓 Understanding the Scripts

### Windows Batch Script (start_all.bat)

```batch
@echo off                          # Hide command output
python --version >nul 2>&1        # Check if Python exists
IF %ERRORLEVEL% NEQ 0 (...)       # Error handling
CD backend                         # Navigate to backend
CALL venv\Scripts\activate.bat    # Activate virtual env
START "Title" CMD /K "commands"   # Open new window
```

### Linux/Mac Shell Script (start_all.sh)

```bash
#!/bin/bash                        # Bash script
if ! command -v python3; then     # Check if Python exists
source venv/bin/activate          # Activate virtual env
python app.py &                   # Run in background
BACKEND_PID=$!                    # Store process ID
trap cleanup SIGINT               # Handle Ctrl+C
```

---

## 📝 Customization

### Change Ports

Edit the scripts to use different ports:

**Backend (default 5000):**
```python
# backend/app.py
app.run(host='0.0.0.0', port=5000)  # Change 5000 to desired port
```

**Frontend (default 3000):**
```javascript
// frontend/vite.config.js
server: {
  port: 3000  // Change 3000 to desired port
}
```

### Disable Auto-Open Browser

**Windows (start_all.bat):**
```batch
REM Comment out this line:
REM START http://localhost:3000
```

**Linux/Mac (start_all.sh):**
```bash
# Comment out these lines:
# if command -v xdg-open &> /dev/null; then
#     xdg-open http://localhost:3000 &> /dev/null
# fi
```

### Add Custom Commands

You can add pre-start or post-start commands in the scripts:

```batch
REM Before starting servers
ECHO [INFO] Running custom setup...
REM your commands here

REM After starting servers
ECHO [INFO] Running post-start tasks...
REM your commands here
```

---

## 🆚 Comparison to Manual Method

### Manual Method (OLD)
```bash
# Terminal 1
cd backend
python -m venv venv
venv\Scripts\activate  # or source venv/bin/activate
pip install -r requirements.txt
python app.py

# Terminal 2
cd frontend
npm install
npm run dev
```

**Time:** 3-5 minutes every time

### Automated Method (NEW)
```bash
# Windows
start_all.bat

# Linux/Mac
./start_all.sh
```

**Time:** 
- First run: 3 minutes (with installation)
- Next runs: 10 seconds (no installation needed)

---

## ✅ Best Practices

1. **Always use the script** - Don't manually activate venv and start servers
2. **One project at a time** - Stop previous servers before starting new ones
3. **Check for updates** - If requirements change, the script handles it
4. **Keep scripts updated** - Pull latest versions from git
5. **Use stop scripts** - Cleanly shutdown servers when done

---

## 🎯 Quick Reference

### Essential Commands

**Windows:**
```bash
start_all.bat          # Start everything
stop_all.bat           # Stop everything
Ctrl+C                 # Stop in window
```

**Linux/Mac:**
```bash
./start_all.sh         # Start everything
./stop_all.sh          # Stop everything
Ctrl+C                 # Stop in terminal
```

### URLs
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **Backend API:** http://localhost:5000/predict

### Logs
- **Backend logs:** In the backend terminal/window
- **Frontend logs:** In the frontend terminal/window
- **Browser console:** F12 → Console tab

---

## 🎉 Benefits

✅ **Save Time**: No need to manually install requirements every time
✅ **Beginner Friendly**: Works even if you're not familiar with terminals
✅ **Smart Detection**: Only installs when necessary
✅ **Error Handling**: Clear error messages if something goes wrong
✅ **Cross-Platform**: Works on Windows, Linux, and Mac
✅ **Automatic Browser**: Opens the app automatically
✅ **Clean Shutdown**: Properly stops all processes

---

## 📚 Additional Resources

- **Main README:** Complete project documentation
- **QUICK_START.md:** Manual setup instructions
- **DEPLOYMENT.md:** Production deployment guide
- **Troubleshooting:** Check server terminal logs for errors

---

## 🤝 Support

If you encounter issues:
1. Check the terminal/window output for error messages
2. Ensure Python 3.8+ and Node.js 16+ are installed
3. Try deleting venv and node_modules, then run again
4. Check if ports 5000 and 3000 are available
5. Review the Troubleshooting section above

---

**Happy Coding! 🚀**

*Just double-click and go!*
