import asyncio
import json
import os
import sys

from app.db import db, table
from app.models import EventModel, create_event
from app.schema import schema
from expenses.models import ExpenseModel
from expenses.view_models import update_expense_view_model
from rx import operators as op
from utils.async_stream import async_stream
from utils.from_aiter import from_aiter


def report(x: str):
    sys.stderr.write(x + os.linesep)


def create_event_source(loop):
    url = os.environ["CASHCOG_EXPENSE_STREAM_URL"]
    source = from_aiter(async_stream(url), loop)
    return source


def on_response(response):
    if response:
        expense_event_fields = json.loads(response)
        uuid = expense_event_fields["uuid"]
        report(uuid)
        if not table(EventModel).find_one({"payload.uuid": uuid}):
            expense_event = create_event(
                "expense", ExpenseModel(**expense_event_fields)
            )
            table(EventModel).insert_one(expense_event.dict())
            update_expense_view_model(expense_event)


async def main(loop):
    done = asyncio.Future()

    source = create_event_source(loop)
    source.subscribe(
        on_next=on_response,
        on_error=lambda e: report("error: {}".format(e)),
        on_completed=lambda: done.set_result(0),
    )
    await done


if __name__ == "__main__":
    report("cashcog: Streaming expense events to local database\n")
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main(loop))
