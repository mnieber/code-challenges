import { action, observable, computed, makeObservable } from 'mobx';
import { forEach, reduce, flow, always, filter, concat, map } from 'lodash/fp';
import {
  expenseAmountInEuro,
  ExpenseResolutionStatusT,
  ExpenseT,
  ResolutionStatusByExpenseIdT,
} from 'src/expenses/types';
import * as expensesApi from 'src/expenses/api';
import { updateRes, resetRS, RST, updatedRS } from 'src/utils/RST';
import { ExpensesStore } from 'src/expenses/ExpensesStore';

export class InboxStore {
  @observable resolutionStatusByExpenseId: ResolutionStatusByExpenseIdT = {};

  @observable expenses: ExpenseT[] = [];
  @observable expensesRS: RST = resetRS();
  @observable submittingRS: RST = updatedRS();

  constructor() {
    makeObservable(this);
  }

  _filterApproved = (x: ExpenseT) =>
    this.resolutionStatusByExpenseId[x.uuid] === 'approved';

  _filterDeclined = (x: ExpenseT) =>
    this.resolutionStatusByExpenseId[x.uuid] === 'declined';

  @action setResolutionStatus(
    expenseId: string,
    status: ExpenseResolutionStatusT
  ) {
    this.resolutionStatusByExpenseId[expenseId] = status;
  }

  // here it gets a bit confusing because expenses that are pending in the backend
  // receive a preliminary resolution status in the inbox. But they are still pending!
  // This is modelled as follows: if an expense is shown in the inbox then it must
  // be pending, and if it's resolution status in the inbox is undefined then it does
  // not yet have a preliminary resolution status.
  @computed get toBeConfirmed(): ExpenseT[] {
    return flow(
      always(this.expenses),
      filter(
        (x: ExpenseT) => this.resolutionStatusByExpenseId[x.uuid] !== undefined
      )
    )();
  }

  @computed get amountToBeConfirmed(): number {
    return reduce((sum, x) => sum + expenseAmountInEuro(x), 0, this.approved);
  }

  @computed get approved(): ExpenseT[] {
    return filter(this._filterApproved, this.toBeConfirmed);
  }

  @computed get declined(): ExpenseT[] {
    return filter(this._filterDeclined, this.toBeConfirmed);
  }

  submitConfirmations(expensesStore: ExpensesStore) {
    const toResolution = (status: ExpenseResolutionStatusT) => (
      expense: ExpenseT
    ) => ({
      status,
      expenseUuid: expense.uuid,
    });

    updateRes(
      this,
      'submittingRS',
      () =>
        expensesApi.confirmExpenses(
          concat(
            map(toResolution('approved'), this.approved),
            map(toResolution('declined'), this.declined)
          )
        ),
      (response: any) => {
        forEach((x: ExpenseT) => {
          delete this.resolutionStatusByExpenseId[x.uuid];
        }, response.expenses);
        expensesStore.addExpenses(response.expenses);
      },
      (message: string) => {
        console.log(message);
        return 'Oops, there was an error submitting the confirmation data';
      }
    );
  }
}
