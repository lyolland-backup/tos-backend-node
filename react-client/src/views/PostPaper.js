import React, { Component } from "react";
import { Button, Form, Segment, Select } from "semantic-ui-react";

const options = [
  { key: "c", text: "Chemistry", value: "Chemistry" },
  { key: "b", text: "Biology", value: "Biology" },
  { key: "p", text: "Physics", value: "Physics" }
];

class PostPaper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paper: {
        title: "",
        abstract: "",
        category: "",
        user_id: props.user_id
      }
    };
  }

  handleInputChange = (e, {name, value}) => {
    this.setState({
      paper: {
        ...this.state.paper,
        [name]: value
      }
    });
  };

  handleSubmit = () => {
    this.props.userPostsPaper(this.state.paper)
  }

  render() {
    return (
      <div className="post-input-container">
        <Button onClick={this.props.showPostPaper}>close</Button>

        <Form onSubmit={this.handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              placeholder="enter paper title ..."
              name="title"
              onChange={this.handleInputChange}
            />
            <Form.Input
              fluid
              placeholder="enter a brief description"
              type="textArea"
              name="abstract"
              onChange={this.handleInputChange}
            />

            <Form.Select
              fluid
              options={options}
              name="category"
              placeholder="Category"
              onChange={this.handleInputChange}
            />
            <Button color="blue" fluid size="large" type="submit">
              Add Paper
            </Button>
          </Segment>
        </Form>
      </div>
    );
  }
}

export default PostPaper;
