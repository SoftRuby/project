# 🚀 Deployment Guide

Deploy your Sign Language Translator to production environments.

## Table of Contents
- [Overview](#overview)
- [Backend Deployment](#backend-deployment)
- [Frontend Deployment](#frontend-deployment)
- [Full-Stack Deployment](#full-stack-deployment)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)

## Overview

### Recommended Platforms

**Backend (Flask API):**
- 🟢 **Render** - Easy, free tier available
- 🔵 **Google Cloud Run** - Scalable, pay-per-use
- 🟣 **Heroku** - Simple deployment
- 🟡 **AWS Lambda** - Serverless option
- ⚫ **DigitalOcean** - Full control

**Frontend (React App):**
- 🔷 **Vercel** - Optimal for React, free tier
- 🔶 **Netlify** - Easy deployment, free tier
- 🟦 **GitHub Pages** - Free for public repos
- 🟩 **AWS S3 + CloudFront** - Enterprise option

## Backend Deployment

### Option 1: Render (Recommended)

#### Step 1: Prepare Your Repository

Ensure your backend folder has:
- `requirements.txt`
- `app.py`
- Model files (optional)

#### Step 2: Create Render Web Service

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `sign-language-api`
   - **Region**: Choose closest to users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn --bind 0.0.0.0:$PORT app:app`

#### Step 3: Environment Variables

Add in Render dashboard:
```
FLASK_ENV=production
PYTHON_VERSION=3.9.16
```

#### Step 4: Deploy

Click "Create Web Service" - deployment starts automatically!

Your API will be at: `https://sign-language-api.onrender.com`

### Option 2: Google Cloud Run

#### Prerequisites
```bash
# Install Google Cloud SDK
brew install google-cloud-sdk  # macOS
# or download from https://cloud.google.com/sdk/docs/install
```

#### Step 1: Create Dockerfile

Create `backend/Dockerfile`:
```dockerfile
FROM python:3.9-slim

WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Environment
ENV PORT=8080
ENV PYTHONUNBUFFERED=1

# Run with gunicorn
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app:app
```

#### Step 2: Deploy to Cloud Run

```bash
# Authenticate
gcloud auth login

# Set project
gcloud config set project YOUR_PROJECT_ID

# Deploy
gcloud run deploy sign-language-api \
  --source ./backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 2Gi
```

Your API will be at: `https://sign-language-api-xxxxx-uc.a.run.app`

### Option 3: Heroku

#### Step 1: Install Heroku CLI
```bash
brew install heroku/brew/heroku  # macOS
# or download from https://devcenter.heroku.com/articles/heroku-cli
```

#### Step 2: Create Heroku App

```bash
cd backend
heroku login
heroku create sign-language-api
```

#### Step 3: Create Procfile

Create `backend/Procfile`:
```
web: gunicorn app:app
```

#### Step 4: Deploy

```bash
git init  # if not already a git repo
heroku git:remote -a sign-language-api
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

Your API: `https://sign-language-api.herokuapp.com`

## Frontend Deployment

### Option 1: Vercel (Recommended)

#### Step 1: Update API URL

Edit `frontend/src/App.jsx`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'https://your-backend-url.com';

// Update fetch calls
const apiResponse = await fetch(`${API_URL}/predict`, {
  method: 'POST',
  body: formData,
});
```

#### Step 2: Create Environment File

Create `frontend/.env.production`:
```
VITE_API_URL=https://your-backend-url.com
```

#### Step 3: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend
cd frontend

# Deploy
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name? `sign-language-translator`
- Directory? `./`
- Override settings? **N**

#### Step 4: Add Environment Variables

In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add: `VITE_API_URL` = `https://your-backend-url.com`
3. Redeploy

Your app: `https://sign-language-translator.vercel.app`

### Option 2: Netlify

#### Step 1: Build the App

```bash
cd frontend
npm run build
```

#### Step 2: Create `netlify.toml`

Create `frontend/netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  VITE_API_URL = "https://your-backend-url.com"
```

#### Step 3: Deploy

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

Your app: `https://sign-language-translator.netlify.app`

### Option 3: GitHub Pages

#### Step 1: Update `vite.config.js`

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/sign-language-translator/',  // Your repo name
  // ... rest of config
})
```

#### Step 2: Build and Deploy

```bash
cd frontend
npm run build

# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

Your app: `https://yourusername.github.io/sign-language-translator/`

## Full-Stack Deployment

### Option: Docker Compose (Self-Hosted)

#### Step 1: Create `docker-compose.yml` in project root

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
    volumes:
      - ./backend/models:/app/models

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    environment:
      - VITE_API_URL=http://localhost:5000
```

#### Step 2: Create Frontend Dockerfile

Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Step 3: Deploy

```bash
docker-compose up -d
```

## Environment Variables

### Backend Variables

```bash
# Required
FLASK_ENV=production

# Optional
PORT=5000
MODEL_PATH=/app/models
MAX_CONTENT_LENGTH=10485760  # 10MB
ALLOWED_ORIGINS=https://your-frontend.com

# Security
SECRET_KEY=your-secret-key-here
```

### Frontend Variables

```bash
# Required
VITE_API_URL=https://your-backend-url.com

# Optional
VITE_APP_NAME=Sign Language Translator
VITE_ENABLE_ANALYTICS=false
```

## Post-Deployment Checklist

### Security

- [ ] Enable HTTPS (SSL certificate)
- [ ] Set up CORS properly
- [ ] Add rate limiting
- [ ] Implement authentication (if needed)
- [ ] Add API key protection
- [ ] Set up firewall rules
- [ ] Enable security headers

### Performance

- [ ] Enable CDN for frontend
- [ ] Add caching headers
- [ ] Optimize model loading
- [ ] Enable gzip compression
- [ ] Monitor response times
- [ ] Set up load balancing (if needed)

### Monitoring

- [ ] Set up error tracking (Sentry)
- [ ] Add logging (CloudWatch, Loggly)
- [ ] Monitor uptime (UptimeRobot)
- [ ] Track analytics (Google Analytics)
- [ ] Monitor API usage
- [ ] Set up alerts

### Testing

```bash
# Test backend
curl https://your-backend-url.com/

# Test prediction
curl -X POST https://your-backend-url.com/predict \
  -F "image=@test.jpg" \
  -F "model=vgg16"

# Test frontend
# Open in browser and test all features
```

## Custom Domain

### Backend (Render example)

1. Go to Render dashboard → Settings
2. Click "Add Custom Domain"
3. Enter: `api.yourdomain.com`
4. Add CNAME record in your DNS:
   ```
   CNAME api sign-language-api.onrender.com
   ```

### Frontend (Vercel example)

1. Go to Vercel dashboard → Settings → Domains
2. Add domain: `yourdomain.com`
3. Add DNS records as shown

## Scaling Considerations

### Backend Scaling

**For high traffic:**
1. Use load balancer
2. Add multiple workers: `gunicorn --workers 4`
3. Implement caching (Redis)
4. Use CDN for model files
5. Consider GPU instances for faster inference

### Frontend Scaling

1. Use CDN (Cloudflare, AWS CloudFront)
2. Enable caching
3. Optimize assets
4. Use lazy loading
5. Implement code splitting

## Cost Estimation

### Free Tier Limits

**Render:**
- ✅ Free tier available
- ⏰ Spins down after inactivity
- 💾 500MB RAM

**Vercel:**
- ✅ Free for personal projects
- 📊 100GB bandwidth/month
- ⚡ Unlimited requests

### Paid Options (Monthly)

**Backend:**
- Render: $7/month (always on)
- Heroku: $7/month (hobby)
- Google Cloud Run: Pay-per-use (~$5-20)

**Frontend:**
- Vercel Pro: $20/month
- Netlify Pro: $19/month
- Usually free tier is sufficient

## Troubleshooting

### Common Issues

**CORS errors:**
```python
# backend/app.py
from flask_cors import CORS
CORS(app, origins=['https://your-frontend.com'])
```

**Large model files:**
- Use Git LFS
- Upload directly to server
- Store in cloud storage (S3)

**Slow cold starts:**
- Keep service warm with ping
- Increase RAM allocation
- Use serverless alternatives

## Backup & Maintenance

### Regular Tasks

1. **Backup models:** Weekly to cloud storage
2. **Update dependencies:** Monthly security updates
3. **Monitor logs:** Check for errors daily
4. **Performance testing:** Weekly load tests
5. **Update documentation:** As features change

### Database (if added later)

```bash
# Backup PostgreSQL
pg_dump dbname > backup.sql

# Backup MongoDB
mongodump --db dbname --out /backup/
```

## Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Google Cloud Run Guide](https://cloud.google.com/run/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Nginx Configuration](https://nginx.org/en/docs/)

## Support

For deployment issues:
1. Check platform status pages
2. Review deployment logs
3. Test locally first
4. Contact platform support
5. Check community forums

---

**Happy Deploying! 🚀**

Remember: Start with free tiers, scale as needed!
