from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.routers.analysis import router as analysis_router

from app.database import engine
from app.database import Base

from app.models.report import Report
from app.models.analysis import Analysis
from app.routers.reports import router as reports_router

app = FastAPI(
    title="VulnOps API",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(
    analysis_router,
    prefix="/api"
)

app.include_router(
    reports_router,
    prefix="/api"
)


@app.get("/")
def root():
    return {
        "message": "Welcome to VulnOps"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


