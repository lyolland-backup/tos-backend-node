import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";

class MenuBar extends Component {
  render() {
    const { user, signOut } = this.props;
    const menu =
      user.username === null ? (
        <Menu.Menu>
          <Menu.Item>
            <Button basic>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button basic>
              <Link to="/signin">Sign in</Link>
            </Button>
          </Menu.Item>
        </Menu.Menu>
      ) : (
        <Menu.Menu>
          <Menu.Item>
            <Button basic onClick={signOut}>
                Sign Out
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button basic>
              <Link to="/profile">Profile</Link>
            </Button>
          </Menu.Item>
        </Menu.Menu>
      );
    return <Menu>{menu}</Menu>;
  }
}

export default MenuBar;
