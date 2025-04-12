from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.router_agent import route_user_query

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)
class AssistantQuery(BaseModel):
    question: str


@app.get("/")
def hello():
    return "Hello World 🖤"


@app.post("/agent")
def swiss(body: AssistantQuery):
    return route_user_query(body.question)

