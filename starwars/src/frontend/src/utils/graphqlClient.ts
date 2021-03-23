import { GraphQLClient } from 'graphql-request';

function _createClient() {
  const authToken = localStorage.getItem('authToken');

  return new GraphQLClient(`https://fe-case-study.vercel.app/api/graphql`, {
    headers: authToken
      ? {
          // Authorization: 'JWT ' + authToken,
          Authorization: authToken,
        }
      : {},
  });
}

let _graphqlClient = _createClient();

export const graphqlClient = () => _graphqlClient;

export const setToken = (authToken: string) => {
  localStorage.setItem('authToken', authToken);
  _graphqlClient = _createClient();
};

export function doQuery(query: string, variables: any) {
  return graphqlClient()
    .request(query, variables)
    .catch((e) => {
      return e.response;
    });
}
