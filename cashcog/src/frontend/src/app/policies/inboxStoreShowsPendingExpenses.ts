import { reaction } from 'mobx';
import { ExpensesStore } from 'src/expenses/ExpensesStore';
import { InboxStore } from 'src/inbox/InboxStore';

export const inboxStoreShowsPendingExpenses = (
  expensesStore: ExpensesStore,
  inboxStore: InboxStore
) => {
  reaction(
    () => ({
      pending: expensesStore.pending,
      rs: expensesStore.expenseByIdRS,
    }),
    ({ pending, rs }) => {
      inboxStore.expenses = pending;
      inboxStore.expensesRS = rs;
    }
  );
};
