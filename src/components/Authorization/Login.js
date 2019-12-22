import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import SignInWidget from './SignInWidget';

export default withAuth(
  class Login extends Component {
    constructor(props) {
      super(props);
      this.onSuccess = this.onSuccess.bind(this);
      this.onError = this.onError.bind(this);
      this.state = {
        authenticated: null,
      };
      this.checkAuthentication();
    }

    componentDidUpdate() {
      this.checkAuthentication();
    }

    onSuccess(res) {
      if (res.status === 'SUCCESS') {
        // eslint-disable-next-line react/destructuring-assignment
        return this.props.auth.redirect({
          sessionToken: res.session.token,
        });
      }
    }

    onError(err) {
      console.log('error', err);
    }

    async checkAuthentication() {
      // eslint-disable-next-line react/destructuring-assignment
      const authenticated = await this.props.auth.isAuthenticated();
      // eslint-disable-next-line react/destructuring-assignment
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    }

    render() {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.authenticated === null) return null;
      // eslint-disable-next-line react/destructuring-assignment
      return this.state.authenticated ? (
        <Redirect push to="/" />
      ) : (
        <SignInWidget
          // eslint-disable-next-line react/destructuring-assignment
          baseUrl={this.props.baseUrl}
          onSuccess={this.onSuccess}
          onError={this.onError}
        />
      );
    }
  }
);
