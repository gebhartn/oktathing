/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Security, ImplicitCallback } from '@okta/okta-react';
import { Route } from 'react-router-dom';
import Home from './Home';

import '../styles/App.css';

const config = {
  issuer: `${process.env.REACT_APP_OKTA_URL}/oauth2/default`,
  redirectUri: `${window.location.origin}/implicit/callback`,
  clientId: `${process.env.REACT_APP_CLIENT_ID}`,
  pkce: true,
};

const App = () => (
  <>
    <Security {...config}>
      <Route exact path="/" component={Home} />
      <Route path="/implicit/callback" component={ImplicitCallback} />
    </Security>
  </>
);

export default App;
