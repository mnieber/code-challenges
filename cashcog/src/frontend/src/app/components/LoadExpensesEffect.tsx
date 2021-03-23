import React from 'react';

import { EffectWithoutArgs } from 'src/app/components/Effect';
import { useStore } from 'src/app/StoreProvider';

type PropsT = {};

export const LoadExpensesEffect: React.FC<PropsT> = (p: PropsT) => {
  const { expensesStore } = useStore();
  return (
    <EffectWithoutArgs
      f={() => {
        expensesStore.loadExpenses();
      }}
    />
  );
};
