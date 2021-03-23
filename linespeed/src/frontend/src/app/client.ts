import { GraphQLClient } from 'graphql-request';

function _createClient() {
  const authToken = localStorage.getItem('authToken');
  const url = `http://${window.location.hostname}:8000/graphql/`;

  return new GraphQLClient(url, {
    headers: authToken
      ? {
          Authorization: 'JWT ' + authToken,
        }
      : {},
  });
}

let _client = _createClient();

export const client = () => _client;
export const setToken = (authToken: string) => {
  localStorage.setItem('authToken', authToken);
  _client = _createClient();
};

export function doQuery(query: string, variables: any) {
  return client().request(query, variables);
}
