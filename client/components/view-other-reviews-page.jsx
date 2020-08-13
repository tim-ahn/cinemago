import React from 'react';
import ViewOtherReviewsCard from './other-review-card';

class ViewOtherReviewsPage extends React.Component {

  render() {

    if (this.props.otherReviews.length > 0) {
      return (<>
        <div className="container">
          <div>
            <button className="btn btn-outline-danger position-relative" onClick={this.props.goBack}>Go Back</button>
          </div>
          <div>
            <h1 style={{ textAlign: 'center' }}>Reviews</h1>
          </div>

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
      return (<>
        <div>
          <button className="btn btn-outline-danger position-absolute" onClick={this.props.goBack}>Go Back</button>
        </div>
        <br></br>
        <div style={{ textAlign: 'center' }}> No Reviews Found</div>
      </>
      );
    }
  }

}

export default ViewOtherReviewsPage;
