from fastapi import FastAPI

from app.routers.analysis import router as analysis_router

app = FastAPI(
    title="VulnOps API",
    version="0.1.0"
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


app.include_router(
    analysis_router,
    prefix="/api"
)