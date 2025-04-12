from backend.common.mindsdb_query import mindsdb_query
from backend.utils.car_tools import search_car_rentals, update_car_rental, book_car_rental, cancel_car_rentals


def car_rental_agent_query(query: str)-> dict:
    sql_query = f"""
    SELECT question,answer
    FROM car_rental_agent
    WHERE question ='{query}'
    USING
    tools = [
    '{search_car_rentals}',
    '{update_car_rental}',
    '{book_car_rental}',
    '{cancel_car_rentals}'
    ]
    """

    result = mindsdb_query(sql_query=sql_query)
    print(f"Result: {result}")
    return {"response": result[0][1] if result else "No response from car rental assistant."}