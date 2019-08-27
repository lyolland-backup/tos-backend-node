import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Menu, Input } from "semantic-ui-react";

class MenuBar extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

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
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
        </Menu.Menu>
      ) : (
        <Menu.Item>
          <Button basic>
            <Link to="/signup" onClick={signOut}>
              Sign Out
            </Link>
          </Button>
        </Menu.Item>
      );
    return <Menu secondary>{menu}</Menu>;
  }
}

export default MenuBar;
