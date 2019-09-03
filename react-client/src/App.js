import React, { Component } from "react";
import "./App.css";
import { withRouter } from "react-router-dom";
import API from "./adapters/API";
import MenuBar from "./components/MenuBar";
import Menu from "./views/Menu";

import CreateRoutes from "./containers/Routing";

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
    formError: false,
    allUsers: [],
    allPaperIDs: [],
    updatingRating: false
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

    API.fetchAllUsers().then(data => {
      this.setState({
        allUsers: data.data.map(user => user.id)
      });
    });
    API.fetchAllPapers().then(data => {
      data.data.map(paper => {
        // console.log("all the papers", paper)
        // debugger
        return this.setState({
          allPapers: [
            ...this.state.allPapers,
            {
              id: paper.attributes.id,
              user_id: paper.attributes.user.id,
              title: paper.attributes.title,
              abstract: paper.attributes.abstract,
              doi: paper.attributes.doi,
              category: paper.attributes.category,
              rating: paper.attributes.rating
            }
          ],
          allPaperIDs: [...this.state.allPaperIDs, paper.id] // will grab ids from paper object in refactor
        });
      });
    });
  }

  validateUserForm = user => {
    return user.username.trim().length >= 1 && user.password.trim().length >= 3
      ? true
      : false;
  };

  validatePaperForm = paper => {
    console.log("posting this paper ... 🤓", paper);
    return paper.title.trim().length > 1 &&
      paper.abstract.trim().length >= 10 &&
      paper.category.trim().length >= 0
      ? true
      : false;
  };

  submitSignUp = user => {
    console.log("user object => during sign up 🤓");
    if (this.validateUserForm(user)) {
      console.log("signing up ... 🤓", user);
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
    // API.nodeSignUp(user)
    // .then(response => {
    //   // debugger
    //   if (response.ok) {
    //     return response.json();
    //   }
    //   return response.json().then(error => {
    //     throw new Error(error.message);
    //   });
    // })
    // .then(user => console.log(user))
    // .catch(error => {
    //   this.state.errorMessage = error.message;
    //   console.log(error);
    // });
  };

  submitSignIn = user => {
    if (this.validateUserForm(user)) {
      console.log("signing in ... 🤓");
      this.setState({
        loggingUser: true
      });
      API.signInUser(user).then(u => {
        // debugger
        console.log("who is this user??? 🐛", u);
        setTimeout(() => {
          this.setState({
            loggingUser: false,
            user: {
              username: u.data.attributes.username,
              user_id: u.data.attributes.id,
              usertype: u.data.attributes.usertype ? "Researcher" : "Peer",
              bio: u.data.attributes.bio
            }
          });
          console.log("here are the props => 🎁", this.props);
          this.props.history.push("/"); // takes user back to the 🏠 page
        }, 1000);
      });
    } else {
      console.log("failed to sign in");
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

    // if (this.validatePaperForm(paper)) {
    console.log("posting paper ... 🤓");
    //   this.setState({
    //     loggingUser: true
    //   });
    API.postPaper(paper).then(paper => {
      console.log("posting paper ... 🧻", paper);

      setTimeout(() => {
        this.setState({
          loggingUser: false,
          allPapers: [
            ...this.state.allPapers,
            {
              id: paper.data.attributes.id,
              user_id: paper.data.attributes.user.id,
              title: paper.data.attributes.title,
              abstract: paper.data.attributes.abstract,
              doi: paper.data.attributes.doi,
              category: paper.data.attributes.category,
              rating: 0
            }
          ]
        });
      }, 1000);
    });
    // } else {
    //   console.log(" paper not posted ☹️");
    // }
  };

  usersPostsReview = review => {
    API.postReview(review).then(review =>
      console.log("here is the returned review object", review)
    );
  };

  updateRating = (value, id) => {
    API.updatePaperRating(value, id);
    return this.state.allPapers.forEach(paper => {
      if (paper.id === id) {
        paper.rating = value
      }
    });
  };

  showMenu = () => {
    this.setState({
      menu: !this.state.menu
    });
  };

  filterPapers = token =>
    this.state.allPapers.filter(paper => paper.user_id === parseInt(token));

  sortPapers = sortType => {
    console.log(sortType);
    switch (sortType) {
      case "Ascending":
        this.setState({
          allPapers: this.sortAscendingName(this.state.allPapers)
        });
        break;
      case "Descending":
        this.setState({
          allPapers: this.sortDescendingName(this.state.allPapers)
        });
        break;
      case "Rating":
        this.setState({
          allPapers: this.sortRating(this.state.allPapers)
        });
        break;
    }
  };

  sortAscendingName = paper => {
    return paper.sort((a, b) => a.title.localeCompare(b.title));
  };
  sortDescendingName = paper => {
    return paper.sort((a, b) => b.title.localeCompare(a.title));
  };

  sortRating = paper => {
    return paper.sort((a, b) => b.rating - a.rating);
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
          userPapers={this.filterPapers}
          allPapers={this.state.allPapers}
          userPostsPaper={this.userPostsPaper}
          allUsers={this.state.allUsers}
          allPaperIDs={this.state.allPaperIDs}
          usersPostsReview={this.usersPostsReview}
          updateRating={this.updateRating}
          sortPapers={this.sortPapers}
        />
      </div>
    );
  }
}

export default withRouter(App);
