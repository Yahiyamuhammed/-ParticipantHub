from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routes import verification

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sahithyolsav Face Recognition")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(verification.router, prefix="/api/verification")

@app.get("/")
async def root():
    return {"message": "Face Recognition API", "docs": "http://127.0.0.1:8000/docs"}

@app.get("/health")
async def health():
    return {"status": "healthy"}