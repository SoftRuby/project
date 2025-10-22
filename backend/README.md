# Backend - Sign Language Translator API

Flask-based REST API for ASL gesture recognition using deep learning models.

## Setup

1. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Add your trained models:
   - Place `model_vgg16.h5` in this directory
   - Place `model_resnet.h5` in this directory

4. Run the server:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /
```

### Predict Gesture
```
POST /predict
Content-Type: multipart/form-data

Parameters:
- image: Image file (JPEG/PNG)
- model: "vgg16" or "resnet50" (optional, default: "vgg16")
```

### Get Available Models
```
GET /models
```

### Get All Labels
```
GET /labels
```

## Model Requirements

Models should be trained on 64x64 RGB images with 40 output classes (ASL gestures).

If models are not present, the API will use dummy models for testing purposes (random predictions).

## Environment Variables

- `FLASK_ENV`: Set to `production` for deployment
- `PORT`: Server port (default: 5000)

## Testing

You can test the API using curl:

```bash
curl -X POST -F "image=@test_image.jpg" -F "model=vgg16" http://localhost:5000/predict
```

Or using Python:

```python
import requests

with open('test_image.jpg', 'rb') as f:
    files = {'image': f}
    data = {'model': 'vgg16'}
    response = requests.post('http://localhost:5000/predict', files=files, data=data)
    print(response.json())
```
