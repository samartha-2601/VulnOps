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
    top_k: int = 1
):

    return collection.query(
        query_embeddings=[embedding],
        n_results=top_k
    )


def check_for_duplicate(
    embedding,
    threshold: float = 0.20
):

    results = find_similar_reports(
        embedding=embedding,
        top_k=1
    )

    ids = results["ids"][0]
    distances = results["distances"][0]
    metadata = results["metadatas"][0]

    if not ids:
        return None

    distance = distances[0]

    if distance <= threshold:
        return {
            "report_id": ids[0],
            "distance": distance,
            "metadata": metadata[0]
        }

    return None