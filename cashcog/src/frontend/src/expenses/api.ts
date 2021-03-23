import { always, flow, map, merge, pick } from 'lodash/fp';
import { doQuery } from 'src/app/client';
import { ExpenseResolutionT } from 'src/expenses/types';
import { mockExpenses } from 'src/expenses/mocks/mockExpenses';

const getExpenseFromExpenseView = (x: any) =>
  merge(x.expense, pick(['resolution'], x));

export function confirmExpenses(resolutions: ExpenseResolutionT[]) {
  const query = `mutation createResolutions(
      $resolutionForms: [ResolutionForm]!,
    ) {
      createResolutions(
        resolutionForms: $resolutionForms,
      ) {
        expense {
          uuid
          description
          createdAt
          amount
          currency
          employee {
            uuid
            firstName
            lastName
          }
        }
        resolution {
          status
          createdAt
          reason
        }
      }
    }`;
  return doQuery(query, { resolutionForms: resolutions }).then((response) => {
    return {
      expenses: flow(
        always(response.createResolutions),
        map(getExpenseFromExpenseView)
      )(),
    };
  });
}

export function getExpenses() {
  if (false) {
    return Promise.resolve(mockExpenses);
  }

  const query = `query queryExpenses {
    expenses {
      expense {
        uuid
        description
        createdAt
        amount
        currency
        employee {
          uuid
          firstName
          lastName
        }
      }
      resolution {
        status
        createdAt
        reason
      }
    }
  }`;
  return doQuery(query, {}).then((response) => {
    return {
      expenses: flow(
        always(response.expenses),
        map(getExpenseFromExpenseView)
      )(),
    };
  });
}
