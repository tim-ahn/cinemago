import React from 'react';
import { Card, CardText, CardBody } from 'reactstrap';

class ViewReviewsCard extends React.Component {

  render() {

    return (
      <div className="row m-2 border container white">
        <div className="col m-2">
          <p>Content: {this.props.item.content}</p>
          <p>Rating:{this.props.item.rating}</p>
        </div>
        <div>
          <button className="btn btn-outline-secondary m-2" onClick={() => this.props.editReview()}>Edit Review</button>
          <button className='btn btn-outline-danger m-2' onClick={() => this.props.deleteReview(this.props.item.reviewId)}>Delete Review</button>
        </div>

      </div >

    );

  }
}
export default ViewReviewsCard;
