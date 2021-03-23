import { action, observable, computed, makeObservable } from 'mobx';
import { forEach, flow, always, values, filter } from 'lodash/fp';
import { ExpenseByIdT, expenseStatus, ExpenseT } from 'src/expenses/types';
import { resetRS, updateRes } from 'src/utils/RST';
import * as expensesApi from 'src/expenses/api';

export class ExpensesStore {
  @observable expenseById: ExpenseByIdT = {};
  @observable expenseByIdRS: any = resetRS();

  constructor() {
    makeObservable(this);
  }

  @action loadExpenses() {
    updateRes(
      this,
      'expenseByIdRS',
      () => {
        return expensesApi.getExpenses();
      },
      (response: any) => {
        this.addExpenses(response.expenses);
      },
      (message: any) => {
        console.log(message);
        return 'Oops, there was an error getting the expenses data';
      }
    );
  }

  @action addExpenses(expenses: ExpenseT[]) {
    forEach((expense) => {
      this.expenseById[expense.uuid] = expense;
    }, expenses);
  }

  @computed get all(): ExpenseT[] {
    return flow(always(this.expenseById), values)();
  }

  @computed get pending(): ExpenseT[] {
    return flow(
      always(this.expenseById),
      values,
      filter((x: ExpenseT) => expenseStatus(x) === 'pending')
    )();
  }
}
