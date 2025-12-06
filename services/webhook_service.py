class WebhookService:
    async def process_incoming_webhook(self, payload: dict):
        """
        EasyConnect বা Qubic Network থেকে আসা ইভেন্ট প্রসেস করা।
        """
        event_type = payload.get("event_type")
        data = payload.get("data", {})

        print(f"📡 Webhook Received: {event_type}")

        if event_type == "PAYMENT_RECEIVED":
            # পেমেন্ট কনফার্মেশন লজিক
            sender = data.get("sender")
            amount = data.get("amount")
            return {
                "status": "processed", 
                "action": "Payment Verified", 
                "details": f"Received {amount} from {sender}"
            }
        
        elif event_type == "FRAUD_ALERT":
            # এক্সটার্নাল কোনো সিস্টেম যদি ফ্রড ডিটেক্ট করে
            return {"status": "alerted", "action": "Flagged as Fraud"}

        return {"status": "ignored", "message": "Unknown event type"}
      
