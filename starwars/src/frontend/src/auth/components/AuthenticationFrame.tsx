import React from 'react';
import { observer } from 'mobx-react-lite';

// PasswordResetPage

type PropsT = React.PropsWithChildren<{
  header: string;
}>;

export const AuthenticationFrame = observer((props: PropsT) => {
  return (
    <div className="AuthenticationFrame">
      <h1 className="text-lg">{props.header}</h1>
      {props.children}
    </div>
  );
});
