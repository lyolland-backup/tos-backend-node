import React, { Component, Fragment } from "react";
import API from "../adapters/API";
import AuthorList from "../components/AuthorListItem";
import { Link } from "react-router-dom";
class PaperShow extends Component {
  state = {
    paper: {
      title: "",
      abstract: "",
      category: "",
      url_for_pdf: "",
      url: "",
      author: []
    },
    paperData: {
      url: "",
      pdf_url: ""
    }
  };
  
  componentDidMount() {
    const { access_token } = this.props.match.params;
    console.log("The id to fetch => 🎁", this.props);
    this.fetchPaper(access_token);
  }

  fetchPaper = access_token => {
    API.fetchPaper(access_token).then(paper => {
      console.log(paper.data);
      this.setState({
        paper: {
          title: paper.data.attributes.title,
          abstract: paper.data.attributes.abstract,
          category: paper.data.attributes.category,
          author: paper.data.attributes.user.username,
          authorID: paper.data.attributes.user.id,
          doi: paper.data.attributes.doi
        }
      });
    });
  };

  fetchDOI = doi => {
    fetch(`https://api.unpaywall.org/v2/${doi}?email=@`)
      .then(resp => resp.json())
      .then(paper => {
        console.log("in the request :O =>>>>");
        this.setState({
          paperData: {
            url: paper.best_oa_location.url,
            pdf_url: paper.best_oa_location.url_for_pdf
          }
        });
      });
  };

  handleError = e => console.log("it broked", e);

  render() {
    const {
      title,
      abstract,
      category,
      author,
      doi,
      authorID
    } = this.state.paper;
    // const authors = author.map((a, idx) => <AuthorList key={idx} name={a} />);
    const path = `/users/${authorID}`;
    return (
      <div className="paper-show-container">
        {/* <MenuBar user={this.props.user} signOut={this.props.signOut} /> */}
        <div>
          <h1>{title}</h1>
          <h2>{author}</h2>
          <h5>{category}</h5>
          <Link to={path}>{author}</Link>
          <p>{abstract}</p>
        </div>
      </div>
    );
  }
}

export default PaperShow;
