import json
from pathlib import Path
from typing import List
from fastapi import APIRouter, HTTPException
from models import SkillCompartment, AchievementSchema, RoadmapSchema

router = APIRouter(prefix="/api/v1", tags=["Toolbox & Credentials"])
DATA_FILE = Path(__file__).parent.parent / "data" / "content.json"

def load_data():
    if not DATA_FILE.exists():
        raise HTTPException(status_code=500, detail="Data file not found")
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

@router.get("/skills", response_model=List[SkillCompartment])
def get_skills():
    data = load_data()
    return data.get("skills", [])

@router.get("/achievements", response_model=List[AchievementSchema])
def get_achievements():
    data = load_data()
    return data.get("achievements", [])

@router.get("/credentials", response_model=List[str])
def get_credentials():
    data = load_data()
    return data.get("credentials", [])

@router.get("/roadmap", response_model=List[RoadmapSchema])
def get_roadmap():
    data = load_data()
    return data.get("roadmap", [])
