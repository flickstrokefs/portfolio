# S/LAB Portfolio — API Endpoints & Route Reference (`api-end.md`)

This document provides a comprehensive mapping of all API endpoints across the **Next.js Frontend** (`frontend/`) and the **FastAPI Backend** (`backend/`).

---

## 🏗️ System Architecture & Data Flow

```
+-----------------------------------------------------------------------------------+
|                               NEXT.JS FRONTEND                                    |
|                                                                                   |
|  [Client Components] -> frontend/lib/api.ts -> fetch('http://localhost:8000/...') |
|  [Contact Form]     -> POST /api/contact    -> Next.js Route Proxy                |
+-----------------------------------------------------------------------------------+
                                       |
                                       v  HTTP Requests (JSON)
+-----------------------------------------------------------------------------------+
|                               FASTAPI BACKEND                                     |
|                                                                                   |
|  http://localhost:8000/api/v1/...                                                 |
|  - Routers: profile.py, projects.py, skills.py, contact.py                        |
|  - Data Stores: backend/data/content.json & contact_messages.json                |
+-----------------------------------------------------------------------------------+
```

---

## 📑 Complete API Route Summary Table

| Category | HTTP Method | Frontend Hook / Call site | Next.js API Route | FastAPI Backend Route | Description |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **Profile** | `GET` | `fetchProfile()` in `lib/api.ts` | — | `/api/v1/profile` | Fetches personal metadata, bio, role, and social/coding links |
| **Academic** | `GET` | `fetchAcademic()` in `lib/api.ts` | — | `/api/v1/academic` | Fetches degree details, CGPA, 8-sem timeline & active disciplines |
| **Projects** | `GET` | `fetchProjects()` in `lib/api.ts` | — | `/api/v1/projects` | Fetches all experiment log entries (Sentinel, Aqua, MIWA, etc.) |
| **Project Detail** | `GET` | `fetch(`${API_BASE}/projects/${id}`)` | — | `/api/v1/projects/{project_id}` | Fetches a single experiment case file by unique string ID |
| **Toolbox** | `GET` | `fetch(`${API_BASE}/skills`)` | — | `/api/v1/skills` | Fetches hardware, web dev, and AI/ML instruments by category |
| **Achievements**| `GET` | `fetchAchievements()` in `lib/api.ts` | — | `/api/v1/achievements` | Fetches field expeditions and hackathon records |
| **Credentials** | `GET` | `fetchCredentials()` in `lib/api.ts` | — | `/api/v1/credentials` | Fetches verified leadership positions and club memberships |
| **Trajectory** | `GET` | `fetchRoadmap()` in `lib/api.ts` | — | `/api/v1/roadmap` | Fetches NOW, NEXT, LATER trajectory waypoints |
| **Contact** | `POST` | `submitContact()` form in `lab-notebook.tsx` | `/api/contact` | `/api/v1/contact` | Logs incoming user transmissions to archive file |
| **Health** | `GET` | — | — | `/health` & `/` | Backend health check & root status report |

---

## 🔍 Detailed Endpoint Documentation

### 1. Profile Metadata
- **Backend Route**: `GET /api/v1/profile`
- **Frontend Caller**: `fetchProfile()` ([`frontend/lib/api.ts`](file:///D:/CODING/PEL/frontend/lib/api.ts))
- **Handler File**: `backend/routers/profile.py`
- **Response Format**:
  ```json
  {
    "name": "Sudhanshu",
    "role": "B.Tech AI/ML · Multidisciplinary Systems",
    "institution": "Lovely Professional University",
    "year": "2024—2028",
    "classification": "Embedded Systems × Web Development × AI/ML",
    "bio": "I am an AI/ML student who likes to move between the physical and digital worlds...",
    "github": "github.com/sudhanshu-dev",
    "linkedin": "linkedin.com/in/sudhanshu-dev",
    "coding": "leetcode.com/sudhanshu-dev"
  }
  ```

---

### 2. Academic Record & Dossier
- **Backend Route**: `GET /api/v1/academic`
- **Frontend Caller**: `fetchAcademic()` ([`frontend/lib/api.ts`](file:///D:/CODING/PEL/frontend/lib/api.ts))
- **Handler File**: `backend/routers/profile.py`
- **Component**: [`frontend/components/academic-panel.tsx`](file:///D:/CODING/PEL/frontend/components/academic-panel.tsx)
- **Response Format**:
  ```json
  {
    "programme": "B.Tech Artificial Intelligence & Machine Learning",
    "specialization": "Artificial Intelligence & Machine Learning",
    "institution": "Lovely Professional University",
    "registration_code": "REG: 2024-28-LPU",
    "academic_span": "2024 — 2028",
    "current_year": "YEAR 02 / 04",
    "current_semester": 4,
    "total_semesters": 8,
    "cgpa": 8.4,
    "max_cgpa": 10.0,
    "status": "VERIFIED / ACTIVE",
    "disciplines": [
      { "id": "ds", "num": "01", "title": "DATA STRUCTURES", "subtitle": "Algorithms · Complexity", "accent": "red" },
      { "id": "cv", "num": "02", "title": "COMPUTER VISION", "subtitle": "Spatial Signal Processing", "accent": "amber" },
      { "id": "es", "num": "03", "title": "EMBEDDED SYSTEMS", "subtitle": "Firmware · Hardware Control", "accent": "olive" },
      { "id": "hci", "num": "04", "title": "HUMAN-COMPUTER INT.", "subtitle": "Ergonomics · Interface Models", "accent": "slate" }
    ]
  }
  ```

---

### 3. Projects & Experiment Logs
- **Backend Route**: `GET /api/v1/projects`
- **Frontend Caller**: `fetchProjects()` ([`frontend/lib/api.ts`](file:///D:/CODING/PEL/frontend/lib/api.ts))
- **Handler File**: `backend/routers/projects.py`
- **Component**: [`frontend/components/lab-notebook.tsx`](file:///D:/CODING/PEL/frontend/components/lab-notebook.tsx) (Section 04)
- **Response Format**: Array of `Project` items
  ```json
  [
    {
      "id": "sentinel",
      "code": "EXP-01",
      "title": "SENTINEL / NEXAURA",
      "objective": "Design a responsive intelligence layer for monitoring complex signals.",
      "tools": ["Python", "React", "FastAPI"],
      "contribution": "Mapped the system flow, built the interface, and shaped the data contracts.",
      "outcome": "A clear prototype for turning noisy inputs into actionable alerts.",
      "learning": "Good systems make the next decision easier, not louder.",
      "accent": "red"
    }
  ]
  ```

---

### 4. Single Project Details
- **Backend Route**: `GET /api/v1/projects/{project_id}`
- **Handler File**: `backend/routers/projects.py`
- **Query Parameter**: `project_id` string (e.g. `sentinel`, `aqua`, `miwa`)
- **Status Codes**: `200 OK` on match, `404 Not Found` if missing

---

### 5. Toolbox Skills
- **Backend Route**: `GET /api/v1/skills`
- **Handler File**: `backend/routers/skills.py`
- **Response Format**:
  ```json
  [
    {
      "category": "HARDWARE / FIRMWARE",
      "skills": [
        { "name": "Arduino", "level": "INTERMEDIATE" },
        { "name": "C / C++", "level": "INTERMEDIATE" }
      ]
    }
  ]
  ```

---

### 6. Field Expeditions (Achievements)
- **Backend Route**: `GET /api/v1/achievements`
- **Frontend Caller**: `fetchAchievements()` ([`frontend/lib/api.ts`](file:///D:/CODING/PEL/frontend/lib/api.ts))
- **Handler File**: `backend/routers/skills.py`
- **Response Format**:
  ```json
  [
    {
      "date": "2025.11",
      "title": "National Hackathon / Shortlist",
      "note": "A weekend of diagrams, bad coffee, and one surprisingly elegant prototype."
    }
  ]
  ```

---

### 7. Verified Credentials
- **Backend Route**: `GET /api/v1/credentials`
- **Frontend Caller**: `fetchCredentials()` ([`frontend/lib/api.ts`](file:///D:/CODING/PEL/frontend/lib/api.ts))
- **Handler File**: `backend/routers/skills.py`
- **Response Format**: Array of strings `["AI Club · Core Member", "Robotics Lab · Project Lead", ...]`

---

### 8. Trajectory Roadmaps
- **Backend Route**: `GET /api/v1/roadmap`
- **Frontend Caller**: `fetchRoadmap()` ([`frontend/lib/api.ts`](file:///D:/CODING/PEL/frontend/lib/api.ts))
- **Handler File**: `backend/routers/skills.py`
- **Response Format**:
  ```json
  [
    { "label": "NOW", "title": "Build fundamentals", "detail": "Ship small systems. Read deeply..." },
    { "label": "NEXT", "title": "Join a research-minded team", "detail": "..." }
  ]
  ```

---

### 9. Contact Signal Transmission
- **Frontend Call site**: `submitContact()` form in `frontend/components/lab-notebook.tsx`
- **Next.js Proxy Route**: `POST /api/contact` ([`frontend/app/api/contact/route.ts`](file:///D:/CODING/PEL/frontend/app/api/contact/route.ts))
- **Backend Route**: `POST /api/v1/contact` ([`backend/routers/contact.py`](file:///D:/CODING/PEL/backend/routers/contact.py))
- **Request Payload**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "Let's collaborate on an embedded AI experiment."
  }
  ```
- **Response Format**:
  ```json
  {
    "ok": true,
    "message": "Signal received from Jane Doe. Logged to S/LAB archive."
  }
  ```
- **Storage Location**: Automatically appended to `backend/data/contact_messages.json`.

---

### 10. Health Check & Root Status
- **Backend Routes**: `GET /` and `GET /health`
- **Handler File**: `backend/main.py`
- **Response**: `{"status": "ONLINE", "system": "S/LAB NOTEBOOK BACKEND API v1.0", "documentation": "/docs"}`

---

## 🛡️ Fallback & Resilience Strategy

All frontend calls in `frontend/lib/api.ts` feature **zero-downtime fallback mechanics**:
1. When `uvicorn main:app --reload --port 8000` is online, the frontend retrieves live data from FastAPI, and the header badge displays **`● FASTAPI LIVE / 8000`**.
2. If the backend is stopped, `frontend/lib/api.ts` catches the network error and falls back to static content in `frontend/data/content.ts` without throwing unhandled exceptions or breaking the UI.
