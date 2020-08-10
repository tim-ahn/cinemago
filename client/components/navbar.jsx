import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { current: 'home' };
  }

  handleClick(event) {
    const target = event.currentTarget.getAttribute('value');
    this.setState({ current: target });
    this.props.changeView(target);
  }

  render() {
    var homeColor = 'text-white';
    var searchColor = 'text-white';
    var heartColor = 'text-white';
    var userColor = 'text-white';
    var messageColor = 'text-white';
    if (this.state.current === 'home') {
      homeColor = 'text-primary';
    } else if (this.state.current === 'search') {
      searchColor = 'text-success';
    } else if (this.state.current === 'list') {
      heartColor = 'text-danger';
    } else if (this.state.current === 'user') {
      userColor = 'text-warning';
    } else if (this.state.current === 'messages') {
      messageColor = 'text-info';
    }
    return (<>

      <nav className="navbar fixed-bottom navbar-dark bg-dark p-2" id="navbar">
        <div className="w-100 row justify-content-around">
          <i onClick={this.handleClick} className={`fas fa-home ${homeColor} pointer`} value="home"></i>
          <i onClick={this.handleClick} className={`fas fa-search ${searchColor} pointer`} value="search"></i>
          <i onClick={this.handleClick} className={`fas fa-heart ${heartColor} pointer`} value="list"></i>
          <i onClick={this.handleClick} className={`fas fa-envelope ${messageColor} pointer`} value="messages"></i>
          <i onClick={this.handleClick} className={`fas fa-user ${userColor} pointer`} value="user"></i>
        </div>
      </nav>

    </>);
  }
}

export default Navbar;
