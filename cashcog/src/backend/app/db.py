import typing as T

from pydantic import BaseModel
from pymongo import MongoClient

client = MongoClient("mongodb://db:27017")
db = client.cashcog


def table(table_class: T.Type[BaseModel]):
    return db[table_class.__name__.lower()]
