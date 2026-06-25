from datetime import datetime
from typing import List, Optional

class Participant:
    def __init__(self, id: int, name: str, district: str, email: str, photo_path: Optional[str] = None):
        self.id = id
        self.name = name
        self.district = district
        self.email = email
        self.photo_path = photo_path
        self.status = "registered"
        self.created_at = datetime.now()
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "district": self.district,
            "email": self.email,
            "photo_path": self.photo_path,
            "status": self.status,
            "created_at": str(self.created_at)
        }


class FaceEncoding:
    def __init__(self, participant_id: int, embedding: List[float], embedding_path: Optional[str] = None):
        self.participant_id = participant_id
        self.embedding = embedding
        self.embedding_path = embedding_path
        self.created_at = datetime.now()
    
    def to_dict(self):
        return {
            "participant_id": self.participant_id,
            "embedding_path": self.embedding_path,
            "created_at": str(self.created_at)
        }


class Recognition:
    def __init__(self, participant_id: int, confidence: float, status: str = "success"):
        self.id = datetime.now().timestamp()
        self.participant_id = participant_id
        self.confidence = confidence
        self.status = status
        self.timestamp = datetime.now()
    
    def to_dict(self):
        return {
            "id": self.id,
            "participant_id": self.participant_id,
            "confidence": self.confidence,
            "status": self.status,
            "timestamp": str(self.timestamp)
        }