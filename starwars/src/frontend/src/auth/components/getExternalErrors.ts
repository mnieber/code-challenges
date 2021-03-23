export const getExternalSignUpErrors = (errors: Array<string>) => {
  const fieldErrors: { [name: string]: string } = {};
  if (errors?.includes('signUp/invalid_email_address')) {
    fieldErrors['email'] = "That's not a valid email address";
  }
  if (errors?.includes('signUp/email_taken')) {
    fieldErrors['email'] = 'That email address is already used';
  }
  return fieldErrors;
};

export const getExternalSignInErrors = (errors: Array<string>) => {
  const fieldErrors: { [name: string]: string } = {};
  if (errors?.includes('signIn/invalid_credentials')) {
    fieldErrors['global'] =
      'Sign in failed, please check your email and password';
  }
  if (errors?.includes('signIn/failed')) {
    fieldErrors['global'] =
      'Sorry, there seems to be a technical problem. ' +
      'Check your internet connection, or try again later.';
  }
  return fieldErrors;
};
