import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: '', rating: 0 };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleText = this.handleText.bind(this);
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.postReview(this.props.movieToReview, this.state.content, this.state.rating, this.props.movieTitleToReview);
  }

  handleText(event) {
    this.setState({ content: event.target.value });
  }

  render() {

    return (<>
      <div className="container">

        <h2>Write a Review</h2>

        <div >
          <div className="row">
            <h3 className="text-center">{this.props.movieTitleToReview}</h3>
          </div>
        </div>
        <br></br>

        <form onSubmit={this.handleSubmit} className="container mb-5">

          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={this.state.rating}
            style={{ justifyContent: 'center' }}
            onStarClick={this.onStarClick.bind(this)}
          />
          <br></br>
          <textarea
            placeholder="Write a review here"
            name="content"
            id="content"
            cols="30"
            rows="10"
            style={{ color: 'lightgrey', width: '40%' }}
            onChange={this.handleText}>
          </textarea>
          <br></br>
          <div className="button-container">
            <button className="btn btn-secondary" onClick={() => this.props.changeView('listContent')}>Cancel</button>
            <button className="btn btn-primary" type="submit">Submit</button>
          </div>

        </form>
      </div>

    </>

    );
  }
}
export default WriteReview;
