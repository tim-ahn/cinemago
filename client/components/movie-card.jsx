import React from 'react';

class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.getMovieDetails(this.props.movieCardId);
  }

  render() {
    let posterURL;
    if (this.props.poster_path !== null) {
      posterURL = `https://image.tmdb.org/t/p/w500${this.props.poster_path}`;
    } else {
      posterURL = '../images/image_placeholder.png';
    }
    return (<>
      <div className="col-4 p-2" onClick={() => this.handleClick(event)}>
        <img src={posterURL} className="card-img"></img>
      </div>

    </>);
  }
}

export default MovieCard;
