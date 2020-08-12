import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

class ViewOtherReviewsCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: this.props.item.content, rating: this.props.item.rating };
  }

  render() {
    return (
      <>
        <div className="row m-2 border container white">
          <div className="col m-2">
            <h5>{this.props.item.title}</h5>
            <p style={{ alignItems: 'baseline-position' }}>Rating:
              <StarRatingComponent
                name="userRating"
                starCount={5}
                value={this.state.rating}
              /></p>
            <p>{'"' + this.props.item.content + '"'}</p>
          </div>
        </div >
      </>

    );

  }
}
export default ViewOtherReviewsCard;
