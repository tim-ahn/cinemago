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
    let year;
    if (this.props.fullInfo.release_date) {
      year = this.props.fullInfo.release_date.substr(0, 4);
    } else {
      year = 'Not Available';
    }
    return (<>
      <div >
        <div className="row m-2 border">
          <div className="col m-2">
            <img src={posterURL} className="card-img" styles=""></img>
          </div>
          <div className="col m-4">
            <h1 className="card-title">{this.props.fullInfo.original_title}</h1>
            <h4 className="card-subtitle mb-2 text-muted">Popularity:{this.props.fullInfo.popularity}</h4>
            <h4 className="card-subtitle mb-2 text-muted">Rating:{this.props.fullInfo.vote_average}</h4>
            <h4 className="card-subtitle mb-2 text-muted">Release Year:{year}</h4>
            <p className="card-text">{this.props.fullInfo.overview}</p>
            <button>
              <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-file-earmark-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5v-1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h5v2.5A1.5 1.5 0 0 0 10.5 6H13v2h1V6L9 1z" />
                <path fillRule="evenodd" d="M13.5 10a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z" />
                <path fillRule="evenodd" d="M13 12.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0v-2z" />
              </svg>
            </button>
          </div>
        </div>

      </div>

    </>);
  }
}

export default MovieLongCard;
