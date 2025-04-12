from backend.common.mindsdb_query import mindsdb_query


def handle_flight_query(query: str)-> dict:
    sql_query = f"""
    SELECT question,answer
    FROM flight_agent
    WHERE question ='{query}'
    USING
    tools = [
    'fetch_user_flight_info',
    'search_flights',
    'update_ticket_to_new_flight',
    'cancel_ticket'
    ]
    """

    result = mindsdb_query(sql_query=sql_query)
    print(f"Result: {result}")
    return {"response": result[0][1] if result else "No response from flight assistant."}