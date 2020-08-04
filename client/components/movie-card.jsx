import React from 'react';

class MovieCard extends React.Component {

  handleClick(event) {
    // this.props.
  }

  render() {

    return (<>
      <div className ="w-25" styles={{ backgroundImage: `url(https://image.tmdb.org/t/p/original+${this.props.poster_path})` }}>

      </div>

    </>);
  }
}

export default MovieCard;
