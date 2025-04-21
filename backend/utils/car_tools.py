from datetime import date, datetime
from typing import Optional, Union
from backend.common.mindsdb_query import mindsdb_query



"""
I couldn't use all these tools as planned. I was initially planning to use all the following functions with LangChain tools, but after discussing with the MindsDB team, I found out that the tools feature has some bugs and needs to be refactored :/ . They suggested a few workarounds, but since I'm not very comfortable with Python and my AWS bill is increasing, I came up with a workaround of my own. I'm now using MindsDB's Slack handler to forward user queries related to booking or canceling directly to live agents. :D
"""



#------------------------------------------------------------------------------------------------------------------------------------------
def search_car_rentals(
    location: Optional[str] = None,
    name: Optional[str] = None,
    price_tier: Optional[str] = None,
    start_date: Optional[Union[datetime, date]] = None,
    end_date: Optional[Union[datetime, date]] = None
) ->list[dict]:
    """
    Search for car rentals based on the given location, name, price_tier, start and end date.
    Args:
        location: The locationn of the car rental. Default to None.
        name: The name of the car rental company. Default to None.
        price_tier: The price_tier of the car rental. Default to None.
        start_date: The start date of the car rental. Default to None.
        end_date: The end date of the car rental. Default to None.
    Returns:
        list[dict]: A list of car rentatl dictionaries matching the search filter.
    """

    conditions = []

    if location: 
        conditions.append(f"location = '{location}'")

    if name: 
        conditions.append(f"name= '{name}'")
    
    if price_tier:
        conditions.append(f"price_tier = '{price_tier}'")
    
    if start_date: 
        conditions.append(f"start_date = '{start_date}'")

    if end_date:
        conditions.append(f"end_date = '{end_date}'")

    where_clause = "AND".join(conditions)

    sql_query = f"""
    SELECT FROM car_rentals WHERE {where_clause}
    """

    return mindsdb_query(sql_query)

def book_car_rental(rental_id: int)->str:
    """
    Book a car rental by its ID.
    Args:
        rental_id: The ID of the car rental to book.
    Returns:
        str: A message indicationg whether the car rental was booked or not.
    """

    sql_query = f"""
    UPDATE car_rentals SET booked = 1 WHERE id = {rental_id}
    """
    res = mindsdb_query(sql_query=sql_query)
    return f"Car rental {rental_id} successfully booked." if res else f"No car rental found with ID {rental_id}"

def update_car_rental(
        rental_id: int,
        start_date: Optional[Union[datetime, date]] = None,
        end_date: Optional[Union[datetime, date]] = None
)-> str:
    """
    Update a car rental's start and end dates by its ID.
    Args:
        rental_id: The ID of the car rental to update.
        start_date: The new start date of the car rental. Default to None.
        end_date: The new end date of the car rental. Default to None.
    Returns:
        str: A message indicating whether the car rental was successfully updated or not.
    """
    updates = []
    if start_date:
        updates.append(f"start_date = '{start_date}'")
    if end_date:
        updates.append(f"end_date = '{end_date}'")

    if not updates:
        return "No update parameters provided."

    sql_query = f"""
    UPDATE car_rentals SET {', '.join(updates)} WHERE id = {rental_id}
    """

    res = mindsdb_query(sql_query=sql_query)
    return f"Car rental {rental_id} successfully updated." if res else f"No car rental found with ID {rental_id}" 

def cancel_car_rentals(rental_id: int)-> str:
    
    """
    cancel a car rental by its ID.
    Args:
        rental_id: The ID of the car rental to cancel.
    Returns:
        str: A message indicating whether the car rental was successfully cancel or not.
    """

    sql_query = f"""
    UPDATE car_rentals SET booked = 0 WHERE id {rental_id}
    """
    res = mindsdb_query(sql_query=sql_query)
    return f"Car rental {rental_id} successfully cancelled." if res else f"No car rental found with ID {rental_id}"
    



