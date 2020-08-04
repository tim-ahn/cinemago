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
        <div className="dropdown show">
          <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown link
          </a>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a className="dropdown-item" href="#">Action</a>
            <a className="dropdown-item" href="#">Another action</a>
            <a className="dropdown-item" href="#">Something else here</a>
          </div>
        </div>
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
