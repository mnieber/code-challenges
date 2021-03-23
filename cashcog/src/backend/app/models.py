import typing as T
import uuid

from pydantic import BaseModel


class EventModel(BaseModel):
    event_type: str
    payload: T.Any


def create_event(event_type: str, payload: T.Any):
    return EventModel(event_type=event_type, payload=payload.dict())
