from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import jwt
from passlib.context import CryptContext

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

SECRET_KEY = "scf_platform_secret_key_2024"
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

# ── Models ──────────────────────────────────────────────────────────────────

class LoginRequest(BaseModel):
    email: str
    password: str

class OTPRequest(BaseModel):
    session_id: str
    otp: str

class InvoiceCreate(BaseModel):
    invoice_no: str
    invoice_date: str
    due_date: str
    channel_partner: str
    buyer_name: str
    seller_name: str
    program_name: str
    amount: float
    discount_rate: float
    description: str = ""
    line_items: List[dict] = []

class InvoiceStatusUpdate(BaseModel):
    status: str
    remarks: str = ""

class InvoiceResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    invoice_no: str
    invoice_date: str
    due_date: str
    channel_partner: str
    buyer_name: str
    seller_name: str
    program_name: str
    amount: float
    discount_rate: float
    discount_amount: float
    net_amount: float
    description: str
    line_items: List[dict]
    status: str
    remarks: str
    created_by: str
    created_by_name: str
    created_at: str
    updated_at: str
    approved_by: Optional[str] = None
    approved_by_name: Optional[str] = None
    approved_at: Optional[str] = None

# ── Seed Data ────────────────────────────────────────────────────────────────

USERS = {
    "ramesh@tatamotors.com": {
        "id": "user-001",
        "name": "Ramesh Kumar",
        "email": "ramesh@tatamotors.com",
        "role": "anchor_maker",
        "company": "Tata Motors Ltd",
        "password": "password"
    },
    "suresh@tatamotors.com": {
        "id": "user-002",
        "name": "Suresh Sharma",
        "email": "suresh@tatamotors.com",
        "role": "anchor_checker",
        "company": "Tata Motors Ltd",
        "password": "password"
    },
    "ganga@jagdambamotors.com": {
        "id": "user-003",
        "name": "Ganga Prasad",
        "email": "ganga@jagdambamotors.com",
        "role": "channel_partner",
        "company": "Jagdamba Motors Pvt Ltd",
        "password": "password"
    }
}

SAMPLE_INVOICES = [
    {
        "id": "inv-seed-001",
        "invoice_no": "INV-2024-001",
        "invoice_date": "2024-11-01",
        "due_date": "2024-12-01",
        "channel_partner": "Jagdamba Motors",
        "buyer_name": "Jagdamba Motors Pvt Ltd",
        "seller_name": "Tata Motors Ltd",
        "program_name": "Dealer Finance Program",
        "amount": 1500000.0,
        "discount_rate": 8.5,
        "discount_amount": 10625.0,
        "net_amount": 1489375.0,
        "description": "Commercial vehicles supply - Nov 2024",
        "line_items": [
            {"description": "Tata Ace Gold", "qty": 5, "unit_price": 200000, "total": 1000000},
            {"description": "Tata Yodha", "qty": 2, "unit_price": 250000, "total": 500000}
        ],
        "status": "pending_approval",
        "remarks": "",
        "created_by": "user-002",
        "created_by_name": "Suresh Sharma",
        "created_at": "2024-11-01T10:30:00+00:00",
        "updated_at": "2024-11-01T10:30:00+00:00",
        "approved_by": None,
        "approved_by_name": None,
        "approved_at": None
    },
    {
        "id": "inv-seed-002",
        "invoice_no": "INV-2024-002",
        "invoice_date": "2024-11-05",
        "due_date": "2024-12-05",
        "channel_partner": "Jagdamba Motors",
        "buyer_name": "Jagdamba Motors Pvt Ltd",
        "seller_name": "Tata Motors Ltd",
        "program_name": "Dealer Finance Program",
        "amount": 2200000.0,
        "discount_rate": 8.5,
        "discount_amount": 15583.33,
        "net_amount": 2184416.67,
        "description": "Light commercial vehicles - Nov 2024",
        "line_items": [
            {"description": "Tata 407", "qty": 4, "unit_price": 400000, "total": 1600000},
            {"description": "Tata Intra", "qty": 3, "unit_price": 200000, "total": 600000}
        ],
        "status": "approved",
        "remarks": "Approved as per policy",
        "created_by": "user-002",
        "created_by_name": "Suresh Sharma",
        "created_at": "2024-11-05T09:15:00+00:00",
        "updated_at": "2024-11-06T11:00:00+00:00",
        "approved_by": "user-001",
        "approved_by_name": "Ramesh Kumar",
        "approved_at": "2024-11-06T11:00:00+00:00"
    },
    {
        "id": "inv-seed-003",
        "invoice_no": "INV-2024-003",
        "invoice_date": "2024-11-08",
        "due_date": "2024-12-08",
        "channel_partner": "Krishna Auto Dealers",
        "buyer_name": "Krishna Auto Dealers Pvt Ltd",
        "seller_name": "Tata Motors Ltd",
        "program_name": "Dealer Finance Program",
        "amount": 850000.0,
        "discount_rate": 9.0,
        "discount_amount": 6375.0,
        "net_amount": 843625.0,
        "description": "Passenger vehicles supply - Nov 2024",
        "line_items": [
            {"description": "Tata Nexon", "qty": 2, "unit_price": 350000, "total": 700000},
            {"description": "Tata Punch", "qty": 1, "unit_price": 150000, "total": 150000}
        ],
        "status": "pending_approval",
        "remarks": "",
        "created_by": "user-002",
        "created_by_name": "Suresh Sharma",
        "created_at": "2024-11-08T14:00:00+00:00",
        "updated_at": "2024-11-08T14:00:00+00:00",
        "approved_by": None,
        "approved_by_name": None,
        "approved_at": None
    },
    {
        "id": "inv-seed-004",
        "invoice_no": "INV-2024-004",
        "invoice_date": "2024-11-10",
        "due_date": "2024-12-10",
        "channel_partner": "Shree Ganesh Motors",
        "buyer_name": "Shree Ganesh Motors",
        "seller_name": "Tata Motors Ltd",
        "program_name": "Vendor Finance Program",
        "amount": 3200000.0,
        "discount_rate": 7.5,
        "discount_amount": 20000.0,
        "net_amount": 3180000.0,
        "description": "Heavy commercial vehicles - Nov 2024",
        "line_items": [
            {"description": "Tata Prima", "qty": 2, "unit_price": 1200000, "total": 2400000},
            {"description": "Tata Signa", "qty": 1, "unit_price": 800000, "total": 800000}
        ],
        "status": "rejected",
        "remarks": "Credit limit exceeded, please resubmit with reduced amount",
        "created_by": "user-002",
        "created_by_name": "Suresh Sharma",
        "created_at": "2024-11-10T10:00:00+00:00",
        "updated_at": "2024-11-11T09:30:00+00:00",
        "approved_by": None,
        "approved_by_name": None,
        "approved_at": None
    },
    {
        "id": "inv-seed-005",
        "invoice_no": "INV-2024-005",
        "invoice_date": "2024-11-12",
        "due_date": "2024-12-12",
        "channel_partner": "Jagdamba Motors",
        "buyer_name": "Jagdamba Motors Pvt Ltd",
        "seller_name": "Tata Motors Ltd",
        "program_name": "Dealer Finance Program",
        "amount": 1800000.0,
        "discount_rate": 8.5,
        "discount_amount": 12750.0,
        "net_amount": 1787250.0,
        "description": "EV vehicles supply - Nov 2024",
        "line_items": [
            {"description": "Tata Nexon EV", "qty": 3, "unit_price": 500000, "total": 1500000},
            {"description": "Tata Tiago EV", "qty": 2, "unit_price": 150000, "total": 300000}
        ],
        "status": "pending_approval",
        "remarks": "",
        "created_by": "user-002",
        "created_by_name": "Suresh Sharma",
        "created_at": "2024-11-12T11:45:00+00:00",
        "updated_at": "2024-11-12T11:45:00+00:00",
        "approved_by": None,
        "approved_by_name": None,
        "approved_at": None
    },
    {
        "id": "inv-seed-006",
        "invoice_no": "INV-2024-006",
        "invoice_date": "2024-11-15",
        "due_date": "2024-12-15",
        "channel_partner": "Meenakshi Auto",
        "buyer_name": "Meenakshi Auto Works",
        "seller_name": "Tata Motors Ltd",
        "program_name": "Dealer Finance Program",
        "amount": 980000.0,
        "discount_rate": 9.5,
        "discount_amount": 7758.33,
        "net_amount": 972241.67,
        "description": "Utility vehicles - Nov 2024",
        "line_items": [
            {"description": "Tata Harrier", "qty": 1, "unit_price": 600000, "total": 600000},
            {"description": "Tata Safari", "qty": 1, "unit_price": 380000, "total": 380000}
        ],
        "status": "approved",
        "remarks": "Approved",
        "created_by": "user-002",
        "created_by_name": "Suresh Sharma",
        "created_at": "2024-11-15T08:30:00+00:00",
        "updated_at": "2024-11-15T15:00:00+00:00",
        "approved_by": "user-001",
        "approved_by_name": "Ramesh Kumar",
        "approved_at": "2024-11-15T15:00:00+00:00"
    },
    {
        "id": "inv-seed-007",
        "invoice_no": "INV-2024-007",
        "invoice_date": "2024-11-18",
        "due_date": "2024-12-18",
        "channel_partner": "Jagdamba Motors",
        "buyer_name": "Jagdamba Motors Pvt Ltd",
        "seller_name": "Tata Motors Ltd",
        "program_name": "Dealer Finance Program",
        "amount": 2750000.0,
        "discount_rate": 8.5,
        "discount_amount": 19479.17,
        "net_amount": 2730520.83,
        "description": "Commercial & passenger vehicles mix - Nov 2024",
        "line_items": [
            {"description": "Tata Ace", "qty": 5, "unit_price": 150000, "total": 750000},
            {"description": "Tata Altroz", "qty": 5, "unit_price": 300000, "total": 1500000},
            {"description": "Tata Tigor", "qty": 5, "unit_price": 100000, "total": 500000}
        ],
        "status": "approved",
        "remarks": "Approved - Priority dealer",
        "created_by": "user-002",
        "created_by_name": "Suresh Sharma",
        "created_at": "2024-11-18T09:00:00+00:00",
        "updated_at": "2024-11-19T10:00:00+00:00",
        "approved_by": "user-001",
        "approved_by_name": "Ramesh Kumar",
        "approved_at": "2024-11-19T10:00:00+00:00"
    }
]

# ── Auth Helpers ─────────────────────────────────────────────────────────────

def create_token(user_id: str, email: str, role: str):
    payload = {"user_id": user_id, "email": email, "role": role}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    return decode_token(credentials.credentials)

# ── Startup / Seed ────────────────────────────────────────────────────────────

@app.on_event("startup")
async def startup_db():
    existing = await db.invoices.count_documents({})
    if existing == 0:
        logger.info("Seeding initial invoice data...")
        for inv in SAMPLE_INVOICES:
            await db.invoices.insert_one({**inv})
        logger.info(f"Seeded {len(SAMPLE_INVOICES)} invoices")

# ── Auth Routes ───────────────────────────────────────────────────────────────

@api_router.post("/auth/login")
async def login(req: LoginRequest):
    user = USERS.get(req.email)
    if not user or user["password"] != req.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    session_id = str(uuid.uuid4())
    await db.sessions.insert_one({
        "session_id": session_id,
        "user_id": user["id"],
        "email": user["email"],
        "role": user["role"],
        "otp_verified": False,
        "created_at": datetime.now(timezone.utc).isoformat()
    })
    return {"session_id": session_id, "email": user["email"], "role": user["role"]}

@api_router.post("/auth/verify-otp")
async def verify_otp(req: OTPRequest):
    if req.otp != "000000":
        raise HTTPException(status_code=401, detail="Invalid OTP")
    session = await db.sessions.find_one({"session_id": req.session_id}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=401, detail="Invalid session")
    user = USERS.get(session["email"])
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    token = create_token(user["id"], user["email"], user["role"])
    await db.sessions.delete_one({"session_id": req.session_id})
    return {
        "token": token,
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "role": user["role"],
            "company": user["company"]
        }
    }

# ── Invoice Routes ────────────────────────────────────────────────────────────

@api_router.get("/invoices")
async def get_invoices(
    status: Optional[str] = None,
    channel_partner: Optional[str] = None,
    current_user: dict = Depends(get_current_user)
):
    query = {}
    if status and status != "all":
        query["status"] = status
    if channel_partner:
        query["channel_partner"] = channel_partner
    if current_user["role"] == "channel_partner":
        user = USERS.get(current_user["email"])
        if user:
            cp_company = "Jagdamba Motors"
            query["channel_partner"] = cp_company
    invoices = await db.invoices.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return invoices

@api_router.post("/invoices")
async def create_invoice(
    inv: InvoiceCreate,
    current_user: dict = Depends(get_current_user)
):
    if current_user["role"] != "anchor_checker":
        raise HTTPException(status_code=403, detail="Only checker can create invoices")
    user = USERS.get(current_user["email"])
    now = datetime.now(timezone.utc).isoformat()
    discount_amount = (inv.amount * inv.discount_rate) / 100 / 12
    doc = {
        "id": str(uuid.uuid4()),
        "invoice_no": inv.invoice_no,
        "invoice_date": inv.invoice_date,
        "due_date": inv.due_date,
        "channel_partner": inv.channel_partner,
        "buyer_name": inv.buyer_name,
        "seller_name": inv.seller_name,
        "program_name": inv.program_name,
        "amount": inv.amount,
        "discount_rate": inv.discount_rate,
        "discount_amount": round(discount_amount, 2),
        "net_amount": round(inv.amount - discount_amount, 2),
        "description": inv.description,
        "line_items": inv.line_items,
        "status": "pending_approval",
        "remarks": "",
        "created_by": current_user["user_id"],
        "created_by_name": user["name"] if user else "Checker",
        "created_at": now,
        "updated_at": now,
        "approved_by": None,
        "approved_by_name": None,
        "approved_at": None
    }
    await db.invoices.insert_one(doc)
    return {k: v for k, v in doc.items() if k != "_id"}

@api_router.get("/invoices/{invoice_id}")
async def get_invoice(invoice_id: str, current_user: dict = Depends(get_current_user)):
    inv = await db.invoices.find_one({"id": invoice_id}, {"_id": 0})
    if not inv:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return inv

@api_router.put("/invoices/{invoice_id}/status")
async def update_invoice_status(
    invoice_id: str,
    update: InvoiceStatusUpdate,
    current_user: dict = Depends(get_current_user)
):
    if current_user["role"] not in ["anchor_maker", "anchor_checker"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    inv = await db.invoices.find_one({"id": invoice_id}, {"_id": 0})
    if not inv:
        raise HTTPException(status_code=404, detail="Invoice not found")
    user = USERS.get(current_user["email"])
    now = datetime.now(timezone.utc).isoformat()
    update_data = {
        "status": update.status,
        "remarks": update.remarks,
        "updated_at": now
    }
    if update.status == "approved" and current_user["role"] == "anchor_maker":
        update_data["approved_by"] = current_user["user_id"]
        update_data["approved_by_name"] = user["name"] if user else "Maker"
        update_data["approved_at"] = now
    await db.invoices.update_one({"id": invoice_id}, {"$set": update_data})
    updated = await db.invoices.find_one({"id": invoice_id}, {"_id": 0})
    return updated

# ── Stats Routes ──────────────────────────────────────────────────────────────

@api_router.get("/stats")
async def get_stats(current_user: dict = Depends(get_current_user)):
    query = {}
    if current_user["role"] == "channel_partner":
        query["channel_partner"] = "Jagdamba Motors"
    total = await db.invoices.count_documents(query)
    pending = await db.invoices.count_documents({**query, "status": "pending_approval"})
    approved = await db.invoices.count_documents({**query, "status": "approved"})
    rejected = await db.invoices.count_documents({**query, "status": "rejected"})
    pipeline = [{"$match": {**query, "status": "approved"}}, {"$group": {"_id": None, "total": {"$sum": "$amount"}}}]
    result = await db.invoices.aggregate(pipeline).to_list(1)
    approved_amount = result[0]["total"] if result else 0
    return {
        "total_invoices": total,
        "pending_approval": pending,
        "approved": approved,
        "rejected": rejected,
        "approved_amount": approved_amount
    }

# ── Programs Route (static mock) ──────────────────────────────────────────────

@api_router.get("/programs")
async def get_programs(current_user: dict = Depends(get_current_user)):
    programs = [
        {"id": "p1", "anchor": "Tata Motors Ltd", "channel_partner": "Jagdamba Motors", "product": "Dealer Finance", "pte_days": 30, "total_limit": 50000000, "utilized": 15000000, "available": 35000000, "status": "Active"},
        {"id": "p2", "anchor": "Tata Motors Ltd", "channel_partner": "Krishna Auto Dealers", "product": "Dealer Finance", "pte_days": 45, "total_limit": 30000000, "utilized": 8500000, "available": 21500000, "status": "Active"},
        {"id": "p3", "anchor": "Tata Motors Ltd", "channel_partner": "Shree Ganesh Motors", "product": "Vendor Finance", "pte_days": 60, "total_limit": 80000000, "utilized": 32000000, "available": 48000000, "status": "Active"},
        {"id": "p4", "anchor": "Tata Motors Ltd", "channel_partner": "Meenakshi Auto", "product": "Dealer Finance", "pte_days": 30, "total_limit": 25000000, "utilized": 9800000, "available": 15200000, "status": "Active"},
        {"id": "p5", "anchor": "Tata Motors Ltd", "channel_partner": "Sunrise Vehicles", "product": "Vendor Finance", "pte_days": 45, "total_limit": 45000000, "utilized": 18000000, "available": 27000000, "status": "Active"},
        {"id": "p6", "anchor": "Tata Motors Ltd", "channel_partner": "National Auto Hub", "product": "Dealer Finance", "pte_days": 90, "total_limit": 60000000, "utilized": 22000000, "available": 38000000, "status": "Inactive"}
    ]
    if current_user["role"] == "channel_partner":
        programs = [p for p in programs if p["channel_partner"] == "Jagdamba Motors"]
    return programs

# ── Channel Partners Route ────────────────────────────────────────────────────

@api_router.get("/channel-partners")
async def get_channel_partners(current_user: dict = Depends(get_current_user)):
    partners = [
        {"id": "cp1", "name": "Jagdamba Motors", "full_name": "Jagdamba Motors Pvt Ltd", "type": "Dealer", "city": "Lucknow", "state": "Uttar Pradesh", "limit": 50000000, "utilized": 15000000, "status": "Active"},
        {"id": "cp2", "name": "Krishna Auto Dealers", "full_name": "Krishna Auto Dealers Pvt Ltd", "type": "Dealer", "city": "Kanpur", "state": "Uttar Pradesh", "limit": 30000000, "utilized": 8500000, "status": "Active"},
        {"id": "cp3", "name": "Shree Ganesh Motors", "full_name": "Shree Ganesh Motors", "type": "Vendor", "city": "Mumbai", "state": "Maharashtra", "limit": 80000000, "utilized": 32000000, "status": "Active"},
        {"id": "cp4", "name": "Meenakshi Auto", "full_name": "Meenakshi Auto Works", "type": "Dealer", "city": "Chennai", "state": "Tamil Nadu", "limit": 25000000, "utilized": 9800000, "status": "Active"},
        {"id": "cp5", "name": "Sunrise Vehicles", "full_name": "Sunrise Vehicles Pvt Ltd", "type": "Vendor", "city": "Pune", "state": "Maharashtra", "limit": 45000000, "utilized": 18000000, "status": "Active"},
        {"id": "cp6", "name": "National Auto Hub", "full_name": "National Auto Hub Ltd", "type": "Dealer", "city": "Delhi", "state": "Delhi", "limit": 60000000, "utilized": 22000000, "status": "Inactive"}
    ]
    return partners

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
