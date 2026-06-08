from openai import OpenAI

from app.config import settings

client = OpenAI(
    api_key=settings.OPENAI_API_KEY
)


def classify_vulnerability(report_text: str):

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": """
You are a cybersecurity analyst.

Analyze the vulnerability report and return:

1. Vulnerability Type
2. Severity
3. Brief Explanation
"""
            },
            {
                "role": "user",
                "content": report_text
            }
        ]
    )

    return response.choices[0].message.content