"""Spiral analysis using a Keras CNN feature extractor and a PCA + SVM classification head."""

import os
import json
import math
from typing import Literal, Tuple
import cv2
import numpy as np
from joblib import load
from tensorflow.keras.models import Model, load_model

from models.schemas import SpiralAnalysisResponse

# Path to the directory containing model artifacts
MODEL_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "ml_models")
CNN_MODEL_PATH = os.path.join(MODEL_DIR, "parkinson_disease_detection.h5")
PCA_PATH = os.path.join(MODEL_DIR, "pca.joblib")
SVM_PATH = os.path.join(MODEL_DIR, "svm.joblib")
LABEL_ENCODER_PATH = os.path.join(MODEL_DIR, "label_encoder.joblib")
META_PATH = os.path.join(MODEL_DIR, "meta.json")

# Cached models to avoid reloading on each request
_cnn_model = None
_feature_extractor = None
_pca = None
_svm = None
_label_encoder = None
_meta = {}


def load_ml_pipeline():
    """Lazily loads all ML model files from disk."""
    global _cnn_model, _feature_extractor, _pca, _svm, _label_encoder, _meta

    if _cnn_model is not None:
        return

    if not os.path.exists(CNN_MODEL_PATH):
        raise FileNotFoundError(f"CNN model file not found at: {CNN_MODEL_PATH}")

    # Load layer metadata
    if os.path.exists(META_PATH):
        with open(META_PATH, "r", encoding="utf-8") as f:
            _meta = json.load(f)
    
    feature_layer = _meta.get("feature_layer", "fc1")

    # Load Keras CNN model
    _cnn_model = load_model(CNN_MODEL_PATH, compile=False)

    # Build the feature extractor model mapping inputs to the Dense layer output
    _feature_extractor = Model(
        inputs=_cnn_model.input,
        outputs=_cnn_model.get_layer(feature_layer).output,
        name="feature_extractor"
    )

    # Load Scikit-Learn PCA, SVM, and LabelEncoder
    _pca = load(PCA_PATH)
    _svm = load(SVM_PATH)
    _label_encoder = load(LABEL_ENCODER_PATH)


def preprocess_image(image_bytes: bytes, image_size: Tuple[int, int] = (128, 128)) -> np.ndarray:
    """Decodes, resizes, converts to grayscale, and normalizes the uploaded image."""
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError("Failed to decode uploaded image. Ensure it is a valid drawing image.")

    # Convert to grayscale & resize
    img = cv2.resize(img, image_size)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Normalize pixels to [0.0, 1.0] and add batch/channel dimensions
    img_normalized = img.astype(np.float32) / 255.0
    img_batch = np.expand_dims(img_normalized, axis=(0, -1))
    return img_batch


def calculate_symmetry(image_bytes: bytes) -> float:
    """Estimates drawing symmetry by comparing the vertical left and right half intensities."""
    try:
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE)
        if img is None:
            return 80.0 # Default fallback

        # Resize to static size for intensity counting
        img = cv2.resize(img, (128, 128))
        
        # Binarize to isolate lines (assume light background, dark drawing lines)
        _, thresh = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY_INV)

        # Split into left and right halves
        left_half = thresh[:, :64]
        right_half = thresh[:, 64:]

        left_intensity = float(np.sum(left_half))
        right_intensity = float(np.sum(right_half))

        if left_intensity == 0 and right_intensity == 0:
            return 100.0

        symmetry = min(left_intensity, right_intensity) / max(left_intensity, right_intensity) * 100.0
        return min(100.0, max(0.0, symmetry))
    except Exception:
        return 80.0


def analyze_image_bytes(image_bytes: bytes) -> SpiralAnalysisResponse:
    """Runs the uploaded drawing through the ML pipeline to predict Parkinson's."""
    # Ensure models are loaded
    load_ml_pipeline()

    # Preprocess drawing
    preprocessed_img = preprocess_image(image_bytes)

    # Extract deep features from CNN's fc1 layer
    features = _feature_extractor.predict(preprocessed_img, verbose=0)
    if features.ndim > 2:
        features = features.reshape((features.shape[0], -1))

    # Project features to low-dimensional PCA space (8 components)
    pca_features = _pca.transform(features)

    # Predict using SVM
    pred_idx = int(_svm.predict(pca_features)[0])
    pred_label = _label_encoder.inverse_transform([pred_idx])[0] # 'healthy' or 'parkinson'

    # Compute SVM distance from hyperplane (decision function value)
    decision_val = float(_svm.decision_function(pca_features)[0])

    # Convert distance to probability value via Sigmoid function
    try:
        prob_parkinson = 1.0 / (1.0 + math.exp(-decision_val))
    except OverflowError:
        prob_parkinson = 0.0 if decision_val < 0 else 1.0

    # Map output to standard metric response
    if pred_label == "parkinson":
        # Mapped to 50 - 98 range based on model certainty
        tremor_score = int(round(50.0 + prob_parkinson * 48.0))
    else:
        # Mapped to 0 - 49 range based on closeness to boundary
        tremor_score = int(round(prob_parkinson * 49.0))

    if tremor_score >= 70:
        parkinson_indicator: Literal["low", "moderate", "high"] = "high"
    elif tremor_score >= 25:
        parkinson_indicator = "moderate"
    else:
        parkinson_indicator = "low"

    smoothness = 100 - tremor_score
    symmetry = calculate_symmetry(image_bytes)

    return SpiralAnalysisResponse(
        tremorScore=tremor_score,
        smoothness=smoothness,
        symmetry=int(round(symmetry)),
        speed=0, # Static image drawing doesn't track drawing velocity
        parkinsonIndicator=parkinson_indicator,
    )
