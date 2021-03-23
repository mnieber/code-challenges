import { always, flow, map } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from 'src/app/StoreProvider';
import { Button } from 'antd';
import { OverviewItem } from 'src/expenses/components/OverviewItem';
import { ResourceView } from 'src/utils/components/ResourceView';
import { isUpdatingRS } from 'src/utils/RST';

export const ConfirmationView = observer(() => {
  const [confirmedAmount, setConfirmedAmount] = React.useState('');
  const { expensesStore, inboxStore } = useStore();

  const expenseDivs = flow(
    always(inboxStore.toBeConfirmed),
    map((x) => (
      <OverviewItem
        key={x.uuid}
        expense={x}
        nextStatus={inboxStore.resolutionStatusByExpenseId[x.uuid]}
      />
    ))
  )();

  const noItems = (
    <div className="mt-4 text-lg text-white">
      You have not marked any expenses as Approved or Declined. Please check the
      Inbox.
    </div>
  );

  const countsDiv = (
    <div className="mt-4 text-xl text-white">
      {`${inboxStore.approved.length} approved and ${inboxStore.declined.length} declined expenses.`}
    </div>
  );

  const amountDiv = (
    <div className="mt-4 text-lg text-white">
      {`To submit, please enter the total amount of the approved expenses ` +
        `(${inboxStore.amountToBeConfirmed}) in the field below.`}
    </div>
  );

  const amountField = (
    <input
      type="text"
      autoFocus={true}
      className="w-full bg-blue-800 text-white text-lg text-center mt-4"
      placeholder="Enter the amount"
      onChange={(x) => setConfirmedAmount(x.target.value)}
    />
  );

  const submitButton = (
    <Button
      className="w-32 self-center mt-4"
      disabled={
        isUpdatingRS(inboxStore.submittingRS) ||
        confirmedAmount !== inboxStore.amountToBeConfirmed.toString()
      }
      onClick={() => inboxStore.submitConfirmations(expensesStore)}
    >
      Submit
    </Button>
  );

  const updatedDiv = (
    <div className="ExpensesInbox flex flex-col w-full">
      {expenseDivs.length && (
        <React.Fragment>
          {expenseDivs}
          {countsDiv}
          {amountDiv}
          {amountField}
          {submitButton}
        </React.Fragment>
      )}
      {!expenseDivs.length && noItems}
    </div>
  );

  return (
    <ResourceView
      rs={inboxStore.submittingRS}
      renderUpdated={() => updatedDiv}
      renderUpdating={() => updatedDiv}
      renderErrored={(message) => {
        return <div className="text-white">{message}</div>;
      }}
    />
  );
});
