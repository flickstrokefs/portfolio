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

# Enable CORS for Next.js frontend (local development & production origins)
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://*.vercel.app",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
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
