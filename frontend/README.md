# Frontend - Sign Language Translator

Modern React-based web interface for real-time ASL gesture recognition.

## Features

- 📹 Live webcam capture
- 📤 Image upload support
- 🎨 Beautiful gradient UI with animations
- 🔊 Text-to-speech functionality
- 📝 Sentence builder
- 🔄 Switch between AI models
- 📱 Fully responsive design

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Webcam
- Lucide React (icons)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Top navigation
│   ├── WebcamCapture.jsx   # Camera/upload functionality
│   ├── PredictionBox.jsx   # Results and controls
│   └── Footer.jsx          # Footer section
├── App.jsx                 # Main app component
├── main.jsx                # React entry point
└── index.css               # Global styles
```

## Configuration

### Vite Config (`vite.config.js`)

The app uses a proxy to communicate with the backend API:

```javascript
proxy: {
  '/predict': 'http://localhost:5000',
  '/models': 'http://localhost:5000',
  '/labels': 'http://localhost:5000'
}
```

For production, update the API URLs in `App.jsx` to point to your deployed backend.

## Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme.

### Animations

Framer Motion animations can be customized in each component file.

### Backend URL

Update the fetch URL in `src/App.jsx`:

```javascript
const apiResponse = await fetch('YOUR_BACKEND_URL/predict', {
  method: 'POST',
  body: formData,
});
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

Note: Webcam functionality requires HTTPS or localhost.

## Troubleshooting

### Webcam not working
- Ensure you've granted camera permissions
- Check if another app is using the camera
- Try a different browser

### API connection issues
- Verify backend server is running
- Check browser console for CORS errors
- Ensure proxy configuration is correct
