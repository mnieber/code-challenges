import typing as T
import uuid
from datetime import datetime

from employees.models import EmployeeModel
from pydantic import BaseModel
from utils.time import utcnow


class ResolutionModel(BaseModel):
    expense_uuid: uuid.UUID
    status: T.Literal["approved", "declined", "pending"]
    created_at: datetime
    reason: T.Optional[str]


class ExpenseModel(BaseModel):
    uuid: uuid.UUID
    description: str
    created_at: datetime
    amount: int
    currency: str
    employee: EmployeeModel


def create_pending_resolution(expense: ExpenseModel):
    return ResolutionModel(
        expense_uuid=expense.uuid, status="pending", created_at=utcnow()
    )
