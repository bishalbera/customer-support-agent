from datetime import date, datetime
from typing import Optional
import pytz

from backend.common.mindsdb_query import mindsdb_query




def fetch_user_flight_info(passenger_id) -> list[dict]: 
    """Fetch all tickets for the user along with corresponding flight information and seat assignments.
    Returns:
      A list of dictionaries where each dictionary contains the ticket details,
      associated flight details, and the seat assignments for each ticket belonging to the user.
    """
    if not passenger_id:
        raise ValueError("No passenger Id given")

    sql_query= f"""
    SELECT
      t.ticket_no, t.book_ref,
        f.flight_id, f.flight_no, f.departure_airport, f.arrival_airport, f.scheduled_departure, f.scheduled_arrival,
        bp.seat_no, tf.fare_conditions
    FROM 
        redshift_datasource.tickets t
        JOIN redshift_datasource.ticket_flights tf ON t.ticket_no = tf.ticket_no
        JOIN redshift_datasource.flights f ON tf.flight_id = f.flight_id
        JOIN redshift_datasource.boarding_passes bp ON bp.ticket_no = t.ticket_no AND bp.flight_id = f.flight_id
    WHERE 
        t.passenger_id = {passenger_id}

    """

    data = mindsdb_query(sql_query)
    return data or []


    
def search_flights( 
            departure_airport: Optional[str]= None,
            arrival_airport: Optional[str] = None,
            start_time: Optional[date | datetime] = None,
            end_time: Optional[date| datetime ] = None,
            limit: int = 20
    )-> list[dict ]:
  
       """ Search for flights based on departure airport, arrival airport, and departure time range"""
       conditions = []

       if departure_airport:
        conditions.append(f"departure_airport = '{departure_airport}'")

       if arrival_airport:
        conditions.append(f"arrival_airport = '{arrival_airport}'")

       if start_time:
        conditions.append(f"scheduled_departure >= '{start_time}'")

       if end_time:
        conditions.append(f"scheduled_departure <= '{end_time}'")

       where_clause = " AND ".join(conditions)
       if where_clause:
        sql_query = f"SELECT * FROM flights WHERE {where_clause} LIMIT {limit}"
       else:
        sql_query = f"SELECT * FROM flights LIMIT {limit}"

       return mindsdb_query(sql_query)

        


def update_ticket_to_new_flight(
          ticket_no: str, new_flight_id: int, passenger_id
)-> str:
     """Update the user's ticket to a new valid flight."""

     if not passenger_id:
        raise ValueError("No passenger ID given.")

     sql_query_1 = f"""
    SELECT scheduled_departure FROM flights WHERE flight_id = {new_flight_id}
    """
     new_flight_data = mindsdb_query(sql_query_1)
     if not new_flight_data:
        return "Invalid new flight ID provided."

     try:
        departure_time_str = new_flight_data[0]["scheduled_departure"]
        departure_time = datetime.strptime(departure_time_str, "%Y-%m-%d %H:%M:%S.%f%z")
     except Exception:
        return "Error parsing scheduled departure time from new flight."

     current_time = datetime.now(tz=pytz.timezone("Etc/GMT-3"))
     time_until = (departure_time - current_time).total_seconds()

     if time_until < 3 * 3600:
        return f"Not permitted to reschedule to a flight within 3 hours. Selected flight is at {departure_time}."

     check_ticket_query = f"""
     SELECT ticket_no FROM tickets WHERE ticket_no = {ticket_no} AND passenger_id = '{passenger_id}'
     """
     ticket_check = mindsdb_query(check_ticket_query)
     if not ticket_check:
        return f"Current signed-in passenger with ID {passenger_id} is not the owner of ticket {ticket_no}."

     update_query = f"""
     UPDATE ticket_flights SET flight_id = {new_flight_id} WHERE ticket_no = {ticket_no}
     """
     response = mindsdb_query(update_query)
     return "Ticket successfully updated to new flight." if response else "Failed to update ticket."

           


def cancel_ticket(ticket_no: str, passenger_id) -> str:
     """Cancel the user's ticket and remove it from the db."""
     if not passenger_id:
        raise ValueError("No passenger ID given.")

     check_ticket_query = f"""
     SELECT ticket_no FROM tickets WHERE ticket_no = {ticket_no} AND passenger_id = '{passenger_id}'
     """
     ticket_check = mindsdb_query(check_ticket_query)
     if not ticket_check:
        return f"Current signed-in passenger with ID {passenger_id} is not the owner of ticket {ticket_no}."

     delete_flight_query = f"""
     DELETE FROM ticket_flights WHERE ticket_no = {ticket_no}
     """
     delete_resp = mindsdb_query(delete_flight_query)
     return "Ticket successfully cancelled." if delete_resp else "Failed to cancel the ticket."
