import React from 'react';
import { withAuth } from '@okta/okta-react';

export default withAuth(
  class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = { authenticated: null };
      this.checkAuthentication = this.checkAuthentication.bind(this);
      this.checkAuthentication();
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
    }

    componentDidUpdate() {
      this.checkAuthentication();
    }

    async checkAuthentication() {
      // eslint-disable-next-line react/destructuring-assignment
      const authenticated = await this.props.auth.isAuthenticated();
      // eslint-disable-next-line react/destructuring-assignment
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    }

    async login() {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.auth.login('/');
    }

    async logout() {
      localStorage.clear();
      // eslint-disable-next-line react/destructuring-assignment
      this.props.auth.logout('/');
    }

    render() {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.authenticated === null) return null;
      // eslint-disable-next-line react/destructuring-assignment
      return this.state.authenticated ? (
        // eslint-disable-next-line react/button-has-type
        <button onClick={this.logout}>Logout</button>
      ) : (
        // eslint-disable-next-line react/button-has-type
        <button onClick={this.login}>Login</button>
      );
    }
  }
);
