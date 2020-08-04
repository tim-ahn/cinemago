import React from 'react';
import MovieCard from './movie-card';

class HomeSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.handleText = this.handleText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.searchResults(this.state.text);
  }

  // handleSearch(results) {
  //   this.setState({
  //     results: results,
  //     text: ''
  //   });
  // }

  handleText(event) {
    this.setState({ text: event.target.value });
  }

  render() {
    let cards;
    if (this.props.results !== undefined) {
      cards =
        this.props.results.map(item => (
          <MovieCard key={item.id} poster_path={item.poster_path} />
        ));

    }
    return (<>

      <form className="container">
        <h2 >Search</h2>

        <input onChange={this.handleText} value={this.state.text} className="form-control" placeholder="Search for Movies" id="name-line"></input>

        <button className="btn btn-primary" onClick={this.handleSubmit}>Search</button>

      </form>
      {cards}
    </>);
  }
}

export default HomeSearch;
