from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.transfer_service import TransferService
from services.webhook_service import WebhookService
from services.risk_engine import RiskEngine

app = FastAPI(title="Q-SecurePay API", version="1.0.0")

# CORS (Frontend React থেকে রিকোয়েস্ট আসার জন্য জরুরি)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # হ্যাকাথনের জন্য সব এলাউড
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Services Initialization
transfer_service = TransferService()
webhook_service = WebhookService()
risk_engine = RiskEngine()

# --- Request Models (Data validation) ---
class TransferRequest(BaseModel):
    source_wallet: str
    dest_wallet: str
    amount: float

class CheckRiskRequest(BaseModel):
    wallet_id: str
    amount: float

# --- Routes ---

@app.get("/")
def home():
    return {"message": "Q-SecurePay Backend is Running 🚀"}

@app.post("/api/analyze-risk")
async def analyze_risk(request: CheckRiskRequest):
    """শুধুমাত্র রিস্ক চেক করার জন্য এন্ডপয়েন্ট"""
    result = await risk_engine.analyze_wallet(request.wallet_id, request.amount)
    return result

@app.post("/api/transfer")
async def execute_transfer(request: TransferRequest):
    """রিস্ক চেক করে ট্রান্সফার করার এন্ডপয়েন্ট"""
    result = await transfer_service.process_secure_transfer(
        request.source_wallet, 
        request.dest_wallet, 
        request.amount
    )
    if not result["success"]:
        # 400 Bad Request if blocked
        raise HTTPException(status_code=400, detail=result)
    return result

@app.post("/api/webhook")
async def webhook_listener(payload: dict = Body(...)):
    """External events listener"""
    return await webhook_service.process_incoming_webhook(payload)

# Run logic is handled by uvicorn command, not needed here strictly
