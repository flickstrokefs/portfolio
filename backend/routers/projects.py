import json
from pathlib import Path
from typing import List
from fastapi import APIRouter, HTTPException
from models import ProjectSchema

router = APIRouter(prefix="/api/v1/projects", tags=["Experiments & Projects"])
DATA_FILE = Path(__file__).parent.parent / "data" / "content.json"

def load_data():
    if not DATA_FILE.exists():
        raise HTTPException(status_code=500, detail="Data file not found")
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

@router.get("", response_model=List[ProjectSchema])
def list_projects():
    data = load_data()
    return data.get("projects", [])

@router.get("/{project_id}", response_model=ProjectSchema)
def get_project_by_id(project_id: str):
    data = load_data()
    projects = data.get("projects", [])
    for proj in projects:
        if proj["id"].lower() == project_id.lower():
            return proj
    raise HTTPException(status_code=404, detail=f"Project with ID '{project_id}' not found.")
