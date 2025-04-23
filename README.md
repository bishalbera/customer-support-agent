<h1 align="center">✈️ Swiss AI Assistant</h1>

<p align= "center">
A smart AI-driven customer support system for a travel agency to help users search and make travel arrangements like, flight booking, rescheduling, hotel booking and cancellation — powered by **Airbyte** & **MindsDB**.
</p>

![Home](https://github.com/user-attachments/assets/ff61e064-c3bc-44ee-ab3d-07dd333a120f)


## Introduction 

In today's fast-paced world, **customer support expectations are higher than ever**. Travelers want instant assistance-whether it's fetching flight detials, searching for flights, booking hotels etc. Traditional support systems often struggle with high volume, long wait times, and repetitive queries. That's where an **AI-powered customer support agent** steps in: available 24/7, capable of resolving complex requests in seconds, and scalable without additional human cost. This project empowers airlines or travel platforms with a smart conversational agent that can handle real-time flight queries, booking updates, and cancellations — making customer experience smoother, faster, and more reliable.


## Project Overview

This project is **modular AI-powered customer support system** tailored for a travel agency platform. It offers specialized conversational agents for:
- ✈️ **Flight searching**
- 🚗 **Car rentals**
- 🏨 **Hotel reservations**

Each assistant is integrated with MindsDB's langchain engine to carry out intelligent conversations and execute actions (like searching flight, fethcing flight info, searching car rentals etc) using text2sql skills. I was initially planning to use   functions as tools with LangChain tools, but after discussing with the MindsDB team, I found out that the tools feature has some bugs and needs to be refactored :/ . They suggested a few workarounds, but since I'm not very comfortable with Python and my AWS bill is increasing, I came up with a workaround of my own. I'm now using MindsDB's Slack handler to forward user queries related to booking or canceling directly to real live agents in a slack channel. From there they can take over :D


### Behind the Scenes: Data Pipelines & Infrastructure

To enable intelligent decisions and real time data querying, we've built a data pipeline using **Airbyte**,  **PostgreSQL**, **Redshift**, and **MindsDB**.

#### ETL Pipeline with Airbyte

1. **Source Database**: Our travel agency runs on **PostgreSQL**.
2. **Data Integration Tool**: Using **Airbyte**, we extract data from PostgreSQL and move it into **Amazon Redshift** in near real time.
3. **AI Layer**: **MindsDB** connects to this Redshift warehouse and enables running SQL queries directly over it via natural language, thanks to the AI assistant model.

This make sures that our AI  assistant always work on up-to-data.







