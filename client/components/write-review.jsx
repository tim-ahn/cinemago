import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 1
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  render() {
    return (

      <form className="container">
        <h2>Write a Review</h2>

        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={this.state.rating}
          onStarClick={this.onStarClick.bind(this)}
        />
        <br></br>
        <textarea name="review" id="review" cols="30" rows="10"></textarea>
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
