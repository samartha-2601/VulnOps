from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.dependencies import get_db

from app.models.report import Report

from app.schemas.report import ReportCreate

from app.models.analysis import Analysis

from app.services.openai_service import classify_vulnerability

router = APIRouter()


@router.get("/reports")
def get_reports(
    db: Session = Depends(get_db)
):

    reports = db.query(Report).all()

    results = []

    for report in reports:

        analysis = (
            db.query(Analysis)
            .filter(
                Analysis.report_id == report.id
            )
            .first()
        )

        results.append(
            {
                "id": report.id,
                "title": report.title,
                "description": report.description,
                "severity":
                    analysis.severity
                    if analysis
                    else "Unknown"
            }
        )

    return results


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

    report_text = f"""
Title: {report.title}

Description:
{report.description}

Steps:
{report.steps}

Impact:
{report.impact}

Asset:
{report.asset}
"""

    ai_result = classify_vulnerability(report_text)

    analysis = Analysis(
        report_id=new_report.id,
        vulnerability_type=ai_result["vulnerability_type"],
        severity=ai_result["severity"],
        root_cause=ai_result["root_cause"],
        remediation=ai_result["remediation"]
    )

    db.add(analysis)

    db.commit()

    db.refresh(analysis)

    return {
        "report_id": new_report.id,
        "analysis_id": analysis.id,
        "vulnerability_type": analysis.vulnerability_type,
        "severity": analysis.severity,
        "root_cause": analysis.root_cause,
        "remediation": analysis.remediation
    }


@router.get("/reports/{report_id}")
def get_report_details(
    report_id: int,
    db: Session = Depends(get_db)
):

    report = (
        db.query(Report)
        .filter(Report.id == report_id)
        .first()
    )

    if not report:
        return {
            "error": "Report not found"
        }

    analysis = (
        db.query(Analysis)
        .filter(
            Analysis.report_id == report_id
        )
        .first()
    )

    return {
        "report": {
            "id": report.id,
            "title": report.title,
            "description": report.description,
            "steps": report.steps,
            "impact": report.impact,
            "asset": report.asset
        },
        "analysis": {
            "vulnerability_type": analysis.vulnerability_type if analysis else None,
            "severity": analysis.severity if analysis else None,
            "root_cause": analysis.root_cause if analysis else None,
            "remediation": analysis.remediation if analysis else None
        }
    }