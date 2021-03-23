import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import { AuthenticationFrame } from './AuthenticationFrame';
import { SignInForm } from './SignInForm';
import { AuthState } from 'src/auth/AuthState';
import { useStore } from 'src/app/components/StoreProvider';
import { useNextUrl } from 'src/utils/useNextUrl';
import { getNextUrl } from 'src/utils/urlParams';

type PropsT = {};

export const SignInPage: React.FC<PropsT> = observer((p: PropsT) => {
  const { authStore } = useStore();
  const [authState] = React.useState(() => new AuthState(authStore));

  // CHange the url if sign in was successfull
  useNextUrl(
    authState.status === 'SignIn.Succeeded'
      ? getNextUrl('/characters')
      : undefined
  );

  const signUpLink = (
    <Link className="" to={'/sign-up/'}>
      sign up
    </Link>
  );

  const goToSignUpDiv = (
    <div className="mt-4">
      Don't have an account? Then you can {signUpLink}.
    </div>
  );

  return (
    <AuthenticationFrame header="Sign in">
      <div className="SignInPage">
        <SignInForm authState={authState} />
        {goToSignUpDiv}
      </div>
    </AuthenticationFrame>
  );
});
