import React from 'react';

class MovieCard extends React.Component {

  handleClick(event) {
    // this.props.
  }

  render() {
    let posterURL;
    if (this.props.poster_path !== null) {
      posterURL = `https://image.tmdb.org/t/p/w500${this.props.poster_path}`;
    } else {
      posterURL = '../images/image_placeholder.png';
    }
    return (<>
      <div className="col-3 m-2 white">
        <img src={posterURL} className="card-img"></img>
      </div>

    </>);
  }
}

export default MovieCard;
