import React from 'react';
import { makeObservable, observable } from 'mobx';

import { MetricsStore } from 'src/metrics/MetricsStore';

class GlobalStore {
  @observable metricsStore: MetricsStore;

  constructor() {
    makeObservable(this);

    this.metricsStore = new MetricsStore();

    this.applyPolicies();
  }

  applyPolicies() {}
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
