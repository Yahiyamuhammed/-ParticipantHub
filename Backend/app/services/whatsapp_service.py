import requests
from app.config import WHATSAPP_API_URL, WHATSAPP_TOKEN, WHATSAPP_PHONE_ID

class WhatsAppService:
    def __init__(self):
        self.url = f"{WHATSAPP_API_URL}/{WHATSAPP_PHONE_ID}/messages"
        self.headers = {
            "Authorization": f"Bearer {WHATSAPP_TOKEN}",
            "Content-Type": "application/json"
        }

    def _send_template(self, to_phone: str, template_name: str, components: list = None):
        payload = {
            "messaging_product": "whatsapp",
            "to": to_phone,
            "type": "template",
            "template": {
                "name": template_name,
                "language": {"code": "en_US"},
                "components": [{"type": "body", "parameters": components}] if components else []
            }
        }
        # If no components, remove the empty list to avoid Meta errors
        if not components:
            del payload["template"]["components"]
            
        return requests.post(self.url, headers=self.headers, json=payload)

    # Specific Service Methods
    def send_order_confirmation(self, phone, name, order_id, date):
        return self._send_template(phone, "jaspers_market_order_confirmation_v1", [
            {"type": "text", "text": name},
            {"type": "text", "text": order_id},
            {"type": "text", "text": date}
        ])

    def send_hello(self, phone):
        return self._send_template(phone, "hello_world")

    def send_plain_text(self, phone):
        return self._send_template(phone, "jaspers_market_plain_text_v1")