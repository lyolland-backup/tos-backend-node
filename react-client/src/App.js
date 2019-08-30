import React, { Component } from "react";
import "./App.css";
import { withRouter, NavLink } from "react-router-dom";
import API from "./adapters/API";
import MenuBar from "./components/MenuBar";
import Menu from "./views/Menu";
import Joi from "joi";

import CreateRoutes from "./containers/Routing";

// this should map to user model validation in rails
// validates :username, uniqueness: { case_sensitive: false }
// validates :password, length: { minimum: 3 }
const userSchema = Joi.object().keys({
  username: Joi.string()
    .min(1)
    .required(),
  password: Joi.string()
    .min(3)
    .required()
});

const paperSchema = Joi.object().keys({
  title: Joi.string()
    .min(1)
    .required(),
  abstract: Joi.string()
    .min(10)
    .required(),
  category: Joi.string().required()
});

class App extends Component {
  state = {
    user: {
      username: null,
      user_id: null,
      usertype: null,
      bio: null
    },
    loggingUser: false,
    userPapers: [],
    allPapers: [],
    menu: false,
    formError: false
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
            usertype: user.user.data.attributes.usertype
              ? "Researcher"
              : "Peer",
            bio: user.user.data.attributes.bio
          }
        });
        user.user.data.attributes.papers.map(paper =>
          this.setState({
            userPapers: [...this.state.userPapers, paper]
          })
        );
      }
    });
    API.fetchAllPapers().then(data => {
      console.log("fetching papers...🧻");
      data.data.map(paper => {
        this.setState({
          allPapers: [...this.state.allPapers, paper.attributes]
        });
      });
    });
  }

  validateUserForm = user => {
    const userData = {
      username: user.username,
      password: user.password
    };
    const result = Joi.validate(userData, userSchema);
    return !result.error ? true : false;
  };

  validatePaperForm = paper => {
    console.log("posting this paper ... 🤓", paper);

    const paperData = {
      title: paper.title,
      abstract: paper.abstract,
      category: paper.category
    };
    const result = Joi.validate(paperData, paperSchema);
    return !result.error ? true : false;
  };

  submitSignUp = user => {
    console.log("user object => during sign up 🤓");
    if (this.validateUserForm(user)) {
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
                usertype: user.data.attributes.usertype ? "Researcher" : "Peer",
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
    if (this.validateUserForm(user)) {
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
              usertype: user.data.attributes.usertype ? "Researcher" : "Peer",
              bio: user.data.attributes.bio
            }
          });
          console.log("here are the props => 🎁", this.props);
          this.props.history.push("/"); // takes user back to the 🏠 page
        }, 1000);
      });
    } else {
      // return an alert when sign in fails validation step - use the error handler on back end

    }
  };

  signOut = () => {
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

  userPostsPaper = paper => {
    console.log("posting paper ... 🧻", paper);

    if (this.validatePaperForm(paper)) {
      console.log("posting paper ... 🤓");
      this.setState({
        loggingUser: true
      });
      API.postPaper(paper).then(paper => {
        setTimeout(() => {
          this.setState({
            loggingUser: false,
            userPapers: [...this.state.userPapers, paper.data.attributes],
            allPaper: [...this.state.allPapers, paper.data.attributes]
          });
        }, 1000);
      });
    } else {
      console.log(" paper not posted ☹️");
    }
  };

  showMenu = () => {
    this.setState({
      menu: !this.state.menu
    });
  };
  render() {
    return (
      <div className="App">
        <MenuBar
          user={this.state.user}
          signOut={this.signOut}
          showMenu={this.showMenu}
          menuState={this.state.menu}
        />

        {!this.state.menu ? null : (
          <Menu
            menu={this.state.menu}
            user={this.state.user}
            signOut={this.signOut}
            showMenu={this.showMenu}
          />
        )}
        <CreateRoutes
          user={this.state.user}
          signOut={this.signOut}
          submitSignUp={this.submitSignUp}
          loggingUser={this.state.loggingUser}
          submitSignIn={this.submitSignIn}
          updateBio={this.updateBio}
          userPapers={this.state.userPapers}
          allPapers={this.state.allPapers}
          userPostsPaper={this.userPostsPaper}
        />
      </div>
    );
  }
}

export default withRouter(App);
