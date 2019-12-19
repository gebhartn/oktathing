import React, { useState, useEffect } from 'react';
import { withAuth } from '@okta/okta-react';

export default withAuth(props => {
  const [authenticated, setAuthenticated] = useState(null);

  const checkAuthentication = async () => {
    const authed = await props.auth.isAuthenticated();
    if (authed !== authenticated) {
      setAuthenticated({ authed });
    }
  };

  useEffect(() => {
    checkAuthentication();
  });

  const login = async () => {
    props.auth.login('/');
  };

  const logout = async () => {
    props.auth.logout('/');
  };

  if (authenticated === null) return null;
  return authenticated ? (
    <button type="submit" onClick={logout}>
      Logout
    </button>
  ) : (
    <button type="submit" onClick={login}>
      Login
    </button>
  );
});
