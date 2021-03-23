import React from 'react';
import { observer } from 'mobx-react-lite';

import { FormStateProvider, IFormState } from 'react-form-state-context';
import { GlobalError } from './form_fields/GlobalError';
import { EmailField } from './form_fields/EmailField';
import { PasswordField } from './form_fields/PasswordField';
import { SubmitButton } from './form_fields/SubmitButton';
import { Field } from 'src/forms/components/Field';
import { useStore } from 'src/app/components/StoreProvider';
import { getExternalSignInErrors } from 'src/auth/components/getExternalErrors';
import { AuthState } from 'src/auth/AuthState';

type PropsT = {
  authState: AuthState;
};

export const SignInForm: React.FC<PropsT> = observer((props: PropsT) => {
  const { authStore } = useStore();

  const handleValidate = ({
    values,
    setError,
  }: {
    values: IFormState['values'];
    setError: IFormState['setError'];
  }) => {
    if (!values.email) {
      setError('email', 'Please provide an email address');
    }
    if (!values.password) {
      setError('password', 'Please provide a password');
    }
  };

  const handleSubmit = ({ values }: { values: IFormState['values'] }) => {
    authStore.signIn(values.email, values.password, values.rememberMe);
  };

  return (
    <FormStateProvider
      initialValues={{
        rememberMe: true,
        email: null,
        password: null,
      }}
      initialErrors={getExternalSignInErrors(props.authState.errors)}
      handleValidate={handleValidate}
      handleSubmit={handleSubmit}
    >
      <GlobalError />
      <Field fieldName="email" label="Email">
        <EmailField />
      </Field>
      <Field fieldName="password" label="Password">
        <PasswordField />
      </Field>
      <SubmitButton
        label="Sign in"
        disabled={props.authState.status === 'SignIn.Requested'}
      />
    </FormStateProvider>
  );
});
