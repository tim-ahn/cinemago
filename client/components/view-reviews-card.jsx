import React from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

class ViewReviewsCard extends React.Component {

  render() {

    return (

      <Card>
        <CardBody>

          <CardTitle>{'something'}</CardTitle>

          <CardText>{this.props.reviews}</CardText>

          <button className="btn-secondary" onClick={() => this.props.changeView('review')}>Edit Review</button>

          <button className='btn-danger' onClick={() => this.props.changeView('listContent')}>Delete Review</button>
        </CardBody>
      </Card>
    );

  }
}
export default ViewReviewsCard;
