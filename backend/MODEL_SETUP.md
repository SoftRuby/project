# Model Setup Guide

This guide explains how to add your pre-trained ASL recognition models to the application.

## Required Models

You need two trained model files:

1. **model_vgg16.h5** - VGG16 architecture model
2. **model_resnet.h5** - ResNet50 architecture model

## Model Specifications

Both models should have the following specifications:

### Input
- **Shape**: (64, 64, 3)
- **Type**: RGB images
- **Normalization**: Pixel values scaled to [0, 1]

### Output
- **Classes**: 40 (ASL gestures)
- **Activation**: Softmax
- **Labels**: See `labels.json` for the complete list

### Training Details

The models should be trained on American Sign Language gestures including:
- 26 letters (A-Z)
- 10 numbers (0-9)
- 4 common phrases (HELLO, THANK YOU, I LOVE YOU, PLEASE)

## Adding Your Models

1. Place your trained model files in the `backend/` directory:
   ```
   backend/
   ├── model_vgg16.h5     # Your VGG16 model here
   ├── model_resnet.h5    # Your ResNet50 model here
   └── ...
   ```

2. Ensure the models are trained with the same class order as `labels.json`

3. Test the models:
   ```bash
   python app.py
   ```

## If You Don't Have Trained Models

The application will automatically use dummy models for testing purposes. These models will:
- Generate random predictions
- Allow you to test the full application flow
- Show a warning message in the console

### Training Your Own Models

If you want to train your own models, here's a basic guide:

#### 1. Collect Dataset

Gather or download an ASL dataset with:
- 64x64 pixel images
- 40 classes
- RGB color format
- Multiple samples per class (recommended: 500+ per class)

Popular datasets:
- ASL Alphabet Dataset (Kaggle)
- ASL MNIST Dataset
- Custom collected dataset

#### 2. Model Training Code Example

```python
import tensorflow as tf
from tensorflow.keras.applications import VGG16, ResNet50
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, Dropout, GlobalAveragePooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Load and prepare data
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    horizontal_flip=True,
    validation_split=0.2
)

train_generator = train_datagen.flow_from_directory(
    'path/to/dataset',
    target_size=(64, 64),
    batch_size=32,
    class_mode='categorical',
    subset='training'
)

validation_generator = train_datagen.flow_from_directory(
    'path/to/dataset',
    target_size=(64, 64),
    batch_size=32,
    class_mode='categorical',
    subset='validation'
)

# Build VGG16 model
base_model = VGG16(weights='imagenet', include_top=False, input_shape=(64, 64, 3))

# Freeze base layers
for layer in base_model.layers:
    layer.trainable = False

# Add custom top layers
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(256, activation='relu')(x)
x = Dropout(0.5)(x)
predictions = Dense(40, activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=predictions)

# Compile
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Train
history = model.fit(
    train_generator,
    epochs=50,
    validation_data=validation_generator,
    callbacks=[
        tf.keras.callbacks.EarlyStopping(patience=5, restore_best_weights=True),
        tf.keras.callbacks.ReduceLROnPlateau(patience=3)
    ]
)

# Save model
model.save('model_vgg16.h5')

# Repeat for ResNet50
# Use ResNet50 instead of VGG16 in the base_model
```

#### 3. Evaluate Your Model

```python
# Load model
model = tf.keras.models.load_model('model_vgg16.h5')

# Evaluate on test set
test_loss, test_accuracy = model.evaluate(validation_generator)
print(f'Test Accuracy: {test_accuracy * 100:.2f}%')

# Test single prediction
import cv2
import numpy as np

img = cv2.imread('test_image.jpg')
img = cv2.resize(img, (64, 64))
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
img = img.astype('float32') / 255.0
img = np.expand_dims(img, axis=0)

prediction = model.predict(img)
predicted_class = np.argmax(prediction[0])
confidence = prediction[0][predicted_class]

print(f'Predicted: {labels[predicted_class]} ({confidence*100:.2f}%)')
```

## Model Performance Tips

### For Better Accuracy:

1. **Data Augmentation**: Rotate, flip, and adjust brightness/contrast
2. **More Training Data**: Aim for 500+ images per class
3. **Diverse Data**: Different lighting, backgrounds, hand positions
4. **Transfer Learning**: Use pre-trained ImageNet weights
5. **Fine-tuning**: Unfreeze some base layers after initial training
6. **Ensemble Methods**: Combine predictions from multiple models

### Optimization:

1. **Model Quantization**: Reduce model size
2. **TensorFlow Lite**: Convert for mobile deployment
3. **ONNX**: Cross-platform model format

## Troubleshooting

### Model Loading Errors

**Error: "Unable to open file"**
- Check file path and permissions
- Ensure model file is not corrupted

**Error: "Incompatible model format"**
- Verify model was saved with compatible TensorFlow version
- Check model architecture matches expectations

**Error: "Shape mismatch"**
- Ensure input images are 64x64x3
- Verify output has 40 classes

### Low Accuracy

- Check if model is properly trained
- Verify class order matches labels.json
- Ensure image preprocessing is consistent
- Test with known good images

## Model Versioning

Keep track of your models:

```
models/
├── v1/
│   ├── model_vgg16.h5
│   ├── model_resnet.h5
│   └── training_metrics.json
├── v2/
│   └── ...
```

Document:
- Training date
- Dataset used
- Accuracy metrics
- Changes from previous version

## Resources

- [TensorFlow Keras Documentation](https://www.tensorflow.org/api_docs/python/tf/keras)
- [Transfer Learning Guide](https://www.tensorflow.org/tutorials/images/transfer_learning)
- [ASL Datasets on Kaggle](https://www.kaggle.com/search?q=sign+language)
- [Model Optimization Toolkit](https://www.tensorflow.org/model_optimization)
