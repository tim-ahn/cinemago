import React from 'react';
import MovieCard from './movie-card';

class MovieSlide extends React.Component {

  render() {
    if (!Array.isEmpty(this.props.movies)) {
      return (<>
        <div className="row flex-nowrap movie-slide px-3 m-auto">
          {this.props.movies.map(movie =>
            <MovieCard key={movie.movieId} movieCardId={movie.movieId} poster_path={movie.posterURL} getMovieDetails={this.props.getMovieDetails}/>)}
        </div>
      </>);
    }
  }
}

export default MovieSlide;
