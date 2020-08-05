import React from 'react';

export default class ListItemCard extends React.Component {

  render() {
    let posterURL;
    if (this.props.poster_path !== null) {
      posterURL = `https://image.tmdb.org/t/p/w500${this.props.poster_path}`;
    } else {
      posterURL = '../images/image_placeholder.png';
    }
    let year;
    if (this.props.fullInfo.releaseDate) {
      year = this.props.fullInfo.releaseDate.substr(0, 4);
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
            <h1 className="card-title">{this.props.fullInfo.title}</h1>
            <h4 className="card-subtitle mb-2 text-muted">Release Year:{year}</h4>
            <p className="card-text">{this.props.fullInfo.description}</p>
          </div>
        </div>

      </div>

    </>);
  }
}
