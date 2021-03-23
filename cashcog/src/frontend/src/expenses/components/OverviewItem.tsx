import React from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import { ExpenseResolutionStatusT, ExpenseT } from 'src/expenses/types';
import { ExpenseAmount } from 'src/expenses/components/ExpenseAmount';
import { ExpenseDescription } from 'src/expenses/components/ExpenseDescription';

export type PropsT = {
  expense: ExpenseT;
  nextStatus: ExpenseResolutionStatusT;
};

export const OverviewItem: React.FC<PropsT> = observer((props: PropsT) => {
  return (
    <div className={classnames('OverviewItem flex flex-row flex-1 mb-2')}>
      <ExpenseAmount
        expense={props.expense}
        nextStatus={props.nextStatus}
        className={classnames('w-1/5 justify-self-start')}
      />
      <ExpenseDescription className="w-4/5 ml-2" expense={props.expense} />
    </div>
  );
});
