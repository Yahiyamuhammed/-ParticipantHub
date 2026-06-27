import requests
from app.config import WHATSAPP_API_URL, WHATSAPP_TOKEN, WHATSAPP_PHONE_ID

class WhatsAppService:
    def __init__(self):
        self.url = f"{WHATSAPP_API_URL}/{WHATSAPP_PHONE_ID}/messages"
        self.headers = {
            "Authorization": f"Bearer {WHATSAPP_TOKEN}",
            "Content-Type": "application/json"
        }

    def _send_template(self, to_phone: str, template_name: str, components: list):
        payload = {
            "messaging_product": "whatsapp",
            "to": to_phone,
            "type": "template",
            "template": {
                "name": template_name,
                "language": {"code": "en"},
                "components": [{"type": "body", "parameters": components}]
            }
        }
        return requests.post(self.url, headers=self.headers, json=payload)

    # The 5 Template Senders
    def send_event_info(self, phone: str, name: str, date: str):
        # Maps to {{1}} and {{2}} in your Meta template
        return self._send_template(phone, "event_welcome", [
            {"type": "text", "text": name},
            {"type": "text", "text": date}
        ])

    def send_stage_time(self, phone: str, stage: str, time: str):
        return self._send_template(phone, "stage_info", [
            {"type": "text", "text": stage},
            {"type": "text", "text": time}
        ])

    # ... add other methods for change, thanks, and results