import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../views/Home";
import SignUp from "../views/SignUp";
import SignIn from "../views/SignIn";
import UserProfile from "../views/UserProfile";
import NotFound from "../views/NotFound";
import PaperShow from "../views/PaperShow";
import PaperIndex from "../views/PaperIndex";

const CreateRoutes = ({
  user,
  signOut,
  submitSignUp,
  submitSignIn,
  loggingUser,
  updateBio,
  userPapers,
  allPapers,
  userPostsPaper
}) => {
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
      {/* <Route
        exact
        path="/profile"
        render={() => (
          <UserProfile
            user={user}
            signOut={signOut}
            updateBio={updateBio}
            userPapers={userPapers}
          />
        )}
      /> */}
      <Route
        exact
        path="/users/:access_token"
        render={({ match }) => (
          <UserProfile
            user={user}
            match={match}
            updateBio={updateBio}
            userPapers={userPapers}
            userPostsPaper={userPostsPaper}
            loggingUser={loggingUser}
            allPapers={allPapers}
          />
        )}
      />
      <Route
        exact
        path="/papers/:access_token"
        render={({ match }) => (
          <PaperShow match={match} user={user} signOut={signOut} />
        )}
      />
      <Route
        exact
        path="/papers"
        render={() => <PaperIndex allPapers={allPapers} />}
      />

      <Route render={() => <NotFound user={user} signOut={signOut} />} />
    </Switch>
  );
};
export default CreateRoutes;
