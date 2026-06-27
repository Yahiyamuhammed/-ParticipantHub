from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.whatsapp_service import WhatsAppService

router = APIRouter(prefix="/api/notifications", tags=["notifications"])
whatsapp_service = WhatsAppService()

class WhatsAppMessage(BaseModel):
    phone_number: str
    template_name: str
    components: list  # List of variables to fill {{1}}, {{2}}...

@router.post("/send")
async def send_notification(message: WhatsAppMessage):
    try:
        response = whatsapp_service._send_template(
            to_phone=message.phone_number,
            template_name=message.template_name,
            components=message.components
        )
        if response.status_code == 200:
            return {"success": True, "message": "Notification sent!"}
        else:
            raise HTTPException(status_code=response.status_code, detail=response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))