import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Dimmer,
  Loader,
  Checkbox
} from "semantic-ui-react";
import { Link } from "react-router-dom";

class SignUp extends Component {
  state = {
    username: "",
    password: "",
    usertype: false
  };

  handleInputchange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  handleSubmit = e => {
    e.preventDefault();
    this.props.submitSignUp(this.state);
  };

  handleResearcherToggle = e => {
    this.setState({ usertype: !this.state.usertype });
  };

  render() {
    console.log(this.props.loggingUser);
    const view = this.props.loggingUser ? (
      <Segment textAlign="center" style={{ height: "100vh", "z-index": "-1" }}>
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      </Segment>
    ) : (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: "100vw" }}>
          <Header as="h2" color="purple" textAlign="center">
            Sign up for your free account
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              {/* <small>enter a unique username. min 6 chars.</small> */}
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="enter a username ..."
                name="username"
                onChange={this.handleInputchange}
              />
              {/* <small>password must be min 6 chars.alphanum</small> */}
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="enter a password ..."
                type="password"
                name="password"
                onChange={this.handleInputchange}
              />
              <Form.Field>
                <Checkbox
                  label="Researcher"
                  checked={this.state.researcherToggle}
                  onClick={this.handleResearcherToggle}
                />
              </Form.Field>
              <Button color="purple" fluid size="large" type="submit">
                Sign Up
              </Button>
            </Segment>
          </Form>
          <Message>
            Already a member?{" "}
            <Link className="link-to-button" to="/signin">
              Sign In
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    );

    return <div>{view}</div>;
  }
}

export default SignUp;
