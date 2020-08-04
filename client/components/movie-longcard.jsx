import React from 'react';

class MovieLongCard extends React.Component {

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
      <div >
        <div className="row m-2 border">
          <div className="col m-2">
            <img src={posterURL} className="card-img" styles=""></img>
          </div>
          <div className="col m-2">
            <h1 className="card-title">{this.props.fullInfo.original_title}</h1>
            <h4 className="card-subtitle mb-2 text-muted">Popularity:{this.props.fullInfo.popularity}</h4>
            <h4 className="card-subtitle mb-2 text-muted">Rating:{this.props.fullInfo.vote_average}</h4>
            <p className="card-text">{this.props.fullInfo.overview}</p>
          </div>
        </div>

      </div>

    </>);
  }
}

export default MovieLongCard;
