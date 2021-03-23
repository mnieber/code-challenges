import React from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import dateFormat from 'dateformat';
import { ExpenseT } from 'src/expenses/types';
import { fullName } from 'src/employees/types';

export type PropsT = {
  className: any;
  expense: ExpenseT;
};

export const ExpenseDescription: React.FC<PropsT> = observer(
  (props: PropsT) => {
    const name = fullName(props.expense.employee);
    const date = () =>
      dateFormat(props.expense.createdAt, 'dddd, mmmm dS, yyyy');

    const subTitle = `Requested by ${name} on ${date()}`;

    return (
      <div className={classnames(props.className, 'flex flex-col text-white')}>
        <div className="text-blue-200">{subTitle}</div>
        <div className="text-lg">{props.expense.description}</div>
      </div>
    );
  }
);
