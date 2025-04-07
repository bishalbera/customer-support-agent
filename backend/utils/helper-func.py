from datetime import date, datetime
from typing import Optional

import pytz


def fetch_user_flight_info(passenger_id) -> list[dict]: 
    """Fetch all tickets for the user along with corresponding flight information and seat assignments.
    Returns:
      A list of dictionaries where each dictionary contains the ticket details,
      associated flight details, and the seat assignments for each ticket belonging to the user.
    """
    if not passenger_id:
        raise ValueError("No passenger Id given")

    sql_query= """
    SELECT
      

    """

    mindsdb_query(url, sql_query)


    
def search_flights( 
            departure_airport: Optional[str]= None,
            arrival_airport: Optional[str] = None,
            start_time: Optional[date | datetime] = None,
            end_time: Optional[date| datetime ] = None,
            limit: int = 20
    )-> list[dict ]:
  
       """ Search for flights based on departure airport, arrival airport, and departure time range"""

       sql_query = "SELECT * FROM flights WHERE 1 = 1"
       params = []

       if departure_airport:
             sql_query+= "AND departure_airport = ?"
             params.append(departure_airport)

       if arrival_airport: 
             sql_query+= "AND arrival_airport = ?"
             params.append(arrival_airport)

       if start_time: 
             sql_query+= "AND scheduled_departure >= ?"
             params.append(start_time)

       if end_time: 
             sql_query+= "AND scheduled_departure <= ?"
             params.append(end_time)

       sql_query+="LIMIT ?"
       params.append(limit)
        
       mindsdb_query(url, sql_query)
        


def update_ticket_to_new_flight(
          ticket_no: str, new_flight_id: int, passenger_id
)-> str:
     """Update the user's ticket to a new valid flight."""

     if not passenger_id:
           raise ValueError("No passenger Id given.")

     sql_query_1 = """
     some query
    """
    
     res = mindsdb_query(url,sql_query_1)

     new_flight = res.text[0]

     if not new_flight:
           return "Invalid new flight Id provided."

     timezone = pytz.timezone("Etc/GMT-3")
     current_time = datetime.now(tz=timezone)
     departure_time = datetime.strptime(
           new_flight["scheduled_departure"], "%Y-%m-%d %H:%M:%S.%f%z"
     )
     time_until = (departure_time - current_time).total_seconds()
     if time_until < (3 * 3600):
           return f"Not permitted to reschedule to a flight that is less than 3 hours from the current time. Selected flitht is at {departure_time}."
     sql_query_2 = """
     another query
     """
     resp = mindsdb_query(url, sql_query_2)
     current_flight = resp.text[0]

     if not current_flight:
           return "No existing ticket found for the given ticket number."

     sql_query_3 = """
     SELECT * FROM tickets WHERE ticket_no = {ticket_no} AND passenger_id = {passenger_id}
     """
     rs = mindsdb_query(url, sql_query_3)
     current_ticket = rs.text[0]
     if not current_ticket:
        return f"Current signed-in passenger with ID {passenger_id} not the owner of ticket {ticket_no}"
     sql_query_4 = """
     UPDATE ticket_flights SET flight_id = WHERE ticket_no = 
     """
     return "Ticket successfully updated to new flight."


def cancel_ticket(ticket_no: str, passenger_id) -> str:
     """Cancel the user's ticket and remove it from the db."""
     if not passenger_id:
          raise ValueError("No passenger Id given.")
     sql_query_1= """
     SELECT flight_id FROM ticker_flights WHERE ticket_no=
     """
     res = mindsdb(url, sql_query_1)
     existing_ticket = res.text[0]
     if not existing_ticket:
          return "No existing ticket found for the given ticket number."

     sql_query_2="""
     SELECT ticket_no FROM tickets WHERE ticket_no = AND passenger_id=
     """
     resp= mindsdb_query(url,sql_query_2)
     current_ticket= resp.text[0]

     if not current_ticket:
          return f"Current signed-in passenger with Id {passenger_id} not the owner of ticket {ticket_no}."

     return "Ticket successfully cancelled."
