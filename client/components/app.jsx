import React from 'react';
import HomeSearch from './home-search';
import HomePage from './home-page';
import WriteReview from './write-review';
import Navbar from './navbar';
import UserLists from './user-lists';
import MovieDetails from './movie-details';
import UserProfile from './user-profile';
import ListItems from './list-Items';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
      results: [],
      trending: [],
      lists: [],
      details: [],
      viewListItems: [],
      currentListName: '',
      currentListId: null,
      userId: 1 // Hardcoded for now, will be set after user logs in and will be helpful in fetching to backend
    };
    this.searchResults = this.searchResults.bind(this);
    this.getTrending = this.getTrending.bind(this);
    this.getUserLists = this.getUserLists.bind(this);
    this.createNewList = this.createNewList.bind(this);
    this.changeView = this.changeView.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.getMovieDetails = this.getMovieDetails.bind(this);
    this.addItemToList = this.addItemToList.bind(this);
    this.getItemsInList = this.getItemsInList.bind(this);
    this.removeItemsInList = this.removeItemsInList.bind(this);
  }

  componentDidMount() {
    this.getUserLists();
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

  getMovieDetails(movieId) {
    fetch(`/api/details/${movieId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ details: data });
      })
      .then(data => this.changeView('details'));
  }

  addItemToList(listId, movieDetails) {
    fetch(`/api/lists/add/${listId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        movieId: movieDetails.id,
        title: movieDetails.title,
        description: movieDetails.overview,
        posterURL: movieDetails.poster_path,
        release_date: movieDetails.release_date
      })
    })
      .then(res => res.json())
      .then(data => {
        return data;
      });
  }

  getItemsInList(listId, listName) {
    console.log('hi');
    fetch(`/api/listItems/${listId}`)
      .then(res => res.json())
      .then(data =>
        this.setState({ viewListItems: data })
      ).then(data => this.changeView('listContent'))
      .then(data => this.setState({ currentListName: listName, currentListId: listId }))
      .then(data => console.log(this.state.currentListId));
  }

  removeItemsInList(listId, movieId) {
    fetch(`/api/listItems/${listId}/${movieId}`, {
      method: 'DELETE'
    }).then(res => res.json())
      .then(data => this.getItemsInList(listId, this.state.currentListName));
  }

  changeView(newPage) {
    this.setState({ view: newPage });
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    // let pageView;
    // if (this.state.view === 'home') {
    //   pageView = <HomePage getTrending={this.getTrending} results={this.state.trending} getMovieDetails={this.getMovieDetails}/>;
    // } else if (this.state.view === 'search') {
    //   pageView = <HomeSearch searchResults={this.searchResults} results={this.state.results} changeView={this.changeView} getMovieDetails={this.getMovieDetails} addItemToList={this.addItemToList} lists={this.state.lists}/>;
    //   // <HomeSearch searchResults={this.searchResults} results={this.state.results} />;
    // } else if (this.state.view === 'list') {
    //   pageView = <UserLists getUserLists={this.getUserLists} lists={this.state.lists} createNewList={this.createNewList} deleteList={this.deleteList} changeView={this.changeView} getItemsInList={this.getItemsInList} />;
    // } else if (this.state.view === 'details') {
    //   pageView = <MovieDetails changeView={this.changeView} details={this.state.details}/>;
    // } else if (this.state.view === 'user') {
    //   pageView = <UserProfile userId={this.state.userId} changeView={this.changeView} />; // insert userId when relavent
    // } else if (this.state.view === 'listContent') {
    //   pageView = <ListItems viewListItems={this.state.viewListItems} listName={this.state.currentListName} listId={this.state.currentListId} changeView={this.changeView} removeItemsInList={this.removeItemsInList} />;
    // }
    // return <>

    //   {pageView}
    //   {/* <UserLists getUserLists={this.getUserLists} lists={this.state.lists} createNewList={this.createNewList} deleteList={this.deleteList} changeView={this.changeView} />; */}
    //   {/* <HomeSearch searchResults={this.searchResults} results={this.state.results} addItemToList={this.addItemToList} lists={this.state.lists} /> */}
    //   <Navbar changeView={this.changeView} />
    // </>;

    return (
      <MovieDetails/>
    );
  }
}
