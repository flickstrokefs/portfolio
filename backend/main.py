import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import profile, projects, skills, contact

app = FastAPI(
    title="S/LAB Portfolio Field Notebook API",
    description="RESTful backend API for Sudhanshu Verma's multidisciplinary portfolio.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Explicit allowed origins list (configurable via ALLOWED_ORIGINS env var on Render)
default_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://portfolio-iu86.onrender.com",
]

env_origins = os.getenv("ALLOWED_ORIGINS")
if env_origins:
    origins = [orig.strip() for orig in env_origins.split(",") if orig.strip()]
else:
    origins = default_origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(profile.router)
app.include_router(projects.router)
app.include_router(skills.router)
app.include_router(contact.router)

@app.get("/", tags=["Health"])
def root_endpoint():
    return {
        "status": "ONLINE",
        "system": "S/LAB NOTEBOOK BACKEND API v1.0",
        "documentation": "/docs"
    }

@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "healthy", "code": 200}
