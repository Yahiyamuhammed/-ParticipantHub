from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.whatsapp_service import WhatsAppService

router = APIRouter(prefix="/api/notifications", tags=["notifications"])
whatsapp_service = WhatsAppService()

class OrderData(BaseModel):
    phone: str
    name: str
    order_id: str
    date: str

class SimpleData(BaseModel):
    phone: str

@router.post("/order-confirmation")
async def notify_order(data: OrderData):
    response = whatsapp_service.send_order_confirmation(data.phone, data.name, data.order_id, data.date)
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail=response.json())
    return {"success": True}

@router.post("/hello")
async def notify_hello(data: SimpleData):
    response = whatsapp_service.send_hello(data.phone)
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail=response.json())
    return {"success": True}

@router.post("/plain-alert")
async def notify_plain(data: SimpleData):
    response = whatsapp_service.send_plain_text(data.phone)
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail=response.json())
    return {"success": True}