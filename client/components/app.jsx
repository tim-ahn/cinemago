import React from 'react';
import HomeSearch from './home-search';
import MovieDetails from './movie-details';
import HomePage from './home-page';
import Navbar from './navbar';
import UserLists from './user-lists';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
      results: [],
      trending: [],
      lists: [],
      userId: 1 // Hardcoded for now, will be set after user logs in and will be helpful in fetching to backend
    };
    this.searchResults = this.searchResults.bind(this);
    this.getTrending = this.getTrending.bind(this);
    this.getUserLists = this.getUserLists.bind(this);
    this.createNewList = this.createNewList.bind(this);
    this.changeView = this.changeView.bind(this);
    this.deleteList = this.deleteList.bind(this);
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

  getUserLists() {

    fetch(`/api/lists/${this.state.userId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ lists: data });
      });
  }

  createNewList(name) {
    fetch(`api/lists/${this.state.userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name })
    })
      .then(res => res.json())
      .then(data => {
        this.getUserLists();
      });
  }

  deleteList(listId) {
    fetch(`/api/lists/${listId}`, {
      method: 'DELETE'

    }).then(res => res.json())
      .then(data => {
        this.getUserLists();
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
    } else if (this.state.view === 'list') {
      pageView = <UserLists getUserLists={this.getUserLists} lists={this.state.lists} createNewList={this.createNewList} deleteList={this.deleteList} />;
    }
    return <>
      {pageView}
      {/* <UserLists getUserLists={this.getUserLists} lists={this.state.lists} createNewList={this.createNewList} deleteList={this.deleteList} /> */}
      <Navbar changeView={this.changeView} />
    </>;
  }
}
