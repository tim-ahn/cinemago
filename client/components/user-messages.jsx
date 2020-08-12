import React from 'react';
import MessageCard from './message-card';
import { CSSTransitionGroup } from 'react-transition-group';

export default class UserMessages extends React.Component {

  componentDidMount() {
    this.props.getMessages();
  }

  render() {
    if (this.props.messages.length > 0) {
      return (<>
        <div className="container mt-2 justify-content-center mb-5">
          <h1>My Messages</h1>
          <CSSTransitionGroup
            key={'my-reviews'}
            transitionName="example"
            transitionAppear={false}
            transitionAppearTimeout={500}
            transitionEnter={true}
            transitionLeave={true}
            style={{ width: '100%' }}>
            {this.props.messages.map((item, index) => {
              return <MessageCard deleteMessage={this.props.deleteMessage} key={index} id={item.messageId} item={item} />;
            })}
          </CSSTransitionGroup>
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
