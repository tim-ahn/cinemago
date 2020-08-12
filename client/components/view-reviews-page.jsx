import React from 'react';
import ViewReviewsCard from './view-reviews-card';
import { CSSTransitionGroup } from 'react-transition-group';

class ViewReviewsPage extends React.Component {

  render() {
    return (<>
      <div className="container">
        <h1>My Reviews</h1>
        <div className="row container mt-1">
          <CSSTransitionGroup
            key={'my-reviews'}
            transitionName="example"
            transitionAppear={false}
            transitionAppearTimeout={500}
            transitionEnter={true}
            transitionLeave={true}
            style={{ width: '100%' }}>
            {this.props.reviews.map((item, index) => {
              return (
                <ViewReviewsCard
                  key={index}
                  deleteReview={this.props.deleteReview}
                  editReview={this.props.editReview}
                  changeView={this.props.changeView}
                  item={item} />);
            })}
          </CSSTransitionGroup>

        </div>

      </div>
    </>);
  }

}

export default ViewReviewsPage;
