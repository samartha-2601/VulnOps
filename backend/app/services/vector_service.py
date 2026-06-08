import chromadb

client = chromadb.PersistentClient(
    path="./chroma_db"
)

collection = client.get_or_create_collection(
    name="reports"
)

def add_report_embedding(
    report_id: str,
    embedding,
    metadata
):

    collection.add(
        ids=[report_id],
        embeddings=[embedding],
        metadatas=[metadata]
    )


def find_similar_reports(
    embedding,
    top_k: int = 3
):

    return collection.query(
        query_embeddings=[embedding],
        n_results=top_k
    )