from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow import keras
import numpy as np
import cv2
import json
import os
from utils import preprocess_image, load_models, load_labels

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load models and labels at startup
models = load_models()
labels = load_labels()

@app.route('/', methods=['GET'])
def home():
    """Health check endpoint"""
    return jsonify({
        'status': 'success',
        'message': 'Sign Language Translator API is running',
        'version': '1.0',
        'models_available': list(models.keys()),
        'total_classes': len(labels)
    })

@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict ASL gesture from image
    Expects:
    - 'image': image file (JPEG/PNG)
    - 'model': model name ('vgg16' or 'resnet50'), default is 'vgg16'
    """
    try:
        # Check if image file is present
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        # Get the selected model (default to vgg16)
        model_name = request.form.get('model', 'vgg16').lower()
        
        if model_name not in models:
            return jsonify({'error': f'Model {model_name} not available'}), 400
        
        # Read image file
        image_file = request.files['image']
        image_bytes = image_file.read()
        
        # Convert bytes to numpy array
        nparr = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            return jsonify({'error': 'Invalid image file'}), 400
        
        # Preprocess the image
        processed_image = preprocess_image(image)
        
        # Get the model
        model = models[model_name]
        
        # Make prediction
        predictions = model.predict(processed_image, verbose=0)
        predicted_class = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class])
        
        # Get the label
        predicted_label = labels[predicted_class]
        
        return jsonify({
            'prediction': predicted_label,
            'confidence': round(confidence * 100, 2),
            'model_used': model_name,
            'class_index': int(predicted_class)
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/models', methods=['GET'])
def get_models():
    """Get available models"""
    return jsonify({
        'available_models': list(models.keys()),
        'default_model': 'vgg16'
    })

@app.route('/labels', methods=['GET'])
def get_labels():
    """Get all available labels"""
    return jsonify({
        'labels': labels,
        'total_classes': len(labels)
    })

if __name__ == '__main__':
    print("🚀 Starting Sign Language Translator API...")
    print(f"📊 Loaded {len(models)} model(s)")
    print(f"🏷️  Loaded {len(labels)} class labels")
    app.run(host='0.0.0.0', port=5000, debug=True)
