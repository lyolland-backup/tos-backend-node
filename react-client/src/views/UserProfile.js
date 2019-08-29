import React, { Component, Fragment } from "react";

import UserProfileImage from "../components/UserProfileImage";
import UserRating from "../components/UserRating";
import { Icon } from "semantic-ui-react";
import UserPapersContainer from "../containers/UserPapersContainer";
import API from "../adapters/API";

class UserProfile extends Component {
  state = {
    editBioToggle: null,
    user: {
      username: "",
      usertype: "",
      bio: "",
      id: ""
    },
    userPapers: []
  };

  componentDidMount() {
    this.setUserData();
  }

  componentDidUpdate() {
    return parseInt(this.props.match.params.access_token) !== this.state.user.id
      ? this.setUserData()
      : false;
  }

  setUserData = () => {
    const { access_token } = this.props.match.params;
    console.log("access => 🎁", access_token);
    API.fetchUser(access_token).then(user => {
      console.log("attributes from user => 🎁", user.data.attributes);
      this.setState({
        user: {
          username: user.data.attributes.username,
          usertype: user.data.attributes.usertype,
          bio: user.data.attributes.bio,
          id: user.data.attributes.id
        },
        userPapers: user.data.attributes.papers.map(paper => paper),
        editBioToggle:
          parseInt(this.props.match.params.access_token) ===
          this.props.user.user_id
            ? false
            : null
      });
    });
  };

  handleBioChange = () => {
    console.log("edit the bio now ✅🖋");
    this.setState({
      editBioToggle: !this.state.editBioToggle
    });
  };

  editBio = e => {
    this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.updateBio(this.state.user);
    this.setState({
      editBioToggle: !this.state.editBioToggle
    });
  };

  render() {
    const { user } = this.state;
    return (
      <Fragment>
        <h1>{user.username}</h1>
        <UserProfileImage username={user.username} />
        <UserRating />
        <h4>Bio:</h4>
        {this.state.editBioToggle ? (
          <Fragment>
            <form onSubmit={this.handleSubmit} className="bio-edit">
              <Icon name="close" onClick={this.handleBioChange} />
              <textarea
                name="bio"
                onChange={this.editBio}
                value={user.bio}
                className="bio-input"
              />
              <button className="button" value="save">
                save
              </button>
            </form>
          </Fragment>
        ) : (
          <Fragment>
            {parseInt(this.props.match.params.access_token) ===
            this.props.user.user_id ? (
              <Fragment>
              
                <Icon name="edit outline" onClick={this.handleBioChange} />
                <p>{this.props.user.bio}</p>
              </Fragment>
            ) : null}
          </Fragment>
        )}
        <h5>Your Papers</h5>{" "}
        {/* make sure when viewing other users that this is just !papers!*/}
        <UserPapersContainer userPapers={this.state.userPapers} />
        <h5>Your Reviews</h5>
        {/* <h5>Journal Clubs</h5> */}
      </Fragment>
    );
  }
}

export default UserProfile;
