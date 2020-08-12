import React from 'react';
import ViewOtherReviewsCard from './other-review-card';

class ViewOtherReviewsPage extends React.Component {

  render() {

    if (this.props.otherReviews.length > 0) {
      return (<>
        <div className="container">
          <h1>Reviews</h1>
          <div className="row mt-1">
            {this.props.otherReviews.map((item, index) => {
              return (
                <ViewOtherReviewsCard
                  key={index}
                  changeView={this.props.changeView}
                  item={item} />);
            })}

          </div>

        </div>
      </>);
    } else {
      return (
        <div style={{ textAlign: 'center' }}> No Reviews Found</div>
      );
    }
  }

}

export default ViewOtherReviewsPage;
