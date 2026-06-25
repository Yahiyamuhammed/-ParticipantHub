import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = os.path.join(BASE_DIR, 'data')
PARTICIPANTS_DIR = os.path.join(DATA_DIR, 'participants')
EMBEDDINGS_DIR = os.path.join(DATA_DIR, 'embeddings')

os.makedirs(PARTICIPANTS_DIR, exist_ok=True)
os.makedirs(EMBEDDINGS_DIR, exist_ok=True)

API_TITLE = "Sahithyolsav Face Recognition API"
API_VERSION = "1.0.0"
API_DESCRIPTION = "Face recognition system for Sahithyolsav event"

RECOGNITION_THRESHOLD = 0.5
MODEL_NAME = "buffalo_l"