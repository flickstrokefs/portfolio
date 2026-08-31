from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional

class ProfileSchema(BaseModel):
    name: str
    role: str
    institution: str
    year: str
    classification: str
    bio: str
    github: str
    linkedin: str
    coding: str
    email: str

class DisciplineSchema(BaseModel):
    name: str
    subtitle: str

class AcademicSchema(BaseModel):
    programme: str
    specialization: str
    institution: str
    academic_span_start: int
    academic_span_end: int
    current_semester: int
    total_semesters: int
    registration_code: str
    registration_status: str
    record_status: str
    cgpa: float
    cgpa_scale: float
    disciplines: List[DisciplineSchema]

class ProjectImageSchema(BaseModel):
    src: str
    alt: str
    caption: Optional[str] = None

class ProjectSchema(BaseModel):
    id: str
    code: str
    title: str
    objective: str
    tools: List[str]
    contribution: str
    outcome: str
    learning: str
    accent: str
    images: Optional[List[ProjectImageSchema]] = None
    github: Optional[str] = None
    liveUrl: Optional[str] = None

class SkillItem(BaseModel):
    name: str
    level: str

class SkillCompartment(BaseModel):
    category: str
    subtitle: str
    skills: List[SkillItem]

class AchievementSchema(BaseModel):
    date: str
    title: str
    note: str

class RoadmapSchema(BaseModel):
    label: str
    title: str
    detail: str

class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="Sender name")
    email: EmailStr = Field(..., max_length=255, description="Sender email address")
    message: str = Field(..., min_length=1, max_length=5000, description="Message content")

class ContactResponse(BaseModel):
    ok: bool
    message: str
