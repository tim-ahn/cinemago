import React from 'react';

export default class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { details: null };
    this.getMovieDetails = this.getMovieDetails.bind(this);
  }

  componentDidMount() {
    this.getMovieDetails(155);
  }

  getMovieDetails(movieId) {
    fetch(`/api/details/${movieId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ details: data });
      });
  }

  // need to do image-contain for backdrop
  render() {
    const backDropPath = '/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg';
    const posterPath = '/qJ2tW6WMUDux911r6m7haRef0WH.jpg';
    const recommendedMovie1 = '/8RW2runSEc34IwKN2D1aPcJd2UL.jpg';
    const recommendedMovie2 = '/85cWkCVftiVs0BVey6pxX8uNmLt.jpg';

    if (this.state.details === null) {
      return null;
    } else {
      return (
        <>
          <img src={`https://image.tmdb.org/t/p/w500${backDropPath}`}></img>
          <div>
            <div className="movie-description">
              <h2 className="title">{this.state.details[1].title}</h2>
              <p>Average Rating: {this.state.details[1].vote_average}</p>
              <div>
                <button>Trailer Link</button>
                <p>{this.state.details[1].runtime} min</p>
              </div>
              <img src="../images/heart-icon.png"></img>
              <img src="../images/eye-icon.png"></img>
              <img src="../images/add-list-icon.png"></img>
            </div>
            <div className="poster">
              <img src={`https://image.tmdb.org/t/p/w500${posterPath}`}></img>
            </div>
          </div>
          <p>{this.state.details[1].overview}</p>
          <div className="reviews">
            <h2>Reviews +icon</h2>
            <p>{this.state.details[0].results[0].author}</p>
            <p>{this.state.details[0].results[0].content}</p>
            <p>{this.state.details[0].results[1].author}</p>
            <p>{this.state.details[0].results[1].content}</p>
          </div>
          <div className="similar-movies">
            <h2>Users also liked:</h2>
            <img src={`https://image.tmdb.org/t/p/w500${recommendedMovie1}`}></img>
            <img src={`https://image.tmdb.org/t/p/w500${recommendedMovie2}`}></img>
          </div>
        </>
      );
    }
  }
}
