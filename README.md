# 🚀 Q-SecurePay — AI-Powered Fraud Detection for Qubic Network  

**Q-SecurePay** is an intelligent real-time transaction security engine for the Qubic blockchain.  
It monitors wallet activity, calculates AI-driven risk scores, blocks suspicious transfers, and sends instant alerts to protect users from scams and fraud.

🔗 **Live Demo:**  
Backend: https://q-securepay.onrender.com  
Frontend: https://qsp-frontend.vercel.app/

---

## ⭐ Features  
- 🔍 **Real-time wallet risk scoring**  
- 🧠 **AI-powered fraud analysis**  
- 🚫 **Auto-block high-risk transactions**  
- ⚠️ **Suspicious activity detection**  
- 📲 **Instant Telegram alerts**  
- 📊 **Transaction insights dashboard**  
- 🟢🟡🔴 Wallet trust-level indicators  
- ⚡ FastAPI backend + Real-time frontend  

---

## 🧠 Short Pitch (Hackathon Summary)
**Q-SecurePay** is an AI-powered fraud detection layer for the Qubic blockchain.  
It analyzes wallet behavior, calculates a real-time risk score, blocks high-risk transfers,  
and sends instant Telegram alerts — delivering end-to-end protection for crypto transactions.

---

## 🏗 System Architecture
──┐
               │        USER          │
               └──────────┬───────────┘
                          │
                          ▼
                ┌──────────────────┐
                │   Frontend UI    │
                │ (Next.js / React)│
                └──────────┬───────┘
                          │ REST API
                          ▼
                 ┌──────────────────┐
                 │    Backend API   │
                 │    (FastAPI)     │
                 └───────┬──────────┘
                         │
  ┌──────────────────────┼──────────────────────────┐
  ▼                      ▼                          ▼

┌────────────┐      ┌────────────────┐        ┌─────────────────┐ │ Risk Engine│      │Wallet Analyzer │        │Qubic RPC Checker │ │ AI Scoring │      │History Lookup  │        │Live Transaction  │ └─────┬──────┘      └───────┬────────┘        └────────┬────────┘ │                     │                           │ └───────────────┬────┴──────────────┬────────────┘ ▼                   ▼ ┌─────────────────┐   ┌────────────────────┐ │ Allow Transfer  │   │ Block & Alert User │ └─────────────────┘   └────────────────────┘

▼
        🔔 Telegram Instant Alerts

---

## 🧪 Risk Score Logic
| Risk Factor | Weight |
|-------------|--------|
| New wallet (< 30 days) | +20 |
| High outgoing tx count | +25 |
| Known scammer flagged | +40 |
| Sudden balance drop | +25 |
| Too many approvals | +15 |
| Unusual transfer pattern | +30 |

### Risk Levels:
- **0–30 → 🟢 SAFE**  
- **31–70 → 🟡 WARNING**  
- **71–100 → 🔴 DANGER (Auto Block)**  

---

## 📡 API Endpoints  
### `GET /api/risk/{wallet}`
Returns risk score + analysis.

### `POST /api/tx/validate`
Validates + approves/blocks transactions.

### `POST /api/alert/send`
Sends Telegram alerts.

---

## 📸 Screenshots  
(Add here once you upload images to GitHub)

---

## 🛠 Tech Stack  
- **Backend:** FastAPI, Python  
- **Frontend:** Next.js / React  
- **Database:** JSON/Firebase/SQLite (optional)  
- **AI Engine:** Custom Logic / LLM Hooks  
- **Alerts:** Telegram Bot  
- **Blockchain:** Qubic RPC  

---

## ▶ Local Installation

```bash
git clone https://github.com/your-repo/Q-SecurePay
cd Q-SecurePay
pip install -r requirements.txt
uvicorn backend.main:app --reload

Frontend:

cd frontend
npm install
npm run dev


---

🔮 Future Scope

Behavior-based ML fraud model

Wallet reputation indexing

Community scam-reporting

Integration into Qubic dApps

Multi-chain support



---

🏆 Why This Project Matters

Qubic ecosystem lacks a security layer.
Scams, phishing wallets, and suspicious transfers increase daily.
Q-SecurePay solves this through:

✔ real-time analysis
✔ AI reasoning
✔ instant alerts
✔ automated protection

Making Qubic safer for millions of users.


---

👨‍💻 Built by

Zahid Hasan
For Qubic + Lablab Hackathon 2025
