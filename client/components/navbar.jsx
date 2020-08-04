import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    // this.props.
  }

  render() {

    return (<>
      <nav className="navbar fixed-bottom navbar-dark bg-dark p-2" id="navbar">
        <div className="w-100 row justify-content-around">
          <i className="fas fa-home text-white"></i>
          <i className="fas fa-search text-white"></i>
          <i className="fas fa-heart text-white"></i>
          <i className="fas fa-user text-white"></i>
        </div>
      </nav>

    </>);
  }
}

export default Navbar;
