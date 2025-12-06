from utils.qubic_rpc import QubicRPC

class RiskEngine:
    def __init__(self):
        self.rpc = QubicRPC()
        # মক ব্ল্যাকলিস্ট (হ্যাকারাথন ডেমোর জন্য)
        self.blacklist = [
            "J9...SCAM_WALLET_ADDRESS",
            "A1...HACKER_WALLET"
        ]

    async def analyze_wallet(self, wallet_id: str, amount: float):
        """
        ওয়ালেট বিশ্লেষণ করে একটি রিস্ক স্কোর (0-100) রিটার্ন করবে।
        Score যত বেশি, রিস্ক তত বেশি।
        """
        risk_score = 0
        risk_reasons = []

        # 1. চেক: ওয়ালেট ব্ল্যাকলিস্টে আছে কিনা
        if wallet_id in self.blacklist:
            return {"score": 100, "status": "CRITICAL", "reasons": ["Wallet is blacklisted"]}

        # 2. চেক: ব্যালেন্স লোড করা
        balance = await self.rpc.get_wallet_balance(wallet_id)
        
        if balance is None:
             return {"score": 50, "status": "UNKNOWN", "reasons": ["Could not fetch wallet data"]}

        # 3. লজিক: ব্যালেন্স যদি ট্রান্সফার অ্যামাউন্টের চেয়ে কম হয়
        if balance < amount:
            risk_score += 80
            risk_reasons.append("Insufficient funds (High Risk)")

        # 4. লজিক: একেবারে নতুন ওয়ালেট বা জিরো ব্যালেন্স (Dummy Logic)
        if balance == 0:
            risk_score += 40
            risk_reasons.append("Zero balance wallet (Suspicious)")

        # রিস্ক লেভেল নির্ধারণ
        status = "SAFE"
        if risk_score > 75:
            status = "CRITICAL"
        elif risk_score > 40:
            status = "WARNING"

        return {
            "score": risk_score,
            "status": status,
            "reasons": risk_reasons,
            "current_balance": balance
        }
      
