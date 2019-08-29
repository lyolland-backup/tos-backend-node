import React, { Component, Fragment } from "react";
import MenuBar from "../components/MenuBar";

class Home extends Component {
  render() {
    const { user, signOut } = this.props;
    console.log(this.props);
    return (
      <Fragment>
        {/* <MenuBar user={user} signOut={signOut} /> */}
        <div className="hero-home"></div>
      </Fragment>
    );
  }
}
export default Home;
