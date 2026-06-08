from fastapi import APIRouter

from app.services.openai_service import classify_vulnerability

router = APIRouter()


@router.post("/analyze")
def analyze_report():

    sample_report = """
Stored XSS in customer notes page.

An attacker can submit:

<script>alert(1)</script>

which executes when another user views the note.
"""

    result = classify_vulnerability(sample_report)

    return result