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
        <div className="pl-2">
          <div className="row pl-2 m-2 border container white">
            <div className="col container m-2">
              <h3 className="pl-0 pt-4">{this.props.item.title}</h3>

              <StarRatingComponent
                name="userRating"
                starCount={5}
                value={this.state.rating}
              />
              <p>{'"' + this.props.item.content + '"'}</p>
            </div>
          </div >
        </div>

      </>

    );

  }
}
export default ViewOtherReviewsCard;
