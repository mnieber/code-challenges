import { always, flow } from 'lodash/fp';
import { doQuery } from 'src/utils/graphqlClient';

export function getCharacters() {
  const query = `query queryCharacters {
    allPeople {
      id
      name
    }
  }`;
  const vars = {};
  return doQuery(query, vars).then((response) => {
    return {
      characters: flow(always(response.allPeople))(),
    };
  });
}
