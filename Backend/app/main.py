from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import API_TITLE, API_VERSION, API_DESCRIPTION
from app.routes import verification

app = FastAPI(
    title=API_TITLE,
    version=API_VERSION,
    description=API_DESCRIPTION
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(verification.router)


@app.get("/")
async def root():
    return {
        "message": "Welcome to Sahithyolsav Face Recognition API",
        "version": API_VERSION,
        "docs": "http://127.0.0.1:8000/docs"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Sahithyolsav Face Recognition"}