import cv2
import numpy as np
import insightface
from typing import Optional, Tuple, List
from sqlalchemy.orm import Session
from app.models.user import User

class FaceRecognitionService:
    def __init__(self):
        try:
            # OPTIMIZATION: Only load the specific modules required for verification.
            # This cuts down RAM usage by more than half.
            self.model = insightface.app.FaceAnalysis(
                name='buffalo_l',
                allowed_modules=['detection', 'recognition']
            )
            self.model.prepare(ctx_id=0, det_size=(640, 480))
            print("✓ InsightFace model loaded (Memory-Optimized Mode)")
        except Exception as e:
            print(f"✗ Error loading model: {e}")
            self.model = None
    
    def extract_embedding(self, image_path: str) -> Optional[np.ndarray]:
        """Extract 512 numbers from face"""
        try:
            img = cv2.imread(image_path)
            if img is None:
                return None
            
            img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            faces = self.model.get(img_rgb)
            
            if len(faces) == 0:
                return None
            
            embedding = faces[0].embedding
            print(f"✓ Face embedding extracted")
            return embedding
        
        except Exception as e:
            print(f"✗ Error extracting embedding: {e}")
            return None
    
    def recognize_face(self, test_image_path: str, db: Session) -> Tuple[Optional[dict], float, List[dict]]:
        """Recognize face from DATABASE"""
        try:
            test_embedding = self.extract_embedding(test_image_path)
            if test_embedding is None:
                return None, 0.0, []
            
            # Get all users FROM DATABASE
            db_users = db.query(User).all()
            if not db_users:
                return None, 0.0, []
            
            scores = {}
            for user in db_users:
                try:
                    if not user.embedding:
                        continue
                    # Load embedding FROM DATABASE
                    saved_embedding = np.frombuffer(user.embedding, dtype=np.float32)
                    
                    test_norm = test_embedding / np.linalg.norm(test_embedding)
                    saved_norm = saved_embedding / np.linalg.norm(saved_embedding)
                    
                    similarity = np.dot(test_norm, saved_norm)
                    scores[user.id] = {
                        "user": user,
                        "confidence": float(similarity)
                    }
                except Exception as e:
                    print(f"✗ Error processing match for user {user.id}: {e}")
                    continue
            
            if not scores:
                return None, 0.0, []
            
            top_5 = sorted(scores.items(), key=lambda x: x[1]["confidence"], reverse=True)[:5]
            
            best_id, best_data = top_5[0]
            best_confidence = best_data["confidence"]
            best_user = best_data["user"]
            
            top_5_matches = [
                {
                    "user_id": uid,
                    "name": data["user"].name,
                    "confidence": data["confidence"],
                    "percentage": f"{data['confidence'] * 100:.1f}%"
                }
                for uid, data in top_5
            ]
            
            return best_user.to_dict(), best_confidence, top_5_matches
        
        except Exception as e:
            print(f"✗ Recognition process crashed: {e}")
            return None, 0.0, []