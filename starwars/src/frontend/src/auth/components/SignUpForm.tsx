import React from 'react';
import { observer } from 'mobx-react-lite';

import { FormStateProvider, IFormState } from 'react-form-state-context';
import { GlobalError } from './form_fields/GlobalError';
import { EmailField } from './form_fields/EmailField';
import { PasswordField } from './form_fields/PasswordField';
import { SubmitButton } from './form_fields/SubmitButton';
import { Field } from 'src/forms/components/Field';
import { useStore } from 'src/app/components/StoreProvider';
import { getExternalSignUpErrors } from './getExternalErrors';
import { AuthState } from 'src/auth/AuthState';

type PropsT = {
  authState: AuthState;
};

export const SignUpForm: React.FC<PropsT> = observer((props: PropsT) => {
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
    authStore.signUp(values.email, values.password);
  };

  return (
    <FormStateProvider
      initialValues={{ email: null, password: null, rememberMe: true }}
      initialErrors={getExternalSignUpErrors(props.authState.errors)}
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
        label="Sign Up"
        disabled={props.authState.status === 'SignUp.Requested'}
      />
    </FormStateProvider>
  );
});
