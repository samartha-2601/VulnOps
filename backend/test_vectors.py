from app.services.embedding_service import generate_embedding
from app.services.vector_service import add_report_embedding
from app.services.vector_service import find_similar_reports

text = "Stored XSS in customer notes"

embedding = generate_embedding(text)

add_report_embedding(
    report_id="test1",
    embedding=embedding,
    metadata={
        "title": text
    }
)

results = find_similar_reports(
    embedding
)

print(results)