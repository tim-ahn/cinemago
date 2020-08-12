import React from 'react';
import { Card, CardText, CardBody } from 'reactstrap';

class ViewReviewsCard extends React.Component {

  render() {

    return (

      <Card>
        <CardBody>
          <CardText>
            {this.props.item.content}
            {this.props.item.rating}
          </CardText>
          <button className="btn-secondary" onClick={() => this.props.editReview()}>Edit Review</button>
          <button className='btn-danger' onClick={() => this.props.deleteReview(this.props.item.reviewId)}>Delete Review</button>
        </CardBody>
      </Card>
    );

  }
}
export default ViewReviewsCard;
