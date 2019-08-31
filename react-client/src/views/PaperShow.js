import React, { Component, Fragment } from "react";
import API from "../adapters/API";
import AuthorList from "../components/AuthorListItem";

class PaperShow extends Component {
  state = {
    paper: {
      title: "",
      abstract: "",
      category: "",
      url_for_pdf: "",
      url: "",
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
          author: paper.data.attributes.user.username
        }
      });
    });
  }


  handleDOISubmit = (e, doi) => {
    e.preventDefault();
    fetch(`https://api.unpaywall.org/v2/${doi}?email=@`)
      .then(resp => resp.json())
      .then(paper => {
        console.log(paper);
        this.setState({
          user: {
            url: paper.best_oa_location.url,
            pdf_url: paper.best_oa_location.url_for_pdf
          }
        });
      });
  };


  render() {
    const { title, abstract, category, author } = this.state.paper;
    // const authors = author.map((a, idx) => <AuthorList key={idx} name={a} />);
    return (
      <div className="paper-show-container">
        {/* <MenuBar user={this.props.user} signOut={this.props.signOut} /> */}
        <div>
          <h1>{title}</h1>
          <h2>{author}</h2>
          <h5>{category}</h5>
          <p>{abstract}</p>
        </div>
      </div>
    );
  }
}

export default PaperShow;
