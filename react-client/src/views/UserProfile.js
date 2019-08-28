import React, { Component, Fragment } from "react";
import UserProfileImage from "../components/UserProfileImage";
import MenuBar from "../components/MenuBar";
import UserRating from "../components/UserRating";
import { Icon } from "semantic-ui-react";
import UserPapersContainer from "../components/UserPapersContainer";

class UserProfile extends Component {
  state = {
    bio: "",
    editBioToggle: false
  };

  handleBioChange = () => {
    console.log("edit the bio now ✅🖋");
    this.setState({
      editBioToggle: !this.state.editBioToggle
    });
  };

  editBio = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.updateBio(this.state);
    this.setState({
      editBioToggle: !this.state.editBioToggle
    });
  };

  render() {
    const { user, signOut } = this.props;
    return (
      <Fragment>
        <MenuBar user={user} signOut={signOut} />
        <h1>{user.username}</h1>
        <UserProfileImage username={user.username} />
        <UserRating />
        <h4>Bio:</h4>
        {this.state.editBioToggle ? (
          <Fragment>
            <Icon name="close" onClick={this.handleBioChange} />
            {/* <UserBioEditForm updateBio={updateBio} /> */}
            <form onSubmit={this.handleSubmit} className="bio-edit">
              <textarea
                name="bio"
                onChange={this.editBio}
                value={this.state.bio}
                className="bio-input"
              />
              <button className="button" type="submit" value="save">
                save
              </button>
            </form>
          </Fragment>
        ) : (
          <Fragment>
            <Icon name="edit outline" onClick={this.handleBioChange} />
            <p>{user.bio}</p>
          </Fragment>
        )}
        <h5>Paper Reviews</h5>
        <UserPapersContainer userPapers={this.props.userPapers} />
        <h5>Journal Clubs</h5>
      </Fragment>
    );
  }
}

export default UserProfile;
