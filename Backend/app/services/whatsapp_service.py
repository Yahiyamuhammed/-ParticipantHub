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
        # Base structure
        template_payload = {
            "name": template_name,
            "language": {"code": "en_US"} # Changed to match your templates
        }
        
        # Only add components if variables are provided
        if components:
            template_payload["components"] = [{"type": "body", "parameters": components}]
            
        payload = {
            "messaging_product": "whatsapp",
            "to": to_phone,
            "type": "template",
            "template": template_payload
        }
        
        response = requests.post(self.url, headers=self.headers, json=payload)
        return response

    # Example: How to send the templates you listed
    def send_order_confirmation(self, phone: str, name: str, order_id: str, date: str):
        # Matches jaspers_market_order_confirmation_v1 (3 variables)
        return self._send_template(phone, "jaspers_market_order_confirmation_v1", [
            {"type": "text", "text": name},
            {"type": "text", "text": order_id},
            {"type": "text", "text": date}
        ])

    def send_hello(self, phone: str):
        # Matches hello_world (0 variables)
        return self._send_template(phone, "hello_world")