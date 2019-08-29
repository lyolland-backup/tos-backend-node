import React, { Component, Fragment } from "react";
import API from "../adapters/API";
import AuthorList from "../components/AuthorListItem";

class PaperShow extends Component {
  state = {
    paper: {
      title: "",
      abstract: "",
      category: "",
      author: []
    }
  };
  componentDidMount() {
    const { access_token } = this.props.match.params;
    console.log("The id to fetch => 🎁", this.props);
    API.fetchPaper(access_token).then(paper => {
      console.log(paper.data);
      this.setState({
        paper: {
          title: paper.data.attributes.title,
          abstract: paper.data.attributes.abstract,
          category: paper.data.attributes.category,
          author: paper.data.attributes.users.map(user => user.username)
        }
      });
    });
  }
  render() {
    const { title, abstract, category, author } = this.state.paper;
    const authors = author.map((a, idx) => <AuthorList key={idx} name={a} />);
    return (
      <Fragment>
        {/* <MenuBar user={this.props.user} signOut={this.props.signOut} /> */}
        <div>
          <h1>{title}</h1>
          <h2>{authors}</h2>
          <h5>{category}</h5>
          <p>{abstract}</p>
        </div>
      </Fragment>
    );
  }
}

export default PaperShow;
