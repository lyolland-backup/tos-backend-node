import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../views/Home";
import SignUp from "../views/SignUp";
import SignIn from "../views/SignIn";
import UserProfile from "../views/UserProfile";
import NotFound from "../views/NotFound";

class CreateRoutes extends Component {
  render() {
    const {
      user,
      signOut,
      submitSignUp,
      submitSignIn,
      loggingUser
    } = this.props;

    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Home user={user} signOut={signOut} />}
        />
        <Route
          exact
          path="/signup"
          render={() => (
            <SignUp submitSignUp={submitSignUp} loggingUser={loggingUser} />
          )}
        />
        <Route
          exact
          path="/signin"
          render={() => (
            <SignIn submitSignIn={submitSignIn} loggingUser={loggingUser} />
          )}
        />
        <Route
          exact
          path="/profile"
          render={() => <UserProfile user={user} signOut={signOut} />}
        ></Route>
        <Route render={() => <NotFound user={user} signOut={signOut} />} />
      </Switch>
    );
  }
}
export default CreateRoutes;
