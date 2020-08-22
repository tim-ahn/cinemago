import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
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
    if (this.props.current === 'home') {
      homeColor = 'text-primary';
    } else if (this.props.current === 'search') {
      searchColor = 'text-success';
    } else if (this.props.current === 'list') {
      heartColor = 'text-danger';
    } else if (this.props.current === 'user') {
      userColor = 'text-warning';
    } else if (this.props.current === 'messages') {
      messageColor = 'text-info';
    }
    return (<>

      <nav className="navbar fixed-bottom navbar-dark bg-dark p-3" id="navbar">
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
