import { doQuery, setToken } from 'src/utils/graphqlClient';
import * as _ from 'lodash/fp';

const hasErrorCode = (path: any, message: any) =>
  _.flow(
    _.pathOr([], path),
    _.filter((x: any) => x.message === message),
    _.complement(_.isEmpty)
  );

const isError = (path: any) =>
  _.flow(_.pathOr([], path), _.complement(_.isEmpty));

// Api app

export async function signIn(
  userId: string,
  password: string,
  rememberMe: boolean
) {
  const query = `mutation ($userId: String!, $password: String!) {
      login(
        email: $userId,
        password: $password
      ) {
        token,
        user {
          id,
          email,
        }
      }
    }`;

  const response: any = await doQuery(query, {
    userId,
    password,
  });

  if (hasErrorCode('errors', 'User not found')(response))
    return {
      success: false,
      errors: ['signIn/invalid_credentials'],
    };

  if (isError('errors')(response))
    return {
      success: false,
      errors: ['signIn/failed'],
    };

  const token = response.login.token;
  setToken(token);

  return {
    success: true,
    token,
    userId: response.login.user.email,
  };
}

export async function signOut() {
  try {
    setToken('');
    return '';
  } catch (e) {
    throw Error('Could not sign out');
  }
}

export async function signUp(email: string, password: string) {
  const query = `mutation ($email: String!, $password: String!) {
      signup(
        email: $email,
        password: $password
      ) {
        token
      }
    }`;
  const response: any = await doQuery(query, {
    email,
    password,
  });

  if (hasErrorCode('errors', 'Please provide a valid email address')(response))
    return {
      success: false,
      errors: ['signUp/invalid_email_address'],
    };

  if (hasErrorCode('errors', `Account with ${email} already exists.`)(response))
    return {
      success: false,
      errors: ['signUp/email_taken'],
    };

  if (isError('errors')(response))
    return {
      success: false,
      errors: ['signUp/failed'],
    };

  return {
    success: true,
  };
}
