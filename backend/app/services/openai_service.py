import json

from openai import OpenAI

from app.config import settings

client = OpenAI(
    api_key=settings.OPENAI_API_KEY
)


def classify_vulnerability(report_text: str):

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "system",
                "content": """
You are an expert security analyst.

Analyze the vulnerability report and return ONLY valid JSON.

Return this exact structure:

{
  "vulnerability_type": "",
  "severity": "",
  "cwe": "",
  "owasp": "",
  "root_cause": "",
  "remediation": ""
}

Map common vulnerabilities to CWE and OWASP categories.

Examples:

SQL Injection:
- CWE-89
- A03:2021 Injection

Stored XSS:
- CWE-79
- A03:2021 Injection

Reflected XSS:
- CWE-79
- A03:2021 Injection

SSRF:
- CWE-918
- A10:2021 SSRF

IDOR:
- CWE-639
- A01:2021 Broken Access Control

CSRF:
- CWE-352
- A01:2021 Broken Access Control

Severity must be one of:

Critical
High
Medium
Low
Informational
"""
            },
            {
                "role": "user",
                "content": report_text
            }
        ]
    )

    content = response.choices[0].message.content

    return json.loads(content)