import React from 'react';
import MovieLongCard from './movie-longcard';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, TabContent, TabPane, Nav, NavItem, NavLink, Collapse, Button, CardBody, Card, ButtonGroup } from 'reactstrap';
import classnames from 'classnames';
import UserCard from './user-card';

class HomeSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      sortBy: 'popularity',
      dropdownOpen: false,
      dropDownShow: false,
      genreMenuOpen: false,
      genreSelected: new Set(),
      tab: '1',
      userText: ''
    };

    this.handleText = this.handleText.bind(this);
    this.handleText2 = this.handleText2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.sortCategory = this.sortCategory.bind(this);
    this.toggleGenreMenu = this.toggleGenreMenu.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.genreSelected.size <= 0) {
      this.props.searchResults(this.state.text, this.state.sortBy);
    } else {
      this.props.searchFilteredResults(this.state.text, this.state.sortBy, [...this.state.genreSelected]);
    }
    this.setState({ dropDownShow: true });
  }

  handleSubmit2(event) {
    event.preventDefault();
    this.props.searchUsers(this.state.userText);
  }

  handleText(event) {
    this.setState({ text: event.target.value });
  }

  handleText2(event) {
    this.setState({ userText: event.target.value });
  }

  toggleDropDown() {
    this.setState((prevState, props) => { return { dropdownOpen: !prevState.dropdownOpen }; });
  }

  toggleGenreMenu() {
    this.setState((prevState, props) => { return { genreMenuOpen: !prevState.genreMenuOpen }; });
  }

  genreButtonClick(selected) {

    if (!this.state.genreSelected.has(selected)) {
      this.setState((prevState, props) => { return { genreSelected: prevState.genreSelected.add(selected) }; });
    } else {

      this.setState((prevState, props) => {
        var newGenreSet = new Set(this.state.genreSelected);
        newGenreSet.delete(selected);
        return { genreSelected: newGenreSet };
      });
    }
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
    const genreList = require('./genres.json').genres; // from imported genres.json; list of objects {id: x, name, y}

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
              <div className="form-row flex-nowrap">
                <input onChange={this.handleText} value={this.state.text} className="form-control" placeholder="Search for Movies" id="name-line"></input>
                <button className="btn btn-primary" onClick={this.handleSubmit}>Search</button>
              </div>
            </form>
            <div className="container">
              <Button className="my-2 ml-1" color="secondary" onClick={this.toggleGenreMenu}>Genres</Button>
              <Collapse isOpen={this.state.genreMenuOpen}>
                <Card>
                  <CardBody className="px-3 pt-3 pb-1">
                    <ButtonGroup className="flex-wrap">
                      {genreList.map(genre => (
                        <Button outline color="info" key={genre.id} onClick={() => this.genreButtonClick(genre.id)} active={this.state.genreSelected.has(genre.id)}>{genre.name}</Button>
                      ))}
                    </ButtonGroup>
                    <p className="mini-text text-muted mb-0">Note: Results will include all genres selected</p>
                  </CardBody>
                </Card>
              </Collapse>
            </div>

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
                  <MovieLongCard key={item.id} id={item.id} poster_path={item.poster_path} fullInfo={item} changeView={this.props.changeView} getMovieDetails={this.props.getMovieDetails} addItemToList={this.props.addItemToList} lists={this.props.lists} />
                ))}
              </div>
            </div>
          </TabPane>
          <TabPane tabId="2">
            <form className="container">
              <h2 >Search Page</h2>
              <div className="form-row flex-nowrap">
                <input onChange={this.handleText2} value={this.state.userText} className="form-control" placeholder="Search for Users" id="user-line"></input>
                <button className="btn btn-primary" onClick={this.handleSubmit2}>Search</button>
              </div>
              <div className="row">
                {this.props.otherUsers.map((item, index) => (
                  <UserCard changeView={this.props.changeView} item={item} key={index} sendMessage={this.props.sendMessage} />
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
