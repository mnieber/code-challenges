import uuid

from pydantic import BaseModel


class EmployeeModel(BaseModel):
    uuid: uuid.UUID
    first_name: str
    last_name: str
