import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      movieId: null,
      rating: 1,
      content: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleText = this.handleText.bind(this);
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch('/api/movie/review', {
      method: 'POST',
      body: JSON.stringify({ content: this.state.content, rating: this.state.rating })
    })
      .then(response => response.json())
      .then(review => {
        this.setState({ content: review });
      });
  }

  handleText(event) {
    this.setState({ content: event.target.value });
  }

  render() {
    // let posterURL;
    // if (this.props.poster_path !== null) {
    //   posterURL = `https://image.tmdb.org/t/p/w500${this.props.poster_path}`;
    // } else {
    //   posterURL = '../images/image_placeholder.png';
    // }

    return (

      <form onSubmit={this.handleSubmit} className="container">

        <h2>Write a Review</h2>

        {/* <div >
          <div className="row m-2 border">
            <div className="col m-2">
              <img src={posterURL} className="card-img" styles=""></img>
            </div>
            <div className="col m-4">
              <h1 className="card-title">{this.props.fullInfo.original_title}</h1>
              <h4 className="card-subtitle mb-2 text-muted">Popularity:{this.props.fullInfo.popularity}</h4>
              <h4 className="card-subtitle mb-2 text-muted">Rating:{this.props.fullInfo.vote_average}</h4>
              <h4 className="card-subtitle mb-2 text-muted">Release Year:{this.props.fullInfo.release_date.substr(0, 4)}</h4>
              <p className="card-text">{this.props.fullInfo.overview}</p>
              <button>
                <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-file-earmark-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5v-1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h5v2.5A1.5 1.5 0 0 0 10.5 6H13v2h1V6L9 1z" />
                  <path fillRule="evenodd" d="M13.5 10a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z" />
                  <path fillRule="evenodd" d="M13 12.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0v-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div> */}

        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={this.state.rating}
          onStarClick={this.onStarClick.bind(this)}
        />
        <br></br>
        <textarea
          defaultValue="Write a review here"
          name="review"
          id="review"
          cols="30"
          rows="10"
          style={{ color: 'lightgrey' }}
          onChange={this.handleText}>
        </textarea>
        <br></br>
        <div className="button-container">
          <button className="btn btn-secondary">Cancel</button>
          <button className="btn btn-primary">Submit</button>
        </div>

      </form>

    );
  }
}
export default WriteReview;
