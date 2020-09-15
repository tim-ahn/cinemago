import React from 'react';

export default class Header extends React.Component {
  render() {
    return (<>
      <div className="container">
        <h1 className="loginTitle w-100">
          <button className="btn btn-light border float-right" onClick={() => this.props.logOut()} >Sign Out</button>
        </h1>
      </div>
      <br></br>
    </>);
  }
}
