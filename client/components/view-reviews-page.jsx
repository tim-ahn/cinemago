import React from 'react';
import ViewReviewsCard from './view-reviews-card';

class ViewReviewsPage extends React.Component {
  // take in an array of reviews from props

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     reviews: []
  //   };
  // }

  // componentDidMount() {
  //   this.setState({ reviews: this.props.reviews });

  // }

  render() {
    // map array of reviews
    return (<>
      <div className="container">
        <div className="row mt-1">
          <ViewReviewsCard />
        </div>

      </div>
    </>);
  }

}

export default ViewReviewsPage;
