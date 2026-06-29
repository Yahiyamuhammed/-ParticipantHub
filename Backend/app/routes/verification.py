from fastapi import APIRouter, File, UploadFile, Depends
from sqlalchemy.orm import Session
import numpy as np
import os
import uuid
from app.database import get_db
from app.models.user import User
from app.services.face_service import FaceRecognitionService

router = APIRouter()
face_service = FaceRecognitionService()

TEMP_DIR = "data/temp"
os.makedirs(TEMP_DIR, exist_ok=True)

@router.post("/register")
async def register_participant(
    name: str,
    district: str,
    email: str,
    photo: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Register and save to DATABASE (not files!)"""
    try:
        # Check if email exists
        if db.query(User).filter(User.email == email).first():
            return {"success": False, "message": "Email already registered"}
        
        # Save temp photo
        temp_path = f"{TEMP_DIR}/{uuid.uuid4()}.jpg"
        with open(temp_path, "wb") as f:
            f.write(await photo.read())
        
        # Extract embedding
        embedding = face_service.extract_embedding(temp_path)
        
        # DELETE PHOTO (we only need embedding!)
        os.remove(temp_path)
        
        if embedding is None:
            return {"success": False, "message": "No face detected"}
        
        # Convert to bytes
        embedding_bytes = embedding.astype(np.float32).tobytes()
        
        # SAVE TO DATABASE (NOT FILES!)
        new_user = User(
            name=name,
            district=district,
            email=email,
            embedding=embedding_bytes  # ← IN DATABASE!
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        return {
            "success": True,
            "message": f"{name} registered!",
            "user_id": new_user.id,
            "user": new_user.to_dict()
        }
    
    except Exception as e:
        db.rollback()
        return {"success": False, "message": str(e)}

@router.post("/recognize")
async def recognize_face(
    photo: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Recognize and search DATABASE (not files!)"""
    try:
        # Save temp photo
        temp_path = f"{TEMP_DIR}/{uuid.uuid4()}.jpg"
        with open(temp_path, "wb") as f:
            f.write(await photo.read())
        
        # Recognize FROM DATABASE
        user_data, confidence, top_5 = face_service.recognize_face(temp_path, db)
        
        # DELETE PHOTO
        os.remove(temp_path)
        
        if user_data is None:
            return {"success": False, "message": "Face not recognized"}
        
        return {
            "success": True,
            "message": "Face recognized!",
            "user": user_data,
            "confidence": confidence,
            "percentage": f"{confidence * 100:.1f}%",
            "top_5_matches": top_5
        }
    
    except Exception as e:
        return {"success": False, "message": str(e)}

@router.get("/users")
async def get_all_users(db: Session = Depends(get_db)):
    """Get all users FROM DATABASE"""
    users = db.query(User).all()
    return {
        "success": True,
        "count": len(users),
        "users": [u.to_dict() for u in users]
    }

@router.get("/user/{user_id}")
async def get_user(user_id: int, db: Session = Depends(get_db)):
    """Get user FROM DATABASE"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return {"success": False, "message": "Not found"}
    return {"success": True, "user": user.to_dict()}

@router.delete("/user/{user_id}")
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    """Delete user FROM DATABASE"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return {"success": False, "message": "Not found"}
    
    db.delete(user)
    db.commit()
    
    return {"success": True, "message": f"User deleted"}