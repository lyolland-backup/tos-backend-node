import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import UserProfileImage from "../components/UserProfileImage";
import UserRating from "../components/UserRating";
import UserPapersContainer from "../containers/UserPapersContainer";
import API from "../adapters/API";
import { Button } from "semantic-ui-react";
import PostPaper from "./PostPaper";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editBioToggle: null,
      user: {
        username: "",
        usertype: "",
        bio: "",
        id: ""
      },
      userPapers: props.allPapers,
      postPaperToggle: false,
      openVersion: {
        url: "",
        pdfURL: ""
      },
      userPaperToggle: false
    };
  }
  componentDidMount() {
    const { access_token } = this.props.match.params;
    this.setUserData(access_token);
  }

  componentDidUpdate() {
    const { access_token } = this.props.match.params;
    return parseInt(access_token) !== this.state.user.id
      ? this.setUserData()
      : false;
  }

  setUserData = () => {
    const { history } = this.props;
    const { access_token } = this.props.match.params;
    API.fetchUser(access_token)
      .then(response => {
        if (!response.ok) {
          history.push("/404");
          throw response;
        } else if (response.ok) {
          return response.json();
        }
      })
      .then(user => {
        this.setState({
          user: {
            username: user.data.attributes.username,
            usertype: user.data.attributes.usertype ? "Researcher" : "Peer",
            bio: user.data.attributes.bio,
            id: user.data.attributes.id
          },
          userPapers: this.props.allPapers,
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

  addPaperToggle = () => {
    this.setState({
      postPaperToggle: !this.state.postPaperToggle
    });
  };

  showUserPaperToggle = () => {
    this.setState({
      userPaperToggle: !this.state.userPaperToggle
    });
  };

  render() {
    const { user, postPaperToggle, userPaperToggle } = this.state;
    const papersView =
      user.usertype === "Researcher" ? (
        <Fragment>
          <h5>Papers</h5>
          {postPaperToggle ? (
            <PostPaper
              addPaperToggle={this.addPaperToggle}
              user_id={user.id}
              userPostsPaper={this.props.userPostsPaper}
            />
          ) : (
            <Fragment>
              {parseInt(this.props.match.params.access_token) ===
              this.props.user.user_id ? (
                <Button onClick={this.addPaperToggle}>add a paper</Button>
              ) : null}
              <Button onClick={this.showUserPaperToggle}>{!userPaperToggle ? "show papers" : "hide papers"}</Button>
            </Fragment>
          )}
          {userPaperToggle ? (
            <UserPapersContainer
              userPapers={this.props.userPapers(
                this.props.match.params.access_token
              )}
            />
          ) : null}
        </Fragment>
      ) : null;
    return (
      <div className="user-profile-container">
        <h1>{user.username}</h1>
        <UserProfileImage username={user.username} />
        <UserRating />
        <h4>Bio:</h4>
        {this.state.editBioToggle ? (
          <Fragment>
            <form onSubmit={this.handleSubmit} className="bio-edit">
              <div className="form-buttons">
                <button onClick={this.handleBioChange}>
                  <span role="img" aria-label="discard changes">
                    🚮
                  </span>
                </button>
                <button type="submit">
                  <span role="img" aria-label="save changes">
                    💾
                  </span>
                </button>
              </div>
              <textarea
                name="bio"
                onChange={this.editBio}
                value={user.bio}
                className="bio-input"
              />
            </form>
          </Fragment>
        ) : (
          <Fragment>
            {parseInt(this.props.match.params.access_token) ===
            this.props.user.user_id ? (
              <Fragment>
                <button onClick={this.handleBioChange}>
                  <span role="img" aria-label="edit bio">
                    ✏️
                  </span>
                </button>
                <p>{user.bio}</p>
              </Fragment>
            ) : null}
          </Fragment>
        )}
        {papersView}
        <h5>Reviews</h5>
        <h5>Journal Clubs</h5>
      </div>
    );
  }
}

export default withRouter(UserProfile);
