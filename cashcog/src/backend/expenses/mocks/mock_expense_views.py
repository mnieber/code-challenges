import datetime

import dateparser
from employees.models import EmployeeModel
from expenses.models import ExpenseModel, ResolutionModel
from expenses.view_models import ExpenseViewModel
from utils.time import utcnow

mock_expense_views = [
    ExpenseViewModel(
        expense=ExpenseModel(
            uuid="30691fea-8816-403a-a1ed-f00f14c5a75d",
            description="Nobis dolorum culpa iusto saepe alias atque maiores.",
            created_at=dateparser.parse("2020-12-08"),
            amount=711,
            currency="AED",
            employee=EmployeeModel(
                uuid="8ed3977d-63b7-4790-a852-d38149d170f6",
                first_name="Annelies",
                last_name="Pechel",
            ),
        ),
        resolution=ResolutionModel(
            expense_uuid="30691fea-8816-403a-a1ed-f00f14c5a75d",
            status="pending",
            created_at=utcnow(),
        ),
    ),
    ExpenseViewModel(
        expense=ExpenseModel(
            uuid="975af3f6-55e5-5b18-9b77-b034e98ff4e0",
            description="coming unusual dish recall happened hard leaving ask herself it various command ability example adventure anything harbor fear sign below rabbit spite bean organized",
            created_at=dateparser.parse("2020-10-08"),
            amount=30,
            currency="EUR",
            employee=EmployeeModel(
                uuid="8ed3977d-63b7-4790-a852-d38149d170f6",
                first_name="Annelies",
                last_name="Pechel",
            ),
        ),
        resolution=ResolutionModel(
            expense_uuid="975af3f6-55e5-5b18-9b77-b034e98ff4e0",
            status="pending",
            created_at=utcnow(),
        ),
    ),
    ExpenseViewModel(
        expense=ExpenseModel(
            uuid="cb7ca971-6791-5448-9c52-fd58dbd09751",
            description="drew doing shall is search dirt fully strong air rapidly longer stream examine flame difficulty milk stared speech forward eat everyone pencil uncle follow",
            created_at=dateparser.parse("2020-04-08"),
            amount=66,
            currency="EUR",
            employee=EmployeeModel(
                uuid="8ed3977d-63b7-4790-a852-d38149d170f6",
                first_name="Annelies",
                last_name="Pechel",
            ),
        ),
        resolution=ResolutionModel(
            expense_uuid="cb7ca971-6791-5448-9c52-fd58dbd09751",
            created_at=dateparser.parse("2020-04-11"),
            status="approved",
        ),
    ),
    ExpenseViewModel(
        expense=ExpenseModel(
            uuid="0d129a86-a3ce-51e6-afc0-226ea2e00a6d",
            description="third flower prepare jungle left ever me view thirty he each grass grain brother student heavy previous thumb post general tales major belong planning",
            created_at=dateparser.parse("2020-02-09"),
            amount=777,
            currency="EUR",
            employee=EmployeeModel(
                uuid="8ed3977d-63b7-4790-a852-d38149d170f6",
                first_name="Annelies",
                last_name="Pechel",
            ),
        ),
        resolution=ResolutionModel(
            expense_uuid="0d129a86-a3ce-51e6-afc0-226ea2e00a6d",
            status="declined",
            created_at=dateparser.parse("2020-02-11"),
            reason="too expensive",
        ),
    ),
]
