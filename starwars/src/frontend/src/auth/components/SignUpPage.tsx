import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import { AuthenticationFrame } from './AuthenticationFrame';
import { SignUpForm } from 'src/auth/components/SignUpForm';
import { AuthState } from 'src/auth/AuthState';
import { useStore } from 'src/app/components/StoreProvider';

type PropsT = {};

export const SignUpPage: React.FC<PropsT> = observer((p: PropsT) => {
  const { authStore } = useStore();
  const [authState] = React.useState(() => new AuthState(authStore));

  const signInLink = (
    <Link className="" to={'/sign-in/'}>
      sign in
    </Link>
  );

  const confirmationDiv = (
    <div>You have been signed up. You may now {signInLink}</div>
  );

  const goToSignInDiv = (
    <div className="mt-4">If you are signed up then you can {signInLink}.</div>
  );

  return (
    <AuthenticationFrame header="Sign Up">
      <div className="SignUpPage">
        {authState.status === 'SignUp.Succeeded' && confirmationDiv}
        {authState.status !== 'SignUp.Succeeded' && (
          <React.Fragment>
            <SignUpForm authState={authState} />
            {goToSignInDiv}
          </React.Fragment>
        )}
      </div>
    </AuthenticationFrame>
  );
});
