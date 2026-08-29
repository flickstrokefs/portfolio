# S/LAB Portfolio — FastAPI Backend

FastAPI REST backend for Sudhanshu Verma's multidisciplinary portfolio.

## 🚀 Quickstart

### 1. Create Virtual Environment & Install Dependencies

```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Run API Server

```bash
uvicorn main:app --reload --port 8000
```

The server will start at `http://localhost:8000`.

---

## 📑 API Endpoints & Interactive Docs

- **Swagger UI Interactive Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc API Documentation**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

### Summary of Routes:

| Method | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/profile` | Get personal profile metadata |
| `GET` | `/api/v1/academic` | Get academic profile, CGPA, semester timeline & active disciplines |
| `GET` | `/api/v1/projects` | List all experiment logs/projects |
| `GET` | `/api/v1/projects/{id}` | Get specific project by ID |
| `GET` | `/api/v1/skills` | Get categorized toolbox instruments |
| `GET` | `/api/v1/achievements` | Get field expeditions |
| `GET` | `/api/v1/credentials` | Get verified credentials |
| `GET` | `/api/v1/roadmap` | Get trajectory stops |
| `POST` | `/api/v1/contact` | Log a contact transmission message |

---

## 📂 Project Structure

```
backend/
├── main.py              # FastAPI app setup, CORS, and route registration
├── models.py            # Pydantic schemas for request/response validation
├── requirements.txt     # Python dependencies
├── data/
│   ├── content.json     # Main portfolio content store
│   └── contact_messages.json # Auto-created log file for incoming contact signals
└── routers/
    ├── profile.py       # Profile & Academic API routes
    ├── projects.py      # Experiment & Project API routes
    ├── skills.py        # Toolbox, Achievements & Trajectory API routes
    └── contact.py       # Contact form POST endpoint
```
