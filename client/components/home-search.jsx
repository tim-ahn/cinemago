import React from 'react';
import MovieLongCard from './movie-longcard';

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

  handleText(event) {
    this.setState({ text: event.target.value });
  }

  render() {
    console.log(this.props.results);

    return (<>

      <form className="container">
        <h2 >Search Page</h2>
        <input onChange={this.handleText} value={this.state.text} className="form-control" placeholder="Search for Movies" id="name-line"></input>

        <button className="btn btn-primary" onClick={this.handleSubmit}>Search</button>

      </form>

      <div className="container">
        <select className="dropdown" name="sort" id="sortDropdown">
          <option value="popularity">Popularity</option>
          <option value="rating">Rating</option>
          <option value="releaseDate">Release Date</option>
        </select>
        <div className="row">
          {this.props.results.map(item => (
            <MovieLongCard key={item.id} id={item.id} poster_path={item.poster_path} fullInfo={item} />
          ))}
        </div>
      </div>

    </>);
  }
}

export default HomeSearch;
