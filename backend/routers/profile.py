import json
from pathlib import Path
from fastapi import APIRouter, HTTPException
from models import ProfileSchema, AcademicSchema

router = APIRouter(prefix="/api/v1", tags=["Profile & Academic"])
DATA_FILE = Path(__file__).parent.parent / "data" / "content.json"

def load_data():
    if not DATA_FILE.exists():
        raise HTTPException(status_code=500, detail="Data file not found")
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

@router.get("/profile", response_model=ProfileSchema)
def get_profile():
    data = load_data()
    return data.get("profile")

@router.get("/academic", response_model=AcademicSchema)
def get_academic_record():
    data = load_data()
    return data.get("academic")
