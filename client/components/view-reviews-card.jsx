import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';

class ViewReviewsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewText: 'POOP'
    };

  }

  render() {
    const backDrop = '/6KQ9CWz76m3pT8K0yE08y72nNwD.jpg';
    return (
      <div>
        <Card>
          <CardImg top width="100%" src={`https://image.tmdb.org/t/p/w500${backDrop}`} alt="Card image cap" />
          <CardBody>
            <CardTitle>{this.props.title}Hot Rod</CardTitle>
            <CardText>{this.props.review} This movie is neat</CardText>
            <Button color='primary'>Edit Review</Button>
            <Button color='danger'>Delete Review</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default ViewReviewsCard;
