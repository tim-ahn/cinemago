import React from 'react';
import ListCard from './list-card';
import MessageCard from './message-card';

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
            return <MessageCard deleteMessage={this.props.deleteMessage} key={index} id={item.messageId} item={item} />;
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
