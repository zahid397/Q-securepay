import httpx
import os
import asyncio

class AlertService:
    def __init__(self):
        self.bot_token = os.getenv("TELEGRAM_BOT_TOKEN")
        self.chat_id = os.getenv("TELEGRAM_CHAT_ID")
        self.api_url = f"https://api.telegram.org/bot{self.bot_token}/sendMessage"

    async def send_alert(self, title: str, message: str, level: str = "INFO"):
        """
        Telegram এ নোটিফিকেশন পাঠায়। 
        Level: INFO, WARNING, CRITICAL
        """
        if not self.bot_token or not self.chat_id:
            print("⚠️ Telegram credentials not found. Skipping alert.")
            return

        emoji = "🛡️" if level == "INFO" else "⚠️" if level == "WARNING" else "🚨"
        formatted_text = f"{emoji} *{title}*\n\n{message}\n\n_Level: {level}_"

        payload = {
            "chat_id": self.chat_id,
            "text": formatted_text,
            "parse_mode": "Markdown"
        }

        async with httpx.AsyncClient() as client:
            try:
                await client.post(self.api_url, json=payload)
            except Exception as e:
                print(f"❌ Failed to send alert: {e}")
              
