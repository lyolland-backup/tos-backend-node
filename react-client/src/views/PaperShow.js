import React, { Component, Fragment } from "react";
import API from "../adapters/API";
import { Link, withRouter } from "react-router-dom";
import ReviewContainer from "../containers/ReviewsContainer";
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
    },
    review: {
      content: "",
      paper_id: "",
      user_id: ""
    },
    paperReviews: []
  };

  componentDidMount() {
    const { match, history, allPaperIDs } = this.props;
    const { access_token } = this.props.match.params;
    API.fetchPaper(access_token).then(paper => {
      this.setState({
        paper: {
          title: paper.data.attributes.title,
          abstract: paper.data.attributes.abstract,
          category: paper.data.attributes.category,
          author: paper.data.attributes.user.username,
          authorID: paper.data.attributes.user.id,
          doi: paper.data.attributes.doi,
          id: paper.data.attributes.id
        },
        review: {
          ...this.state.review,
          user_id: paper.data.attributes.user.id,
          paper_id: paper.data.attributes.id
        },
        paperReviews: paper.data.attributes.reviews.map(p => p)
      });
    });
    // const { allPaperIDs, history } = this.props;
    // const { access_token } = this.props.match.params;
    // if (!allPaperIDs.includes(access_token)) history.push("/404");
  }

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

  handleChange = e => {
    this.setState({
      review: { ...this.state.review, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.usersPostsReview(this.state.review);
    this.setState({
      paperReviews: [...this.state.paperReviews, this.state.review]
    });
  };

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
        <div>
          <h1>{title}</h1>
          <h2>{author}</h2>
          <h5>{category}</h5>
          <Link to={path}>{author}</Link>
          <p>{abstract}</p>
        </div>

        <h5>Reviews</h5>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text-area"
            onChange={this.handleChange}
            name="content"
            placeholder="enter your review ..."
          ></input>
          <button type="submit"> submit review</button>
        </form>
        <ReviewContainer paperReviews={this.state.paperReviews} />
      </div>
    );
  }
}

export default withRouter(PaperShow);
