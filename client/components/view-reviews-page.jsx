import React from 'react';
import ViewReviewsCard from './view-reviews-card';

class ViewReviewsPage extends React.Component {

  render() {
    // eslint-disable-next-line no-console
    console.log(this.props.reviews);
    return (<>
      <div className="container">
        <div className="row mt-1">
          <ViewReviewsCard
            changeView={this.props.changeView}/>
        </div>

      </div>
    </>);
  }

}

export default ViewReviewsPage;
