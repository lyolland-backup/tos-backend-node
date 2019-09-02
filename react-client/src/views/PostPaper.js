import React, { Component } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
var doiRegex = require('doi-regex');

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
        doi: "",
        user_id: props.user_id
      }
    };
  }

  handleInputChange = (e, { name, value }) => {
    this.setState({
      paper: {
        ...this.state.paper,
        [name]: value
      }
    });
  };

  handleSubmit = () => {
    if (!this.validate()) return
    this.props.userPostsPaper(this.state.paper);
    this.props.addPaperToggle();
  };

  validate = () => {
    const {doi, title, abstract, category} = this.state.paper
    return (doiRegex({exact: true}).test(doi) || doiRegex.declared({exact: true}).test(doi)) && title.length > 5 && abstract.length > 20 && category.length !==0
  }

  render() {
    return (
      <div className="post-input-container">
        <Button onClick={this.props.addPaperToggle}>close</Button>
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
              placeholder="enter the DOI ..."
              name="doi"
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
