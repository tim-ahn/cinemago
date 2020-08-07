import React from 'react';
import MovieLongCard from './movie-longcard';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

class HomeSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '', sortBy: 'popularity', dropdownOpen: false, dropDownShow: false, tab: '1', userText: '' };
    this.handleText = this.handleText.bind(this);
    this.handleText2 = this.handleText2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.sortCategory = this.sortCategory.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.searchResults(this.state.text, this.state.sortBy);
    this.setState({ dropDownShow: true });
  }

  handleSubmit2(event) {
    event.preventDefault();
    this.props.searchUsers(this.state.userText);
  }

  handleText(event) {
    console.log(event.target.value);
    this.setState({ text: event.target.value });
  }

  handleText2(event) {
    this.setState({ userText: event.target.value });
  }

  toggleDropDown() {
    this.setState((prevState, props) => { return { dropdownOpen: !prevState.dropdownOpen }; });
  }

  sortCategory() {
    this.setState({ sortBy: event.target.id }, () => { this.props.searchResults(this.state.text, this.state.sortBy); });

  }

  switchTab(tab) {
    if (this.state.tab !== tab) this.setState({ tab: tab });
  }

  render() {
    let show = 'none';
    if (this.state.dropDownShow) {
      show = 'block';
    }

    return (<>
      <div className="container">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.tab === '1' })}
              onClick={() => { this.switchTab('1'); }}
            >
              Movies
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.tab === '2' })}
              onClick={() => { this.switchTab('2'); }}
            >
              Users
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.tab}>
          <TabPane tabId="1">
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
                  <MovieLongCard key={item.id} id={item.id} poster_path={item.poster_path} fullInfo={item} addItemToList={this.props.addItemToList} lists={this.props.lists} />
                ))}
              </div>
            </div>
          </TabPane>
          <TabPane tabId="2">
            <form className="container">
              <h2 >Search Page</h2>
              <input onChange={this.handleText2} value={this.state.userText} className="form-control" placeholder="Search for Users" id="user-line"></input>

              <button className="btn btn-primary" onClick={this.handleSubmit2}>Search</button>
              <div className="row">
                {this.props.otherUsers.map((item, index) => (
                  <div className="border" key={index}>
                    Hi
                  </div>
                ))}
              </div>
            </form>
          </TabPane>
        </TabContent>
      </div>

    </>);
  }
}

export default HomeSearch;
