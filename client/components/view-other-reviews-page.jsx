import React from 'react';
import ViewOtherReviewsCard from './other-review-card';
import { CSSTransitionGroup } from 'react-transition-group';

class ViewOtherReviewsPage extends React.Component {
  render() {
    if (this.props.otherReviews.length > 0) {
      return (<>
        <div className="container pb-5">
          <div className="pl-4 pb-2">
            <button className="btn btn-outline-danger position-relative" onClick={this.props.goBack}>Go Back</button>
          </div>
          <div className="pl-4 pt-2">
            <h1 >Reviews</h1>
          </div>
          <div className="row container mt-1">
            <CSSTransitionGroup
              key={'my-reviews'}
              transitionName="example"
              transitionAppear={false}
              transitionAppearTimeout={500}
              transitionEnter={true}
              transitionLeave={true}
              className="w-100" ></CSSTransitionGroup>
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
      return (<>
        <div className="container">
          <div className="row container pb-4 pl-4">
            <button className="btn btn-outline-danger position-absolute" onClick={this.props.goBack}>Go Back</button>
          </div>
          <div className="row container pl-4 pt-4 m-0.5 mt-1">
            <h3 style={{ textAlign: 'center' }}> No Reviews Found</h3>
          </div>
        </div>
      </>
      );
    }
  }
}
export default ViewOtherReviewsPage;
