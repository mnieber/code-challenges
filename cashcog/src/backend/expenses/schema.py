import uuid

import graphene
import pydantic
from app.db import table
from app.models import EventModel, create_event
from employees.schema import Employee
from graphene_pydantic import PydanticInputObjectType, PydanticObjectType
from starlette.graphql import GraphQLApp
from utils.time import utcnow

from expenses.models import ExpenseModel, ResolutionModel
from expenses.view_models import ExpenseViewModel, update_expense_view_model


class ResolutionFormModel(ResolutionModel):
    status: str


class ResolutionForm(PydanticInputObjectType):
    class Meta:
        model = ResolutionFormModel
        exclude_fields = ("created_at",)


class Resolution(PydanticObjectType):
    class Meta:
        model = ResolutionModel
        exclude_fields = ("status",)

    status = graphene.String()

    def resolve_status(self, info, **kwargs):
        return self.status


class Expense(PydanticObjectType):
    class Meta:
        model = ExpenseModel


class ExpenseView(PydanticObjectType):
    class Meta:
        model = ExpenseViewModel


class ExpensesQuery(graphene.ObjectType):
    expenses = graphene.List(ExpenseView)

    @staticmethod
    def resolve_expenses(info, name):
        expense_view_model_dicts = (
            table(ExpenseViewModel).find({}).sort("expense.created_at", -1)
        )
        expense_view_models = [ExpenseViewModel(**x) for x in expense_view_model_dicts]
        return expense_view_models


class CreateResolutions(graphene.Mutation):
    class Arguments:
        resolution_forms = graphene.List(ResolutionForm)

    Output = graphene.List(ExpenseView)

    @staticmethod
    def mutate(parent, info, resolution_forms):
        resolutions = []
        for resolution_form in resolution_forms:
            resolution = ResolutionModel(created_at=utcnow(), **resolution_form)
            expense_event = create_event("resolution", resolution)
            table(EventModel).insert_one(expense_event.dict())
            update_expense_view_model(expense_event)
            resolutions.append(resolution)

        expense_view_model_dicts = table(ExpenseViewModel).find(
            {"expense.uuid": {"$in": [x.expense_uuid for x in resolution_forms]}}
        )
        expense_view_models = [ExpenseViewModel(**x) for x in expense_view_model_dicts]
        return expense_view_models


class ExpensesMutation(graphene.ObjectType):
    createResolutions = CreateResolutions.Field()
