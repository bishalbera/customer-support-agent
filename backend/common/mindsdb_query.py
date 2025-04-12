
import requests


MINDSDB_QUERY_ENDPOINT = "http://127.0.0.1:47334/api/sql/query"

def mindsdb_query(sql_query: str) -> list[dict] | None:
    headers = {"Content-Type": "application/json"}
    try:
        response = requests.post(
            MINDSDB_QUERY_ENDPOINT,
            json={"query": sql_query},
            headers=headers
        )
        response.raise_for_status()
        result = response.json()
        print("mindsdb raw result", result)
        return result.get("data", [])
    except requests.exceptions.RequestException as e:
        print(f"An error occurred during the HTTP request: {str(e)}")
        return None