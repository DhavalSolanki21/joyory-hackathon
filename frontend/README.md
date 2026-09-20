# Upteky MindBase — ReactJS Frontend Application

This folder contains the ReactJS frontend interface for **Upteky MindBase**.

## 🚀 Setup & Running Frontend

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Vite Development Server
```bash
npm run dev
```

The React frontend will start at `http://localhost:5173` (or `http://localhost:3000`).

---

## 📡 API Integration Configuration

All API calls connect to the Django REST Framework backend running on `http://127.0.0.1:8000/api/documents/`.

### Endpoints
- `POST http://127.0.0.1:8000/api/documents/upload/` — Ingest PDF file (multipart/form-data)
- `POST http://127.0.0.1:8000/api/documents/<id>/confirm/` — Confirm & index document
- `POST http://127.0.0.1:8000/api/documents/chat/` — Query Personalized AI Assistant
- `GET  http://127.0.0.1:8000/api/documents/` — List indexed company files
