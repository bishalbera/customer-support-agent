<h1 align="center">✈️ Swiss AI Assistant</h1>

<p align= "center">
A smart AI-driven customer support system for a travel agency to help users search and make travel arrangements like, flight booking, rescheduling, hotel booking and cancellation — powered by Airbyte & MindsDB.
</p>

![Home](https://github.com/user-attachments/assets/ff61e064-c3bc-44ee-ab3d-07dd333a120f)


## Introduction 

In today's fast-paced world, **customer support expectations are higher than ever**. Travelers want instant assistance-whether it's fetching flight detials, searching for flights, booking hotels etc. Traditional support systems often struggle with high volume, long wait times, and repetitive queries. That's where an **AI-powered customer support agent** steps in: available 24/7, capable of resolving complex requests in seconds, and scalable without additional human cost. This project empowers airlines or travel platforms with a smart conversational agent that can handle real-time flight queries, booking updates, and cancellations — making customer experience smoother, faster, and more reliable.


## Project Overview
![excalidraw](https://github.com/user-attachments/assets/dd4b7503-1dfd-4f44-aed9-40d7198c90ec)



This project is **modular AI-powered customer support system** tailored for a travel agency platform. It offers specialized conversational agents for:
- ✈️ **Flight searching**
- 🚗 **Car rentals**
- 🏨 **Hotel reservations**

Each assistant is integrated with MindsDB's langchain engine to carry out intelligent conversations and execute actions (like searching flight, fethcing flight info, searching car rentals etc) using text2sql skills. I was initially planning to use   functions as tools with LangChain tools, but after discussing with the MindsDB team, I found out that the tools feature has some bugs and needs to be refactored :/ . They suggested a few workarounds, but since I'm not very comfortable with Python and my AWS bill is increasing, I came up with a workaround of my own. I'm now using MindsDB's Slack handler to forward user queries related to booking or canceling directly to real live agents in a slack channel. From there they can take over :D


Multi-Agent Workflow for Travel Booking :-
1. User Interaction
The User sends a message (e.g., a travel-related query).

2. Router Agent
The Router Agent receives the message from the user.

 It delegates the task to a suitable agent based on the content of the message.

3. Agent Delegation
The Router Agent may delegate tasks to multiple specialized agents:

✈️ Flights Agent

🚗 Car Rental Agent

🏨 Hotel Agent

4. Specialized Agent Interactions
Each of these agents can perform their specific task:

Flights Agent can query data using a flight_model + text2sql_skill.

Car Rental and Hotel agents handle their respective domains.


5. User Response
The final result (e.g., travel itinerary) is composed and a response is sent back to the user.



### Behind the Scenes: Data Pipelines & Infrastructure

To enable intelligent decisions and real time data querying, we've built a data pipeline using **Airbyte**,  **PostgreSQL**, **Redshift**, and **MindsDB**.

#### ETL Pipeline with Airbyte

1. **Source Database**: Our travel agency runs on **PostgreSQL**.
2. **Data Integration Tool**: Using **Airbyte**, we extract data from PostgreSQL and move it into **Amazon Redshift** in near real time.
3. **AI Layer**: **MindsDB** connects to this Redshift warehouse and enables running SQL queries directly over it via natural language, thanks to the AI assistant model.

This make sures that our AI  assistant always work on up-to-data

## Demo
[Click here](https://youtu.be/xG3zWpWC2w0) to watch the demo. After recording the demo, I realised that the text input box in the UI  was accidentally cut off due to OBS settings. It was my first time using OBS and I messed up 🤧. So sorry :)







