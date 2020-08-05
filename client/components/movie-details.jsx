import React from 'react';

export default class MovieDetails extends React.Component {

  componentDidMount() {
  }

  render() {
    const backDrop = '/6KQ9CWz76m3pT8K0yE08y72nNwD.jpg';
    return (
      <>
        <img src={`https://image.tmdb.org/t/p/w500${backDrop}`}></img>
        <div className="title">{this.props.results.title}</div>

      </>
    );
  }
}
