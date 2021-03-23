import React from 'react';
import { makeObservable, observable } from 'mobx';

import { ExpensesStore } from 'src/expenses/ExpensesStore';
import { InboxStore } from 'src/inbox/InboxStore';
import { inboxStoreShowsPendingExpenses } from 'src/app/policies/inboxStoreShowsPendingExpenses';

class GlobalStore {
  @observable expensesStore: ExpensesStore;
  @observable inboxStore: InboxStore;

  constructor() {
    makeObservable(this);

    this.expensesStore = new ExpensesStore();
    this.inboxStore = new InboxStore();

    this.applyPolicies();
  }

  applyPolicies() {
    inboxStoreShowsPendingExpenses(this.expensesStore, this.inboxStore);
  }
}

const globalStore = new GlobalStore();

const StoreContext = React.createContext<GlobalStore>(globalStore);

export const StoreProvider: React.FC = ({ children }) => {
  return (
    <StoreContext.Provider value={globalStore}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
