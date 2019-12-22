import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('okta-token-storage') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);
