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

class ProjectSchema(BaseModel):
    id: str
    code: str
    title: str
    objective: str
    tools: List[str]
    contribution: str
    outcome: str
    learning: str
    accent: str = Field(description="Accent color tag: 'red' | 'blue' | 'ink'")

class DisciplineSchema(BaseModel):
    id: str
    num: str
    title: str
    subtitle: str
    accent: str

class AcademicSchema(BaseModel):
    programme: str
    specialization: str
    institution: str
    registration_code: str
    academic_span: str
    current_year: str
    current_semester: int
    total_semesters: int
    cgpa: float
    max_cgpa: float
    status: str
    disciplines: List[DisciplineSchema]

class SkillItem(BaseModel):
    name: str
    level: str = Field(description="'INTERMEDIATE' | 'BEGINNER' | 'ADVANCED'")

class SkillCompartment(BaseModel):
    category: str
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
    name: str = Field(..., min_length=1, description="Sender name")
    email: str = Field(..., description="Sender email address")
    message: str = Field(..., min_length=1, description="Message content")

class ContactResponse(BaseModel):
    ok: bool
    message: str
