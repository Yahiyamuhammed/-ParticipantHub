import insightface
import numpy as np
import os
import cv2
from typing import Tuple, List, Optional
from app.config import EMBEDDINGS_DIR, MODEL_NAME

class FaceRecognitionService:
    def __init__(self):
        try:
            self.model = insightface.app.FaceAnalysis(name=MODEL_NAME)
            self.model.prepare(ctx_id=0, det_size=(640, 480))
            print("✓ InsightFace model loaded")
        except Exception as e:
            print(f"✗ Error loading model: {e}")
            self.model = None
        
        self.embeddings = {}
        self.load_all_embeddings()
    
    def extract_embedding(self, image_path: str) -> Optional[np.ndarray]:
        """Extract face embedding from image"""
        try:
            if not os.path.exists(image_path):
                print(f"✗ Image not found: {image_path}")
                return None
            
            # Use cv2.imread instead of insightface.utils.imread
            img = cv2.imread(image_path)
            
            if img is None:
                print(f"✗ Failed to read image: {image_path}")
                return None
            
            # Convert BGR to RGB for insightface
            img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            
            faces = self.model.get(img_rgb)
            
            if len(faces) == 0:
                print("✗ No face detected in image")
                return None
            
            embedding = faces[0].embedding
            print(f"✓ Face embedding extracted (512-d)")
            return embedding
        
        except Exception as e:
            print(f"✗ Error extracting embedding: {e}")
            return None
    
    def save_embedding(self, participant_id: int, embedding: np.ndarray):
        """Save embedding to file"""
        try:
            embedding_file = os.path.join(
                EMBEDDINGS_DIR,
                f"participant_{participant_id}.npy"
            )
            np.save(embedding_file, embedding)
            self.embeddings[participant_id] = embedding
            print(f"✓ Embedding saved: participant_{participant_id}.npy")
        
        except Exception as e:
            print(f"✗ Error saving embedding: {e}")
    
    def load_embedding(self, participant_id: int) -> Optional[np.ndarray]:
        """Load embedding from file"""
        try:
            if participant_id in self.embeddings:
                return self.embeddings[participant_id]
            
            embedding_file = os.path.join(
                EMBEDDINGS_DIR,
                f"participant_{participant_id}.npy"
            )
            
            if os.path.exists(embedding_file):
                embedding = np.load(embedding_file)
                self.embeddings[participant_id] = embedding
                return embedding
            
            return None
        
        except Exception as e:
            print(f"✗ Error loading embedding: {e}")
            return None
    
    def load_all_embeddings(self):
        """Load all embeddings from disk"""
        try:
            if not os.path.exists(EMBEDDINGS_DIR):
                print("✓ Embeddings directory is empty")
                return
            
            count = 0
            for file in os.listdir(EMBEDDINGS_DIR):
                if file.endswith(".npy"):
                    try:
                        participant_id = int(file.split("_")[1].split(".")[0])
                        embedding = np.load(os.path.join(EMBEDDINGS_DIR, file))
                        self.embeddings[participant_id] = embedding
                        count += 1
                    except Exception as e:
                        print(f"✗ Error loading {file}: {e}")
            
            print(f"✓ Loaded {count} embeddings")
        
        except Exception as e:
            print(f"✗ Error loading embeddings: {e}")
    
    def recognize_face(
        self,
        test_image_path: str,
        id_to_name_map: Optional[dict] = None  # <-- Add this parameter
    ) -> Tuple[Optional[int], float, List[dict]]:
        """
        Recognize face from image
        Returns: (best_match_id, confidence, top_5_matches)
        """
        try:
            test_embedding = self.extract_embedding(test_image_path)
            
            if test_embedding is None:
                return None, 0.0, []
            
            if not self.embeddings:
                print("✗ No saved embeddings to compare")
                return None, 0.0, []
            
            # Calculate cosine similarity
            scores = {}
            
            for participant_id, saved_embedding in self.embeddings.items():
                try:
                    # Normalize embeddings
                    test_norm = test_embedding / np.linalg.norm(test_embedding)
                    saved_norm = saved_embedding / np.linalg.norm(saved_embedding)
                    
                    # Cosine similarity
                    similarity = np.dot(test_norm, saved_norm)
                    scores[participant_id] = float(similarity)
                
                except Exception as e:
                    print(f"✗ Error comparing with participant {participant_id}: {e}")
                    continue
            
            if not scores:
                return None, 0.0, []
            
            # Get top 5 matches
            top_5 = sorted(
                scores.items(),
                key=lambda x: x[1],
                reverse=True
            )[:5]
            
            best_match_id = top_5[0][0]
            best_confidence = top_5[0][1]
            
            # Format top 5 (Modified to include name if available)
            top_5_matches = [
                {
                    "participant_id": pid,
                    "name": id_to_name_map.get(pid, "Unknown") if id_to_name_map else "Unknown",
                    "confidence": conf,
                    "percentage": f"{conf * 100:.1f}%"
                }
                for pid, conf in top_5
            ]
            
            return best_match_id, best_confidence, top_5_matches
        
        except Exception as e:
            print(f"✗ Error recognizing face: {e}")
            return None, 0.0, []