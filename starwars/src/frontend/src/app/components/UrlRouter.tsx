import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { createBrowserHistory } from 'history';
import {
  CharactersListView,
  CharactersFilter,
  LoadCharactersEffect,
} from 'src/characters/components';
import { SignInPage } from 'src/auth/components/SignInPage';
import { SignUpPage } from 'src/auth/components/SignUpPage';

type PropsT = {};

export const history = createBrowserHistory();

export const UrlRouter: React.FC<PropsT> = observer((props: PropsT) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Redirect to="/sign-in/?next=/characters" />
        </Route>
        <Route exact path="/sign-in">
          <SignInPage />
        </Route>
        <Route exact path="/sign-up">
          <SignUpPage />
        </Route>
      </Switch>
      <Switch>
        <Route path="/characters">
          <LoadCharactersEffect />
          <CharactersFilter />
          <CharactersListView />
        </Route>
      </Switch>
    </Router>
  );
});
