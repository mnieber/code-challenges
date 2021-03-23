import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { createBrowserHistory } from 'history';

import { TabsView } from 'src/app/components/TabsView';
import { LoadExpensesEffect } from 'src/app/components/LoadExpensesEffect';

type PropsT = {};

export const history = createBrowserHistory();

export const UrlRouter: React.FC<PropsT> = observer((props: PropsT) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/">
          <LoadExpensesEffect />
          <TabsView />
        </Route>
      </Switch>
    </Router>
  );
});
