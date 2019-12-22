/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Security, ImplicitCallback } from '@okta/okta-react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Authorization/Login';
import MockHomePage from './MockHomePage';
import PrivateRoute from './Authorization/PrivateRoute';

const config = {
  issuer: `${process.env.REACT_APP_OKTA_URL}/oauth2/default`,
  redirectUri: `${window.location.origin}/implicit/callback`,
  clientId: `${process.env.REACT_APP_CLIENT_ID}`,
  onAuthRequired({ history }) {
    history.push('/');
  },
  pkce: true,
};

const App = () => (
  <>
    {/* OKTA Security wrapper */}
    <Security {...config}>
      <Switch>
        <Route
          path="/login"
          render={() => <Login baseUrl={`${process.env.REACT_APP_OKTA_URL}`} />}
        />
        <Route exact path="/admin/dashboard" component={MockHomePage} />
        <Route path="/implicit/callback" component={ImplicitCallback} />
      </Switch>
    </Security>
  </>
);

export default App;
