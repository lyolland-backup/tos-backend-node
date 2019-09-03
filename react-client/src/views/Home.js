import React, { Component } from "react";
import HomeContentContainer from "../containers/HomeContentContainer";

class Home extends Component {
  render() {
    // console.log(this.props);
    return (
      <div>
        <div className="home-body">
          <h1>Welcome to T.O.S</h1>
        </div>
        <HomeContentContainer />
      </div>
    );
  }
}
export default Home;
