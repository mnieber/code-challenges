import typing as T
import uuid

from pydantic import BaseModel


class MeasurementModel(BaseModel):
    line_id: str
    timestamp_ms: float
    value: float


class MetricsModel(BaseModel):
    line_id: str
    avg: float
    min: float
    max: float
