Q-SecurePay 🛡️
### Intelligent Transaction Guard for Qubic Blockchain

**Built for International Lablab.ai Hackathon**

Q-SecurePay is a security layer for the Qubic ecosystem that prevents scam transfers and high-risk wallet interactions using real-time analysis.

---

## 🚀 Features
- **Real-time Risk Scoring:** Analyzes wallet age, balance, and history before transfer.
- **Auto-Block Engine:** Automatically blocks transactions with a risk score > 75.
- **Telegram Alerts:** Admins get instant notifications of suspicious activities.
- **Cyberpunk UI:** Modern, dark-themed interface for seamless user experience.

---

## 🛠️ Tech Stack
- **Backend:** Python (FastAPI), Asyncio
- **Frontend:** React.js, Vite
- **Blockchain:** Qubic RPC Integration
- **Tools:** Telegram Bot API, Axios

---

## ⚡ How to Run

### 1. Backend Setup
```bash
cd Q-SecurePay
pip install -r requirements.txt
uvicorn main:Server runs on: https://www.google.com/search?q=http://127.0.0.1:8000app --reload
2. Frontend Setup
cd frontend
npm install
npm run dev
Client runs on: http://localhost:5173
⚠️ Environment Variables
Create a .env file in the root directory:
QUBIC_RPC_URL="[https://api.qubic.org/v1](https://api.qubic.org/v1)"
TELEGRAM_BOT_TOKEN="your_token"
TELEGRAM_CHAT_ID="your_id"
👨‍💻 Team
Developed by Zahid Hasan & Team.
