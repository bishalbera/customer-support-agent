from backend.assistants.car_rental_agent import handle_car_rental_query
from backend.assistants.flight_agent import handle_flight_query
from backend.assistants.hotel_agent import handle_hotel_query


def route_user_query(query: str) -> dict:
    lowered = query.lower()

    if "flight" in  lowered or "ticket" in lowered or "airline" in lowered:
        return handle_flight_query(query)
    elif "car" in lowered or "cars" in lowered or "rental" in lowered:
        return handle_car_rental_query(query)
    elif "hotel" in lowered or "hotesl" in lowered:
        return handle_hotel_query(query)

    else:
        return{
            "response": "I'm not sure which assistant to use. Try mentioning 'flight' or 'hotel' or 'car'."
        }