import React from 'react';
import HomeSearch from './home-search';
import MovieDetails from './movie-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'search',
      results: [],
      details: []
    };
    this.searchResults = this.searchResults.bind(this);
  }

  searchResults(query) {
    fetch('api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: query })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ results: data });
      });
  }

  getMovieDetails() {
    fetch('api/details')
      .then(res => res.json())
      .then(data => {
        this.setState({ details: data });
      });
  }

  changeView() {

  }

  render() {
    return <>
      <HomeSearch searchResults={this.searchResults} results={this.state.results}/>
      <MovieDetails results={this.state.results} getMovieDetails={this.getMovieDetails} />
    </>;
  }
}
