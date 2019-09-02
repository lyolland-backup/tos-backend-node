import React, { Component, Fragment } from "react";
import API from "../adapters/API";
import { Link, withRouter } from "react-router-dom";
import ReviewContainer from "../containers/ReviewsContainer";

import { Segment, Dimmer, Loader } from "semantic-ui-react";

class PaperShow extends Component {
  state = {
    mounted: false,
    paper: {
      title: "",
      abstract: "",
      category: "",
      url_for_pdf: null,
      url: null,
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

    console.log("access_token", access_token);
    console.log("allPaperIDs", allPaperIDs.includes(`${access_token}`));
    // RENDER 404/ NOT FOUND ON FAILED FETCH

    API.fetchPaper(access_token)
      .then(response => {
        if (!response.ok) {
          history.push("/404");
          throw response;
        } else if (response.ok) {
          return response.json();
        }
      })
      .then(paper => {
        this.setState({
          paper: {
            title: paper.data.attributes.title,
            abstract: paper.data.attributes.abstract,
            category: paper.data.attributes.category,
            author: paper.data.attributes.user.username,
            authorID: paper.data.attributes.user.id,
            doi: paper.data.attributes.doi,
            id: paper.data.attributes.id,
          },
          review: {
            ...this.state.review,
            user_id: paper.data.attributes.user.id,
            paper_id: paper.data.attributes.id
          },
          paperReviews: paper.data.attributes.reviews.map(p => p)
        });
      });
  }

  fetchDOI = doi => {
    fetch(`https://api.unpaywall.org/v2/${doi}?email=@`)
      .then(resp => resp.json())
      .then(paper => {
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
    console.log("match state", this.state.matched);
    const view = !this.state.mounted ? (
      <Segment textAlign="center" style={{ height: "100vh", zIndex: "-1 " }}>
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      </Segment>
    ) : (
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
    return view;
  }
}

export default withRouter(PaperShow);
