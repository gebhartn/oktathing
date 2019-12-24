import React from 'react';
// OKTA provided HOC -- lots of props we need
import { withAuth } from '@okta/okta-react';

// Dashboard component, will conditionally render on success
import Dashboard from '../Dashboard/Dashboard';

function renderLogin(fn) {
  return fn() === undefined ? <h1>Loading</h1> : null;
}

export default withAuth(
  class Home extends React.Component {
    constructor(props) {
      // Inhereit props from withAuth
      super(props);
      // Local state for authentication status
      this.state = { authenticated: null };
      // Defined in line, just binding it
      this.checkAuthentication = this.checkAuthentication.bind(this);
      // Invoke, class components -- note this is hoisted and not from props
      this.checkAuthentication();
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
    }

    componentDidUpdate() {
      // Invoke authentication on re-render, see render()
      this.checkAuthentication();
    }

    async checkAuthentication() {
      // Destructure deeply nested property
      const {
        props: {
          auth: { isAuthenticated },
        },
      } = this;

      // Capture verification
      const authenticated = await isAuthenticated();

      // Destructure deeply nested property and aliased
      const {
        state: { authenticated: authed },
      } = this;

      // set state until we are equal
      if (authenticated !== authed) {
        this.setState({ authenticated });
      }
    }

    async login() {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.auth.login('/');
    }

    async logout() {
      // Clear token from localStorage on logout
      localStorage.clear();
      // eslint-disable-next-line react/destructuring-assignment
      this.props.auth.logout('/');
    }

    /*
     * Conditional render to check if we're authenticated or not.
     * If it fails the authentication check or the user logs out, show falsy
     * otherwise they are pushed to the Dashboard component
     */
    render() {
      const {
        state: { authenticated },
      } = this;

      if (authenticated === null) return null;
      return authenticated ? (
        <Dashboard
          logout={this.logout}
          // eslint-disable-next-line react/destructuring-assignment
          getToken={this.props.auth.getAccessToken}
        />
      ) : (
        renderLogin(this.login)
      );
    }
  }
);
