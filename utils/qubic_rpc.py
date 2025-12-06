import httpx
import os
from dotenv import load_dotenv

load_dotenv()

class QubicRPC:
    def __init__(self):
        self.base_url = os.getenv("QUBIC_RPC_URL")
        # Timeout বাড়িয়ে দেওয়া হলো যাতে স্লো নেটওয়ার্ক বা পাবলিক নোডে এরর না দেয়
        self.client = httpx.AsyncClient(timeout=30.0)

    async def get_wallet_balance(self, wallet_id: str):
        """
        Qubic ওয়ালেটের ব্যালেন্স চেক করার ফাংশন।
        API রেসপন্স অনুযায়ী ডাটা পার্সিং এডজাস্ট করতে হতে পারে।
        """
        try:
            # উদাহরণস্বরূপ এন্ডপয়েন্ট (আসল API ডকুমেন্টেশন দেখে পাথ ঠিক করে নিও)
            response = await self.client.get(f"{self.base_url}/wallets/{wallet_id}/balance")
            response.raise_for_status()
            data = response.json()
            
            # ধরে নিচ্ছি API এই ফরম্যাটে ডাটা দেয়: {'balance': 1000, 'unit': 'QUBIC'}
            return data.get("balance", 0)
        except httpx.HTTPError as e:
            print(f"❌ RPC Error fetching balance: {e}")
            return None

    async def get_wallet_history(self, wallet_id: str):
        """
        ওয়ালেটের আগের ট্রানজেকশন হিস্ট্রি নিয়ে আসবে রিস্ক চেক করার জন্য।
        """
        try:
            response = await self.client.get(f"{self.base_url}/wallets/{wallet_id}/transactions")
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            print(f"❌ RPC Error fetching history: {e}")
            return []

    async def close(self):
        await self.client.aclose()
