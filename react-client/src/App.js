import React, { Component } from "react";
import "./App.css";
import { withRouter } from "react-router-dom";
import API from "./adapters/API";

import Joi from "joi";

import CreateRoutes from "./components/Routing";

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
      username: null,
      user_id: null,
      usertype: null,
      bio: null
    },
    loggingUser: false
  };

  componentDidMount() {
    console.log("App has mounted ... 🌈");
    API.validateUser().then(user => {
      console.log("who dis? 🤷‍", user);
      if (user.user) {
        this.setState({
          user: {
            username: user.user.data.attributes.username,
            user_id: user.user.data.attributes.id,
            usertype: user.user.data.attributes.usertype,
            bio: user.user.data.attributes.bio
          }
        });
      }
    });
  }

  validateForm = user => {
    const userData = {
      username: user.username,
      password: user.password
    };
    const result = Joi.validate(userData, schema);
    return !result.error ? true : false;
  };

  submitSignUp = user => {
    console.log("user object => during sign up 🤓");
    if (this.validateForm(user)) {
      console.log("signing up ... 🤓");
      this.setState({
        loggingUser: true
      });
      API.signUpUser(user).then(user => {
        if (user.data !== null) {
          setTimeout(() => {
            this.setState({
              loggingUser: false,
              user: {
                username: user.data.attributes.username,
                user_id: user.data.attributes.id,
                usertype: user.data.attributes.usertype,
                bio: user.data.attributes.bio
              }
            });
            console.log("here are the props => 🎁", this.props);
            this.props.history.push("/"); // takes user back to the 🏠 page
          }, 1000);
        } else {
          console.log("user not valid 🤦‍ 🚑");
          this.setState({
            loggingUser: false // return an alert when sign in fails validation step - use the error handler on back end
          });
        }
      });
    }
  };

  submitSignIn = user => {
    if (this.validateForm(user)) {
      console.log("signing in ... 🤓");
      this.setState({
        loggingUser: true
      });
      API.signInUser(user).then(user => {
        setTimeout(() => {
          this.setState({
            loggingUser: false,
            user: {
              username: user.data.attributes.username,
              user_id: user.data.attributes.id,
              usertype: user.data.attributes.usertype,
              bio: user.data.attributes.bio
            }
          });
          console.log("here are the props => 🎁", this.props);
          this.props.history.push("/"); // takes user back to the 🏠 page
        }, 1000);
      });
    } // return an alert when sign in fails validation step - use the error handler on back end
  };

  signOut = e => {
    e.preventDefault();
    console.log("signing out ... 👋", this.props);
    this.props.history.push("/");
    API.clearToken();
    this.setState({
      user: {
        username: null,
        user_id: null,
        bio: null,
        usertype: null
      }
    });
  };

  updateBio = bio => {
    console.log("new bio 📨", bio);
    API.updateUser(bio, this.state.user.user_id).then(user => {
      this.setState({
        user: { ...this.state.user, bio: user.user.data.attributes.bio }
      });
    });
  };

  render() {
    return (
      <div className="App">
        <CreateRoutes
          user={this.state.user}
          signOut={this.signOut}
          submitSignUp={this.submitSignUp}
          loggingUser={this.state.loggingUser}
          submitSignIn={this.submitSignIn}
          updateBio={this.updateBio}
        />
      </div>
    );
  }
}

export default withRouter(App);
