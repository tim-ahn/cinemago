import React from 'react';
import ListCard from './list-card';

export default class UserMessages extends React.Component {

  componentDidMount() {
    this.props.getMessages();
  }

  render() {
    if (this.props.messages.length > 0) {
      return (<>
        <div className="container mt-2 justify-content-center">
          <h1>My Messages</h1>
          {this.props.messages.map((item, index) => {
            return (<div key={index} className="border p-2 m-2 white">
              <h5>From: {item.name}</h5>
              <p>Content: {item.content}</p>
            </div>);
          })}
        </div>
      </>);
    } else {
      return (<>
        <div className="container mt-2 justify-content-center">
          <h1>My Messages</h1>
          <p>No messages</p>
        </div>
      </>);
    }

  }
}
