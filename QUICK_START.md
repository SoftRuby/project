# 🚀 Quick Start Guide

Get your Sign Language Translator up and running in 5 minutes!

## ⚡ Super Quick Start (10 Seconds!)

### Windows
```bash
start_all.bat
```

### Linux/Mac
```bash
./start_all.sh
```

**That's it!** The script automatically handles everything:
- ✅ Checks prerequisites
- ✅ Installs requirements (only if needed)
- ✅ Starts both servers
- ✅ Opens browser

**See [STARTUP_GUIDE.md](STARTUP_GUIDE.md) for detailed information.**

---

## 📖 Manual Setup (Alternative)

If you prefer to understand each step:

### Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js (v18+): Run `node --version`
- ✅ Python (v3.8+): Run `python --version`
- ✅ pip: Run `pip --version`

## Installation (5 Minutes)

### Step 1: Backend Setup (2 minutes)

```bash
# Navigate to backend
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the Flask server
python app.py
```

Expected output:
```
🚀 Starting Sign Language Translator API...
📊 Loaded 2 model(s)
🏷️  Loaded 40 class labels
 * Running on http://0.0.0.0:5000
```

⚠️ **Note**: If you don't have trained models (`model_vgg16.h5` and `model_resnet.h5`), the app will use dummy models with random predictions. See `MODEL_SETUP.md` for training your own models.

**Keep this terminal running!**

### Step 2: Frontend Setup (3 minutes)

Open a **new terminal window** and run:

```bash
# Navigate to frontend
cd frontend

# Install Node.js dependencies (first time only)
npm install

# Start the development server
npm run dev
```

Expected output:
```
  VITE v5.0.8  ready in 1234 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Step 3: Open the App

Open your browser and go to:
```
http://localhost:3000
```

## First Use

1. **Grant Camera Permission** - Click "Allow" when prompted
2. **Make an ASL Gesture** - Show a letter (like "A") to the camera
3. **Capture** - Click the "Capture & Translate" button
4. **See Results** - View the AI prediction and confidence score
5. **Listen** - Click the speaker icon to hear it spoken

## Testing Without a Webcam

1. Click "Upload Image" button
2. Select any image file from your computer
3. The AI will attempt to recognize it (results may vary with dummy models)

## Troubleshooting

### Backend won't start

**Error: "ModuleNotFoundError: No module named 'flask'"**
```bash
pip install flask flask-cors tensorflow opencv-python numpy
```

**Error: "Port 5000 already in use"**
```bash
# Find and kill the process using port 5000
lsof -ti:5000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :5000    # Windows - note the PID and use Task Manager
```

### Frontend won't start

**Error: "Cannot find module"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Error: "Port 3000 already in use"**
- The dev server will automatically use port 3001 instead

### Camera not working

1. **Check permissions**: Browser settings → Camera → Allow for localhost
2. **Close other apps**: Ensure no other app is using the camera
3. **Try different browser**: Chrome works best
4. **Use HTTPS or localhost**: Camera requires secure context

### "Failed to fetch" error

1. Ensure backend is running on port 5000
2. Check backend terminal for errors
3. Try restarting both servers

## What's Next?

### Add Your Trained Models

1. Place `model_vgg16.h5` and `model_resnet.h5` in the `backend/` folder
2. Restart the backend server
3. Your predictions will now be accurate!

See `backend/MODEL_SETUP.md` for detailed instructions.

### Customize the App

#### Change Colors
Edit `frontend/tailwind.config.js` to modify the color scheme.

#### Modify Labels
Edit `backend/labels.json` to change the recognized gestures.

#### Adjust UI
Components are in `frontend/src/components/` - fully customizable!

## Development Workflow

### Making Changes

**Backend changes:**
- Flask has auto-reload enabled in debug mode
- Just save your file and test

**Frontend changes:**
- Vite hot-reloads automatically
- Changes appear instantly in the browser

### Stopping the Servers

Press `Ctrl+C` in each terminal window to stop the servers.

### Restarting

**Backend:**
```bash
cd backend
python app.py
```

**Frontend:**
```bash
cd frontend
npm run dev
```

## Production Build

### Backend
```bash
cd backend
pip install gunicorn
gunicorn --bind 0.0.0.0:5000 app:app
```

### Frontend
```bash
cd frontend
npm run build
# Serve the 'dist' folder with any static file server
```

## Environment Variables (Optional)

Create `.env` files for configuration:

**backend/.env:**
```
FLASK_ENV=development
PORT=5000
MODEL_PATH=./models
```

**frontend/.env:**
```
VITE_API_URL=http://localhost:5000
```

## Common Commands Reference

### Backend
```bash
# Install dependencies
pip install -r requirements.txt

# Start server
python app.py

# Run with production settings
FLASK_ENV=production python app.py
```

### Frontend
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Getting Help

1. Check the main `README.md` for detailed documentation
2. Review error messages in browser console (F12)
3. Check backend terminal for API errors
4. See `backend/MODEL_SETUP.md` for model-related issues

## Success Checklist

- ✅ Backend running on http://localhost:5000
- ✅ Frontend running on http://localhost:3000
- ✅ Camera permission granted
- ✅ Can capture images
- ✅ Getting predictions (even if random with dummy models)
- ✅ Text-to-speech working
- ✅ Sentence builder working

If all checked, you're ready to go! 🎉

## Next Steps

1. **Add trained models** for accurate predictions
2. **Collect your own dataset** for custom gestures
3. **Deploy to production** (see `DEPLOYMENT.md`)
4. **Customize the UI** to match your brand
5. **Add more features** like gesture history or video recording

Happy translating! 🤟
