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
  userPostsPaper,
  returnAllPapers,
  allUsers,
  allPaperIDs,
  usersPostsReview,
  updateRating,
  sortPapers
}) => {
  // console.log("the user in routes ====>", props);
  return user.username === null ? (
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
      <Route render={() => <NotFound user={user} signOut={signOut} />} />
    </Switch>
  ) : (
    <Switch>
      <Route
        exact
        path="/"
        render={() => <Home user={user} signOut={signOut} />}
      />
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
            allUsers={allUsers}
          />
        )}
      />
      <Route
        exact
        path="/papers/:access_token"
        render={({ match }) => (
          <PaperShow
            match={match}
            user={user}
            signOut={signOut}
            allPapers={allPapers}
            allPaperIDs={allPaperIDs}
            usersPostsReview={usersPostsReview}
          />
        )}
      />
      <Route
        exact
        path="/papers"
        render={() => <PaperIndex allPapers={allPapers} updateRating={updateRating} sortPapers={sortPapers} />}
      />
      <Route render={() => <NotFound />} />
    </Switch>

  );
};
export default CreateRoutes;
