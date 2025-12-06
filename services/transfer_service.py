from services.risk_engine import RiskEngine
from services.alert_service import AlertService

class TransferService:
    def __init__(self):
        self.risk_engine = RiskEngine()
        self.alert_service = AlertService()

    async def process_secure_transfer(self, source_wallet: str, dest_wallet: str, amount: float):
        # ১. আগে রিস্ক চেক করো
        risk_analysis = await self.risk_engine.analyze_wallet(source_wallet, amount)
        
        score = risk_analysis.get("score", 0)
        reasons = risk_analysis.get("reasons", [])
        
        # ২. থ্রেশহোল্ড চেক (নিরাপত্তার জন্য)
        if score >= 75:
            # ব্লক করা হলো এবং অ্যালার্ট পাঠানো হলো
            await self.alert_service.send_alert(
                title="Transfer Blocked!",
                message=f"High risk detected for wallet: `{source_wallet}`\nReasons: {', '.join(reasons)}",
                level="CRITICAL"
            )
            return {
                "success": False,
                "message": "Transaction blocked due to high security risk.",
                "risk_report": risk_analysis
            }

        # ৩. যদি সেফ থাকে -> ট্রানজেকশন এক্সিকিউট (Simulation for Hackathon)
        # বাস্তবে এখানে Qubic RPC দিয়ে sendTransaction কল হবে।
        
        # Success Alert
        await self.alert_service.send_alert(
            title="Transfer Initiated",
            message=f"Secure transfer of {amount} QUBIC from `{source_wallet}` to `{dest_wallet}`.",
            level="INFO"
        )

        return {
            "success": True,
            "message": "Transfer initiated successfully.",
            "tx_hash": "dummy_tx_hash_for_hackathon_demo",  # Mock Hash
            "risk_report": risk_analysis
        }
      
