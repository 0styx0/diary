import * as React from 'react';
import * as fetch from 'isomorphic-fetch';

class Login extends React.Component<{}, {}> {

  auth2; // The Sign-In object.
  googleUser; // The current user.

  constructor() {
      super();

      this.initSigninV2 = this.initSigninV2.bind(this);
      this.userChanged = this.userChanged.bind(this);
      this.appStart = this.appStart.bind(this);
      this.signinChanged = this.signinChanged.bind(this);
  }
  /**
   * Calls startAuth after Sign in V2 finishes setting up.
   */
  appStart() {
      const self = this;
      gapi.load('auth2', self.initSigninV2);
  }

  /**
   * Initializes Signin v2 and sets up listeners.
   */
  initSigninV2() {

    this.auth2 = gapi.auth2.getAuthInstance();

    // Listen for sign-in state changes.
    this.auth2.isSignedIn.listen(this.signinChanged);

    // Listen for changes to current user.
    this.auth2.currentUser.listen(this.userChanged);

    // Sign in the user if they are currently signed in.
    if (this.auth2.isSignedIn.get() === true) {

      this.auth2.signIn();
    }

    // Start with the current live values.
    this.refreshValues();
  }

  /**
   * Listener method for sign-out live value.
   *
   * @param {boolean} signedIn the updated signed out state.
   */
  signinChanged(signedIn: boolean) {

    const signinInfo = {
        googleJwt: this.googleUser.getAuthResponse().id_token
    };

    fetch('http://localhost:4000/signin', {
      method: 'post',
      body: JSON.stringify(signinInfo),
      headers: {
            'Content-Type': 'application/json',
            'Authorization': JSON.stringify(signinInfo)
        }
    })
    .then(response => response.text())
    .then(text => {

      window.sessionStorage.setItem('jwt', text);
      let event = new StorageEvent('storage');
      dispatchEvent(event);
    });
  }

  /**
   * Listener method for when the user changes.
   *
   * @param {GoogleUser} user the updated user.
   */
  userChanged(user: Object) {

    this.googleUser = user;
    this.updateGoogleUser();
  }

  /**
   * Updates the properties in the Google User table using the current user.
   */
  updateGoogleUser() {

    if (this.googleUser) {
        this.googleUser.getGrantedScopes();
        JSON.stringify(this.googleUser.getAuthResponse(), undefined, 2);
    }
  }

  /**
   * Retrieves the current user and signed in states from the GoogleAuth
   * object.
   */
  refreshValues() {

    if (this.auth2) {

      this.googleUser = this.auth2.currentUser.get();

      this.auth2.isSignedIn.get();

      this.updateGoogleUser();
    }
  }

  componentDidMount() {
      window.addEventListener('load', this.appStart);
  }

  render() {

      return <div className="g-signin2" data-onsuccess="onSignIn" data-theme="dark" />;
  }
}
export default Login;