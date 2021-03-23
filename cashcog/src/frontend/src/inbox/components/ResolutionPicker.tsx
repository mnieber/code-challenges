import React from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import { ExpenseResolutionStatusT, ExpenseT } from 'src/expenses/types';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

export type PropsT = {
  expense: ExpenseT;
  className: string;
  nextStatus: ExpenseResolutionStatusT;
  setNextStatus: (status: ExpenseResolutionStatusT) => void;
};

export const ResolutionPicker: React.FC<PropsT> = observer((props: PropsT) => {
  const isApproved = props.nextStatus === 'approved';
  const isDeclined = props.nextStatus === 'declined';

  const approvedDiv = (
    <CheckOutlined
      className={classnames('ml-2 my-auto text-2xl text-white', {
        'bg-green-400': isApproved,
        'bg-gray-600': !isApproved,
      })}
      onClick={() => props.setNextStatus(isApproved ? 'pending' : 'approved')}
    />
  );
  const declinedDiv = (
    <CloseOutlined
      className={classnames('ml-2 my-auto text-2xl text-white', {
        'bg-red-400': isDeclined,
        'bg-gray-600': !isDeclined,
      })}
      onClick={() => props.setNextStatus(isDeclined ? 'pending' : 'declined')}
    />
  );

  return (
    <div className={classnames(props.className, 'flex flex-row')}>
      {approvedDiv}
      {declinedDiv}
    </div>
  );
});
