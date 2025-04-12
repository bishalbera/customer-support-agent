from backend.common.mindsdb_query import mindsdb_query


        
def create_flight_assistant():
    sql_query = f"""
    CREATE MODEL flight_assistant
    PREDICT answer
    USING
        engine = 'langchain_engine',
        model_name = 'google_gemini_model',
        provider = 'mindsdb',
        mode = 'conversational',
        user_column = 'question',
        assistant_column = 'answer',
        verbose = 'true',
        prompt_template = "You are a helpful and intelligent customer support assistant for a travel agency, focused on FLIGHT-related issues.
        Your task is to understand the user's questions and resolve them using available tools.

        Whenever you're handling sensitive operations (like cancellations or rebookings), ask the user for confirmation before proceeding.

        When a tool requires parameters, extract those from the user’s input. For example, if the user says 'Show my flights,' extract the passenger ID and call `fetch_user_flight_info` with it.

        Be persistent. If one query returns no results, expand your search before giving up. If you don’t understand something, ask the user for clarification.

        {{question}}";
    """

    res = mindsdb_query(sql_query=sql_query)
    if res is not None:
            print(res)
    else:
        print("Failed to create model. No response received.")


create_flight_assistant()
