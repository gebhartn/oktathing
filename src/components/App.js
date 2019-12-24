// It's a react app
import React from 'react';

// Need route to handle Authorization
import { Route } from 'react-router-dom';

// Security wrapper, ImplicitCallback is OKTA's authorization component
import { Security, ImplicitCallback, SecureRoute } from '@okta/okta-react';

// Login component acts as our landing page
import Login from './Authorization/Login';

// Security component props
const config = {
  // Authorization issuer URL -- see OKTA dashboard
  issuer: `${process.env.REACT_APP_OKTA_URL}/oauth2/default`,
  // Route to ImplicitCallback
  redirectUri: `${window.location.origin}/implicit/callback`,
  // clientId for our Application -- see OKTA dashboard
  clientId: `${process.env.REACT_APP_CLIENT_ID}`,
  // https://connect2id.com/products/nimbus-oauth-openid-connect-sdk/examples/oauth/pkce
  pkce: true,
};

const App = () => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Security {...config}>
    {/* Route to our Landing page at root URL */}
    <SecureRoute exact path="/" component={Login} />
    {/* Route to the authorization component provided by OKTA SDK */}
    <Route path="/implicit/callback" component={ImplicitCallback} />
  </Security>
);

export default App;
