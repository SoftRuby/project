import tensorflow as tf
from tensorflow import keras
import numpy as np
import cv2
import json
import os

def preprocess_image(image):
    """
    Preprocess image for model prediction
    - Resize to 64x64
    - Convert BGR to RGB
    - Normalize pixel values to [0, 1]
    - Expand dimensions for batch processing
    """
    # Resize to 64x64
    resized = cv2.resize(image, (64, 64))
    
    # Convert BGR to RGB (OpenCV loads as BGR)
    rgb_image = cv2.cvtColor(resized, cv2.COLOR_BGR2RGB)
    
    # Normalize pixel values to [0, 1]
    normalized = rgb_image.astype('float32') / 255.0
    
    # Expand dimensions to create batch of 1 image
    expanded = np.expand_dims(normalized, axis=0)
    
    return expanded

def load_models():
    """
    Load pre-trained VGG16 and ResNet50 models
    Returns a dictionary of models
    """
    models = {}
    
    # Try to load VGG16 model
    vgg16_path = 'model_vgg16.h5'
    if os.path.exists(vgg16_path):
        try:
            models['vgg16'] = keras.models.load_model(vgg16_path)
            print(f"✅ Loaded VGG16 model from {vgg16_path}")
        except Exception as e:
            print(f"⚠️  Failed to load VGG16 model: {e}")
            models['vgg16'] = create_dummy_model()
    else:
        print(f"⚠️  VGG16 model not found at {vgg16_path}, creating dummy model")
        models['vgg16'] = create_dummy_model()
    
    # Try to load ResNet50 model
    resnet_path = 'model_resnet.h5'
    if os.path.exists(resnet_path):
        try:
            models['resnet50'] = keras.models.load_model(resnet_path)
            print(f"✅ Loaded ResNet50 model from {resnet_path}")
        except Exception as e:
            print(f"⚠️  Failed to load ResNet50 model: {e}")
            models['resnet50'] = create_dummy_model()
    else:
        print(f"⚠️  ResNet50 model not found at {resnet_path}, creating dummy model")
        models['resnet50'] = create_dummy_model()
    
    return models

def create_dummy_model():
    """
    Create a dummy model for testing when actual trained models are not available
    This is for development/testing purposes only
    """
    from tensorflow.keras import Sequential
    from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
    
    model = Sequential([
        Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 3)),
        MaxPooling2D((2, 2)),
        Conv2D(64, (3, 3), activation='relu'),
        MaxPooling2D((2, 2)),
        Conv2D(64, (3, 3), activation='relu'),
        Flatten(),
        Dense(128, activation='relu'),
        Dropout(0.5),
        Dense(40, activation='softmax')  # 40 ASL classes
    ])
    
    print("⚠️  Using dummy model (random predictions)")
    return model

def load_labels():
    """
    Load ASL class labels from labels.json
    Returns a list of label names
    """
    labels_path = 'labels.json'
    
    if os.path.exists(labels_path):
        try:
            with open(labels_path, 'r') as f:
                labels = json.load(f)
            print(f"✅ Loaded {len(labels)} labels from {labels_path}")
            return labels
        except Exception as e:
            print(f"⚠️  Failed to load labels: {e}")
            return create_default_labels()
    else:
        print(f"⚠️  Labels file not found at {labels_path}, creating default labels")
        return create_default_labels()

def create_default_labels():
    """
    Create default ASL labels (A-Z, 0-9, and common phrases)
    """
    # 26 letters + 10 numbers + 4 common phrases = 40 classes
    letters = [chr(i) for i in range(ord('A'), ord('Z') + 1)]
    numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    phrases = ['HELLO', 'THANK YOU', 'I LOVE YOU', 'PLEASE']
    
    return letters + numbers + phrases
