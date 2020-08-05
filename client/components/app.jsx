import React from 'react';
import HomeSearch from './home-search';
import HomePage from './home-page';
import Navbar from './navbar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'search',
      results: [],
      trending: []
    };
    this.searchResults = this.searchResults.bind(this);
    this.getTrending = this.getTrending.bind(this);
  }

  searchResults(query, category) {
    fetch('api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: query })
    })
      .then(res => res.json())
      .then(data => {
        if (category === 'popularity') {
          data.sort(function (a, b) {
            return b.popularity - a.popularity;
          });
        } else if (category === 'rating') {
          data.sort(function (a, b) {
            return b.vote_average - a.vote_average;
          });
        } else {
          data.sort(function (a, b) {
            return parseInt(b.release_date.substr(0, 4)) - parseInt(a.release_date.substr(0, 4));
          });
        }
        this.setState({ results: data });
      });
  }

  getTrending(category) {
    fetch('api/home', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ category: category })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ trending: data });
      });
  }

  changeView() {

  }

  render() {
    return <>
      <HomeSearch searchResults={this.searchResults} results={this.state.results} />
      {/* <HomePage getTrending={this.getTrending} results={this.state.trending} /> */}
      <Navbar />
    </>;
  }
}
