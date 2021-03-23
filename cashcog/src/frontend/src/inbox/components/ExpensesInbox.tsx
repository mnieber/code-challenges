import React from 'react';
import { flow, always, map } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import { useStore } from 'src/app/StoreProvider';
import { InboxItem } from 'src/inbox/components/InboxItem';
import { ExpenseResolutionStatusT } from 'src/expenses/types';
import { ResourceView } from 'src/utils/components/ResourceView';

export const ExpensesInbox: React.FC = observer(() => {
  const { inboxStore } = useStore();

  const expenseDivs = flow(
    always(inboxStore.expenses),
    map((x) => (
      <InboxItem
        key={x.uuid}
        expense={x}
        nextStatus={inboxStore.resolutionStatusByExpenseId[x.uuid]}
        setNextStatus={(status: ExpenseResolutionStatusT) =>
          inboxStore.setResolutionStatus(x.uuid, status)
        }
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
      rs={inboxStore.expensesRS}
      renderUpdated={() => updatedDiv}
      renderErrored={(message) => {
        console.log(message);
        return <div className="text-white">{message}</div>;
      }}
    />
  );
});
