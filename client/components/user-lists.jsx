import React from 'react';
import ListCard from './list-card';

export default class UserLists extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.getUserLists();
  }

  render() {

    return (<>
      <h1>My Lists</h1>
      <div className="row justify-content-center">
        {this.props.lists.map(item => (
          <ListCard key={item.listId} id={item.listId} item={item} />
        ))}
      </div>

    </>);
  }
}
