import json
import logging
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, BackgroundTasks, Request, status
from models import ContactRequest, ContactResponse
from database import save_contact_submission
from email_service import send_contact_email_notification

# Load .env
load_dotenv()

router = APIRouter(prefix="/api/v1/contact", tags=["Contact Signal"])
logger = logging.getLogger("elab.contact")
MESSAGES_LOG = Path(__file__).parent.parent / "data" / "contact_messages.json"

@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def handle_contact(
    payload: ContactRequest,
    background_tasks: BackgroundTasks,
    request: Request
):
    print(f"\n==================================================")
    print(f"[Contact Router] 📥 INCOMING SIGNAL RECEIVED")
    print(f"  Name:    {payload.name}")
    print(f"  Email:   {payload.email}")
    print(f"  Message: {payload.message}")
    print(f"==================================================")

    ip_address = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")

    submission_id = None

    # 1. Primary Store: Neon PostgreSQL Database
    try:
        submission_id = save_contact_submission(
            name=payload.name,
            email=payload.email,
            message=payload.message,
            ip_address=ip_address,
            user_agent=user_agent
        )
    except Exception as e:
        print(f"[Contact Router] ❌ Exception during save_contact_submission: {e}")
        logger.error(f"[Contact Router] DB store exception: {e}")

    # 2. Local Fallback Log (if DB is not configured or failed)
    if not submission_id:
        print("[Contact Router] ⚠️ DB insert did not produce ID. Appending to local fallback JSON...")
        try:
            messages = []
            if MESSAGES_LOG.exists():
                with open(MESSAGES_LOG, "r", encoding="utf-8") as f:
                    messages = json.load(f)

            new_entry = {
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "name": payload.name,
                "email": payload.email,
                "message": payload.message,
                "ip": ip_address
            }
            messages.append(new_entry)

            with open(MESSAGES_LOG, "w", encoding="utf-8") as f:
                json.dump(messages, f, indent=2)
            print("[Contact Router] ✅ Fallback JSON updated.")
        except Exception as e:
            print(f"[Contact Router] ❌ Local fallback log failed: {e}")

    # 3. Trigger Email Reminder / Notification in Background
    print("[Contact Router] 📨 Enqueueing background email dispatch...")
    background_tasks.add_task(
        send_contact_email_notification,
        name=payload.name,
        email=payload.email,
        message=payload.message,
        submission_id=submission_id
    )

    db_status_note = f" (Record #{submission_id})" if submission_id else ""
    return ContactResponse(
        ok=True,
        message=f"Signal received from {payload.name}. Logged to S/LAB Neon archive{db_status_note}."
    )
