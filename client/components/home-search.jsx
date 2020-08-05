import React from 'react';
import MovieLongCard from './movie-longcard';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class HomeSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '', sortBy: 'popularity', dropdownOpen: false, dropDownShow: false };
    this.handleText = this.handleText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.sortCategory = this.sortCategory.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.searchResults(this.state.text, this.state.sortBy);
    this.setState({ dropDownShow: true });
  }

  handleText(event) {
    this.setState({ text: event.target.value });
  }

  toggleDropDown() {
    this.setState((prevState, props) => { return { dropdownOpen: !prevState.dropdownOpen }; });
  }

  sortCategory() {
    this.setState({ sortBy: event.target.id }, () => { this.props.searchResults(this.state.text, this.state.sortBy); });

  }

  render() {
    let show = 'none';
    if (this.state.dropDownShow) {
      show = 'block';
    }

    return (<>

      <form className="container">
        <h2 >Search Page</h2>
        <input onChange={this.handleText} value={this.state.text} className="form-control" placeholder="Search for Movies" id="name-line"></input>

        <button className="btn btn-primary" onClick={this.handleSubmit}>Search</button>

      </form>

      <div className="container">
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown} style={{ float: 'right', display: show }}>
          <DropdownToggle caret>
            Sort By
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => this.sortCategory()} id="popularity">Popularity</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => this.sortCategory()} id="rating">Rating</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => this.sortCategory()} id="date">Year</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        <div className="row">
          {this.props.results.map(item => (
            <MovieLongCard key={item.id} id={item.id} poster_path={item.poster_path} fullInfo={item} addItemToList={this.props.addItemToList} />
          ))}
        </div>
      </div>

    </>);
  }
}

export default HomeSearch;
