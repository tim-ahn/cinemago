import React from 'react';
import { Card, CardText, CardBody, CardTitle, Button } from 'reactstrap';

class ViewReviewsCard extends React.Component {

  render() {

    return (
      <div>
        <Card>
          <CardBody>

            <CardTitle>{this.props.title}Hot Rod</CardTitle>

            <CardText>{this.props.review} This movie is neat</CardText>

            <button className="btn-secondary" onClick={this.props.editReview}>Edit Review</button>

            <Button color='danger'>Delete Review</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default ViewReviewsCard;
