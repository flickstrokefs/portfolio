import json
from pathlib import Path
from datetime import datetime
from fastapi import APIRouter, HTTPException, status
from models import ContactRequest, ContactResponse

router = APIRouter(prefix="/api/v1/contact", tags=["Contact Signal"])
MESSAGES_LOG = Path(__file__).parent.parent / "data" / "contact_messages.json"

@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def handle_contact(payload: ContactRequest):
    try:
        messages = []
        if MESSAGES_LOG.exists():
            with open(MESSAGES_LOG, "r", encoding="utf-8") as f:
                messages = json.load(f)

        new_entry = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "name": payload.name,
            "email": payload.email,
            "message": payload.message
        }
        messages.append(new_entry)

        with open(MESSAGES_LOG, "w", encoding="utf-8") as f:
            json.dump(messages, f, indent=2)

        return ContactResponse(
            ok=True,
            message=f"Signal received from {payload.name}. Logged to S/LAB archive."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to record transmission: {str(e)}")
