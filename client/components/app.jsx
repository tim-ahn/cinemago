import React from 'react';
import HomeSearch from './home-search';
import HomePage from './home-page';
import Navbar from './navbar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
      results: [],
      trending: []
    };
    this.searchResults = this.searchResults.bind(this);
    this.getTrending = this.getTrending.bind(this);
    this.changeView = this.changeView.bind(this);
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

  changeView(newPage) {
    this.setState({ view: newPage });
  }

  render() {
    let pageView;
    if (this.state.view === 'home') {
      pageView = <HomePage getTrending={this.getTrending} results={this.state.trending} />;
    } else if (this.state.view === 'search') {
      pageView = <HomeSearch searchResults={this.searchResults} results={this.state.results} />;
    }
    return <>
      {pageView}

      <Navbar changeView={this.changeView}/>
    </>;
  }
}
