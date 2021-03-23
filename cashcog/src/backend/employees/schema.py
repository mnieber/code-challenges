from graphene_pydantic import PydanticObjectType

from employees.models import EmployeeModel


class Employee(PydanticObjectType):
    class Meta:
        model = EmployeeModel
