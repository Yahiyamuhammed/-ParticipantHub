from fastapi import APIRouter, File, UploadFile
import os
from app.config import PARTICIPANTS_DIR
from app.services.face_service import FaceRecognitionService
from app.models.participant import Participant, Recognition

router = APIRouter(prefix="/api/verification", tags=["verification"])

face_service = FaceRecognitionService()

participants = {}
recognitions = []
participant_counter = 0


@router.post("/register")
async def register_participant(
    name: str,
    district: str,
    email: str,
    photo: UploadFile = File(...)
):
    try:
        global participant_counter
        participant_counter += 1
        participant_id = participant_counter
        
        photo_path = os.path.join(PARTICIPANTS_DIR, f"{participant_id}_{photo.filename}")
        with open(photo_path, "wb") as f:
            content = await photo.read()
            f.write(content)
        
        participant = Participant(
            id=participant_id,
            name=name,
            district=district,
            email=email,
            photo_path=photo_path
        )
        participants[participant_id] = participant
        
        embedding = face_service.extract_embedding(photo_path)
        
        if embedding is None:
            return {"success": False, "message": "No face detected in photo"}
        
        face_service.save_embedding(participant_id, embedding)
        
        return {
            "success": True,
            "message": f"{name} registered successfully",
            "participant_id": participant_id,
            "participant": participant.to_dict()
        }
    
    except Exception as e:
        return {"success": False, "message": f"Error: {str(e)}"}


@router.post("/recognize")
async def recognize_face(photo: UploadFile = File(...)):
    try:
        temp_path = os.path.join(PARTICIPANTS_DIR, f"temp_{photo.filename}")
        with open(temp_path, "wb") as f:
            content = await photo.read()
            f.write(content)
        
        best_match_id, confidence, top_5 = face_service.recognize_face(temp_path)
        
        if os.path.exists(temp_path):
            os.remove(temp_path)
        
        if best_match_id is None:
            return {"success": False, "message": "Face not recognized"}
        
        participant = participants.get(best_match_id)
        
        if not participant:
            return {"success": False, "message": "Participant not found"}
        
        recognition = Recognition(participant_id=best_match_id, confidence=confidence, status="success")
        recognitions.append(recognition)
        
        participant.status = "checked_in"
        
        return {
            "success": True,
            "message": "Face recognized!",
            "participant": {
                "id": participant.id,
                "name": participant.name,
                "district": participant.district,
                "email": participant.email,
                "status": participant.status
            },
            "confidence": confidence,
            "percentage": f"{confidence * 100:.1f}%",
            "top_5_matches": top_5
        }
    
    except Exception as e:
        return {"success": False, "message": f"Error: {str(e)}"}


@router.get("/participants")
async def get_all_participants():
    try:
        return {
            "success": True,
            "count": len(participants),
            "participants": [p.to_dict() for p in participants.values()]
        }
    except Exception as e:
        return {"success": False, "message": f"Error: {str(e)}"}


@router.get("/logs")
async def get_recognition_logs():
    try:
        return {
            "success": True,
            "count": len(recognitions),
            "logs": [r.to_dict() for r in recognitions]
        }
    except Exception as e:
        return {"success": False, "message": f"Error: {str(e)}"}