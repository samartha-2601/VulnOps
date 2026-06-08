from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.dependencies import get_db

from app.models.report import Report

from app.schemas.report import ReportCreate

router = APIRouter()


@router.post("/reports")
def create_report(
    report: ReportCreate,
    db: Session = Depends(get_db)
):

    new_report = Report(
        title=report.title,
        description=report.description,
        steps=report.steps,
        impact=report.impact,
        asset=report.asset
    )

    db.add(new_report)

    db.commit()

    db.refresh(new_report)

    return {
        "report_id": new_report.id,
        "status": "submitted"
    }