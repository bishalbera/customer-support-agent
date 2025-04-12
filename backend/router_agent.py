from backend.assistants.flight_agent import handle_flight_query


def route_user_query(query: str) -> dict:
    lowered = query.lower()

    if "flight" in  lowered or "ticket" in lowered or "airline" in lowered:
        return handle_flight_query(query)

    else:
        return{
            "response": "I'm not sure which assistant to use. Try mentioning 'flight' or 'hotel'."
        }