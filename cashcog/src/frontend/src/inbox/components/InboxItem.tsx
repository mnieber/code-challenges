import React from 'react';
import { observer } from 'mobx-react-lite';
import { ExpenseResolutionStatusT, ExpenseT } from 'src/expenses/types';
import { ResolutionPicker } from 'src/inbox/components/ResolutionPicker';
import { ExpenseDescription } from 'src/expenses/components/ExpenseDescription';
import { ExpenseAmount } from 'src/expenses/components/ExpenseAmount';

export type PropsT = {
  expense: ExpenseT;
  nextStatus: ExpenseResolutionStatusT;
  setNextStatus: (status: ExpenseResolutionStatusT) => void;
};

export const InboxItem: React.FC<PropsT> = observer((props: PropsT) => {
  return (
    <div className="InboxItem flex flex-row flex-1 mb-2">
      <ExpenseAmount
        nextStatus={props.nextStatus}
        className="w-1/5 justify-self-start"
        expense={props.expense}
      />
      <ExpenseDescription className="w-3/5 ml-2" expense={props.expense} />
      <div className="flex-1" />
      <ResolutionPicker
        className="ml-2"
        expense={props.expense}
        nextStatus={props.nextStatus}
        setNextStatus={props.setNextStatus}
      />
    </div>
  );
});
