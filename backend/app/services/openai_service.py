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
  "root_cause": "",
  "remediation": ""
}

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