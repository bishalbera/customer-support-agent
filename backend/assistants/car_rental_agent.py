from backend.common.mindsdb_query import mindsdb_query


def handle_car_rental_query(query: str)-> dict:
    lowered = query.lower()
    if "cancel" in lowered or "book" in lowered: 
        sql_query_1 = f"""
        INSERT INTO slack_datasource.messages (channel_id, text)
        VALUES('C06FF39AWE9', '{query}');
        """
        result = mindsdb_query(sql_query=sql_query_1)
        return {"response": "We have sent your request to our live agents."}
    sql_query = f"""
    SELECT question,answer
    FROM car_rental_agent
    WHERE question ='{query}'
    """

    result = mindsdb_query(sql_query=sql_query)
    print(f"Result: {result}")
    return {"response": result[0][1] if result else "No response from car rental assistant."}