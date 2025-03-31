# First test_model.py create :

import tensorflow as tf
import cv2
import numpy as np
import os

def load_and_test_model(model_path, image_path):
    try:
        # 1. Load the model
        print(f"Loading model from: {model_path}")
        model = tf.keras.models.load_model(model_path)
        print("Model loaded successfully!")

        # 2. Load and preprocess the image
        print(f"Loading image from: {image_path}")
        img = cv2.imread(image_path)
        if img is None:
            raise ValueError(f"Could not read image at {image_path}")
        
        # Resize to 416x416
        img = cv2.resize(img, (416, 416))
        
        # Convert BGR to RGB
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
        # Normalize pixel values
        img = img / 255.0
        
        # Add batch dimension
        img = np.expand_dims(img, axis=0)
        
        # 3. Make prediction
        print("Making prediction...")
        predictions = model.predict(img, verbose=0)
        
        # 4. Process results
        vegetables = [
            'tomato', 'carrot', 'onion', 
            'potato', 'cucumber', 'bell pepper'
        ]
        
        print("\nDetected Vegetables:")
        print("-------------------")
        for i, confidence in enumerate(predictions[0]):
            if confidence > 0.5:  # Confidence threshold
                print(f"{vegetables[i].capitalize()}: {confidence:.2f}")
        
        return predictions

    except Exception as e:
        print(f"Error: {str(e)}")
        return None