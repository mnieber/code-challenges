import graphene
from expenses.schema import ExpensesMutation, ExpensesQuery


class Mutation(ExpensesMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=ExpensesQuery, mutation=Mutation)
