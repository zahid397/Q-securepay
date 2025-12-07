from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.transfer_service import TransferService
from services.webhook_service import WebhookService
from services.risk_engine import RiskEngine
import random
import time

app = FastAPI(title="Q-SecurePay API", version="2.0.0")

# CORS (Frontend React থেকে রিকোয়েস্ট আসার জন্য)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Services
transfer_service = TransferService()
webhook_service = WebhookService()
risk_engine = RiskEngine()

# Request Models
class TransferRequest(BaseModel):
    source_wallet: str
    dest_wallet: str
    amount: float

class CheckRiskRequest(BaseModel):
    wallet_id: str
    amount: float


@app.get("/")
def home():
    return {"message": "Q-SecurePay Backend Running 🚀"}


# -----------------------------------------------------
# ❇️ LIVE FEED ENDPOINT (Frontend uses THIS)
# -----------------------------------------------------
@app.get("/api/live-feed")
async def live_feed():
    """
    Frontend old system এর সাথে fully compatible live-feed API.
    """
    wallet = "demo_wallet"
    amount = random.uniform(1, 10)

    result = await risk_engine.analyze_wallet(wallet, amount)

    # Fake hash for UI
    fake_hash = hex(random.getrandbits(160))

    return {
        "data": {
            "id": random.randint(10000, 99999),
            "asset": "QUBIC",
            "sources": {"RiskEngine": result["risk_score"]},
            "median_price": result["risk_score"],
            "max_deviation_source": "RiskEngine",
            "current_deviation": result["risk_score"]
        },
        "verification": {
            "status": result["status"],
            "confidence_score": f"{result['risk_score']}%",
            "ai_reason": result["reason"],
            "ai_node": "QSP-RISK-ENGINE"
        },
        "proofs": {
            "consensus_hash": fake_hash,
            "timestamp": time.strftime("%H:%M:%S")
        }
    }


# -----------------------------------------------------
# 🔍 Check wallet risk (Used by new system)
# -----------------------------------------------------
@app.post("/api/analyze-risk")
async def analyze_risk(request: CheckRiskRequest):
    result = await risk_engine.analyze_wallet(request.wallet_id, request.amount)
    return result


# -----------------------------------------------------
# 🔐 Secure Transfer API
# -----------------------------------------------------
@app.post("/api/transfer")
async def execute_transfer(request: TransferRequest):
    result = await transfer_service.process_secure_transfer(
        request.source_wallet,
        request.dest_wallet,
        request.amount
    )
    
    if not result["success"]:
        raise HTTPException(status_code=400, detail=result)

    return result


# -----------------------------------------------------
# 🌐 Webhook listener (Optional)
# -----------------------------------------------------
@app.post("/api/webhook")
async def webhook_listener(payload: dict = Body(...)):
    return await webhook_service.process_incoming_webhook(payload)
