import React, { Component, Fragment } from "react";
import UserProfileImage from "../components/UserProfileImage";
import MenuBar from "../components/MenuBar";
import UserRating from "../components/UserRating";

class UserProfile extends Component {
  render() {
    const { user, signOut } = this.props;

    return (
      <Fragment>
        <MenuBar user={user} signOut={signOut} />
        <h1>User Name</h1>
        <UserProfileImage />
        <UserRating />
        <h4>Bio:</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
        <h5>Journal Clubs</h5>
        <br />
        <h5>Paper Reviews</h5>
      </Fragment>
    );
  }
}

export default UserProfile;
