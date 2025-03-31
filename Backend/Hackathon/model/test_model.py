# model/run_model.py
from test_model import load_and_test_model
import os

# Get the absolute path to the model directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Paths relative to the model/ directory
MODEL_PATH = os.path.join(BASE_DIR, "vegetable_detector.keras")
IMAGE_PATH = os.path.join(BASE_DIR, "vegetables3.jpeg")

# Test the model
results = load_and_test_model(MODEL_PATH, IMAGE_PATH)