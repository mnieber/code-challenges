import { always, flow, map } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from 'src/app/StoreProvider';
import { OverviewItem } from 'src/expenses/components/OverviewItem';
import { ResourceView } from 'src/utils/components/ResourceView';

export const ExpensesOverview = observer(() => {
  const { expensesStore, inboxStore } = useStore();

  const expenseDivs = flow(
    always(expensesStore.all),
    map((x) => (
      <OverviewItem
        key={x.uuid}
        expense={x}
        nextStatus={inboxStore.resolutionStatusByExpenseId[x.uuid]}
      />
    ))
  )();

  const noItems = <h2>The inbox is empty</h2>;

  const updatedDiv = (
    <div className="ExpensesInbox flex flex-col w-full">
      {expenseDivs.length && expenseDivs}
      {!expenseDivs.length && noItems}
    </div>
  );

  return (
    <ResourceView
      rs={expensesStore.expenseByIdRS}
      renderUpdated={() => updatedDiv}
      renderErrored={(message) => {
        return <div className="text-white">{message}</div>;
      }}
    />
  );
});
