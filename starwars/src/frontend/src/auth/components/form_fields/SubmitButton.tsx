import React from 'react';

import { useFormStateContext } from 'react-form-state-context';
import Button from 'antd/lib/button';

type PropsT = {
  label: string;
  disabled?: boolean;
};

export const SubmitButton = (props: PropsT) => {
  const formState = useFormStateContext();
  const onClick = () => {
    formState.submit();
  };

  return (
    <Button className="" onClick={onClick} disabled={props.disabled}>
      {props.label}
    </Button>
  );
};
