from app.db import table
from app.models import EventModel
from pydantic import BaseModel

from expenses.models import ExpenseModel, ResolutionModel, create_pending_resolution


class ExpenseViewModel(BaseModel):
    expense: ExpenseModel
    resolution: ResolutionModel


def update_expense_view_model(expense_event: EventModel):
    def save(expense, resolution):
        expense_view = ExpenseViewModel(expense=expense, resolution=resolution)
        table(ExpenseViewModel).replace_one(
            {"expense.uuid": expense.uuid}, expense_view.dict(), upsert=True
        )

    if expense_event.event_type == "expense":
        expense = ExpenseModel(**expense_event.payload)
        # resolution_event should be None, but you never know
        resolution_event_dict = table(EventModel).find_one(
            {"event_type": "resolution", "payload.expense_uuid": expense.uuid}
        )
        resolution = (
            resolution_event_dict["payload"]
            if resolution_event_dict
            else create_pending_resolution(expense)
        )
        save(expense, resolution)

    if expense_event.event_type == "resolution":
        resolution = ResolutionModel(**expense_event.payload)
        expense_event_dict = table(EventModel).find_one(
            {"event_type": "expense", "payload.uuid": resolution.expense_uuid}
        )
        if expense_event_dict:
            expense = ExpenseModel(**expense_event_dict["payload"])
            save(expense, resolution)
        else:
            # TODO: send error to sentry
            pass
