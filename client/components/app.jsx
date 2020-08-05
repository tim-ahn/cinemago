import React from 'react';
import HomeSearch from './home-search';
import HomePage from './home-page';
import WriteReview from './write-review';

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
      {/* <HomeSearch searchResults={this.searchResults} results={this.state.results} /> */}
      {/* <HomePage getTrending={this.getTrending} results={this.state.trending} /> */}
      <WriteReview />
    </>;
  }
}
