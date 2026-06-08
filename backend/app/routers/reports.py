from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.dependencies import get_db

from app.models.report import Report
from app.models.analysis import Analysis

from app.schemas.report import ReportCreate

from app.services.openai_service import classify_vulnerability

from app.services.embedding_service import generate_embedding

from app.services.vector_service import (
    add_report_embedding,
    check_for_duplicate
)

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

    report_text = f"""
Title:
{report.title}

Description:
{report.description}

Steps:
{report.steps}

Impact:
{report.impact}

Asset:
{report.asset}
"""

    embedding = generate_embedding(
        report_text
    )

    duplicate = check_for_duplicate(
        embedding
    )

    if duplicate:

        return {
            "duplicate_found": True,
            "existing_report": duplicate
        }

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

    ai_result = classify_vulnerability(
        report_text
    )

    analysis = Analysis(
        report_id=new_report.id,
        vulnerability_type=ai_result["vulnerability_type"],
        severity=ai_result["severity"],
        cwe=ai_result["cwe"],
        owasp=ai_result["owasp"],
        root_cause=ai_result["root_cause"],
        remediation=ai_result["remediation"]
    )

    db.add(analysis)

    db.commit()

    db.refresh(analysis)

    add_report_embedding(
        report_id=str(new_report.id),
        embedding=embedding,
        metadata={
            "title": new_report.title,
            "severity": analysis.severity,
            "asset": new_report.asset
        }
    )

    return {
        "duplicate_found": False,
        "report_id": new_report.id,
        "analysis_id": analysis.id,
        "vulnerability_type": analysis.vulnerability_type,
        "severity": analysis.severity,
        "cwe": analysis.cwe,
        "owasp": analysis.owasp,
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
            "vulnerability_type":
                analysis.vulnerability_type if analysis else None,

            "severity":
                analysis.severity if analysis else None,

            "cwe":
                analysis.cwe if analysis else None,

            "owasp":
                analysis.owasp if analysis else None,

            "root_cause":
                analysis.root_cause if analysis else None,

            "remediation":
                analysis.remediation if analysis else None
        }
    }