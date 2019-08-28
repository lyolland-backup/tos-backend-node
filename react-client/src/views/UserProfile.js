import React, { Component, Fragment } from "react";
import UserProfileImage from "../components/UserProfileImage";
import MenuBar from "../components/MenuBar";
import UserRating from "../components/UserRating";
import { Icon } from "semantic-ui-react";
import UserBioEditForm from "../components/UserBioEditForm";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      user: {
        username: user.username,
        bio: user.bio,
        id: user.user_id
      },
      editBioToggle: false
    };
  }

  handleBioChange = () => {
    console.log("edit the bio now ✅🖋");
    this.setState({
      editBioToggle: !this.state.editBioToggle
    });
  };

  render() {
    const { user, signOut, updateBio } = this.props;
    return (
      <Fragment>
        <MenuBar user={user} signOut={signOut} />
        <h1>{user.username}</h1>
        <UserProfileImage />
        <UserRating />
        <h4>Bio:</h4>
        {this.state.editBioToggle ? (
          <Fragment>
            <Icon name="close" onClick={this.handleBioChange} />
            <UserBioEditForm updateBio={updateBio} />
          </Fragment>
        ) : (
          <Fragment>
            <Icon name="edit outline" onClick={this.handleBioChange} />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          </Fragment>
        )}
        <h5>Journal Clubs</h5>
        <h5>Paper Reviews</h5>
      </Fragment>
    );
  }
}

export default UserProfile;
