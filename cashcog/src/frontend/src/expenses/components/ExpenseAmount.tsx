import React from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import dateFormat from 'dateformat';
import {
  expenseAmountInEuro,
  ExpenseResolutionStatusT,
  expenseStatus,
  ExpenseT,
} from 'src/expenses/types';

export type PropsT = {
  className: any;
  expense: ExpenseT;
  nextStatus: ExpenseResolutionStatusT;
};

export const ExpenseAmount: React.FC<PropsT> = observer((props: PropsT) => {
  const amount = expenseAmountInEuro(props.expense);
  const status = expenseStatus(props.expense);
  const textColor =
    props.nextStatus === 'declined' || props.nextStatus === 'approved'
      ? 'text-black'
      : 'text-white';

  const date = () =>
    dateFormat(props.expense.resolution.createdAt, 'dddd, mmmm dS, yyyy');

  const subTitle =
    status === 'approved'
      ? `Approved: ${date()}`
      : status === 'declined'
      ? `Declined: ${date()}`
      : props.nextStatus === 'approved'
      ? 'Approved (to be confirmed)'
      : props.nextStatus === 'declined'
      ? 'Declined (to be confirmed)'
      : status === 'pending'
      ? `(to be confirmed)`
      : '';

  return (
    <div
      className={classnames(props.className, 'px-2', textColor, {
        'bg-red-200': props.nextStatus === 'declined',
        'bg-green-200': props.nextStatus === 'approved',
        'bg-red-900': status === 'declined',
        'bg-green-900': status === 'approved',
      })}
    >
      <div className="text-xl">{`${amount} EUR`}</div>
      <div className="text-xs">{subTitle}</div>
    </div>
  );
});
