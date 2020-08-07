import React from 'react';

export default class MovieDetails extends React.Component {

  handleClick(event) {
    this.props.changeView('search');
  }

  // need to do image-contain for backdrop
  render() {
    const backDropPath = this.props.details[1].backdrop_path;
    const posterPath = this.props.details[1].poster_path;
    const recommendedMovie1 = this.props.details[2].results[0].poster_path;
    const recommendedMovie2 = this.props.details[2].results[1].poster_path;
    const recommendedMovie3 = this.props.details[2].results[2].poster_path;

    return (
      <>
        <div onClick={() => this.handleClick()}>
          <img src="../images/less-than-icon.png"></img>
        </div>
        <img src={`https://image.tmdb.org/t/p/w500${backDropPath}`}></img>
        <div>
          <div className="movie-description">
            <h2 className="title">{this.props.details[1].title}</h2>
            <p>Average Rating: {this.props.details[1].vote_average}</p>
            <div>
              <button>Trailer Link</button>
              <p>{this.props.details[1].runtime} min</p>
            </div>
            <img src="../images/heart-icon.png"></img>
            <img src="../images/eye-icon.png"></img>
            <img src="../images/add-list-icon.png"></img>
          </div>
          <div className="poster">
            <img src={`https://image.tmdb.org/t/p/w500${posterPath}`}></img>
          </div>
        </div>
        <p>{this.props.details[1].overview}</p>
        <div className="reviews">
          <h2>Reviews +icon</h2>
          <p>{this.props.details[0].results[0].author}</p>
          <p>{this.props.details[0].results[0].content}</p>
          <p>{this.props.details[0].results[1].author}</p>
          <p>{this.props.details[0].results[1].content}</p>
        </div>
        <div className="similar-movies">
          <h2>Users also liked:</h2>
          <img src={`https://image.tmdb.org/t/p/w500${recommendedMovie1}`}></img>
          <img src={`https://image.tmdb.org/t/p/w500${recommendedMovie2}`}></img>
          <img src={`https://image.tmdb.org/t/p/w500${recommendedMovie3}`}></img>
        </div>
      </>
    );
  }
}
