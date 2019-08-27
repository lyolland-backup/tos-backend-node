import React, { Component } from "react";
import "./App.css";

import { Route, Switch, withRouter } from "react-router-dom";
import API from "./adapters/API";
import Joi from "joi";
import Home from "./views/Home";
import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";

// this should map to user model validation in rails
// validates :username, uniqueness: { case_sensitive: false }
// validates :password, length: { minimum: 3 }
const schema = Joi.object().keys({
  username: Joi.string()
    .min(1)
    .required(),
  password: Joi.string()
    .min(3)
    .required()
});

class App extends Component {
  state = {
    user: {
      username: null
    },
    loggingUser: false
  };

  componentDidMount() {
    console.log("App has mounted ... 🌈");
    API.validateUser().then(user => {
      if (user.user) {
        this.setState({
          user: {
            username: user.user.data.attributes.username
            // user_id: user.user.data.attributes.id
          }
        });
      }
    });
  }

  validateForm = user => {
    const testUser = {
      username: user.username,
      password: user.password
    };
    const result = Joi.validate(testUser, schema);
    console.log(result)
    return !result.error ? true : false;
  };

  submitSignUp = user => {
    if (this.validateForm(user)) {
      console.log("signing up ... 🤓");
      this.setState({
        loggingUser: true
      });
      API.signUpUser(user).then(user => {
        setTimeout(() => {
          this.setState({
            loggingUser: false,
            user: { username: user.data.attributes.username }
          });
          console.log("here are the props => 🎁", this.props);
          this.props.history.push("/"); // takes user back to the 🏠 page
        }, 2000);
       
      });
     
    }
  };

  submitSignIn = user => {
    console.log("signing in ... 🤓");
    API.signInUser(user).then(user =>
      this.setState({
        user: { username: user.data.attributes.username }
        // user_id: user.data.attributes.id
      })
    );
    console.log("here are the props => 🎁", this.props);
    this.props.history.push("/"); // takes user back to the 🏠 page
  };

  signOut = () => {
    console.log("signing out ... 👋");
    API.clearToken();
    this.setState({ user: { username: null } });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home user={this.state.user} logOut={this.signOut} />
              )}
            />
            <Route
              exact
              path="/signup"
              render={() => (
                <SignUp
                  submitSignUp={this.submitSignUp}
                  loggingUser={this.state.loggingUser}
                />
              )}
            />
            <Route
              exact
              path="/signin"
              render={() => <SignIn submitSignIn={this.submitSignIn} />}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
