from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.graphql import GraphQLApp

from app.schema import schema

api = FastAPI()

origins = [
    "http://localhost:3000",
]

api.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api.add_route("/graphql", GraphQLApp(schema=schema))


@api.get("/")
def read_root():
    return {"Hello": "World"}
