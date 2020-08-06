import React from 'react';
import ListItemCard from './list-item-card';

export default class ListItems extends React.Component {

  render() {
    if (this.props.viewListItems.length > 0) {
      return (<>

        <div className="container">
          <div className="row mt-1">
            <h2>{this.props.listName}</h2>
            <button className="btn-secondary" onClick={() => { this.props.changeView('list'); }}>Go Back to Lists</button>
            {this.props.viewListItems.map(item => {
              return <ListItemCard key={item.movieId} id={item.movieId} poster_path={item.posterURL} fullInfo={item} removeItemsInList={this.props.removeItemsInList} listId={this.props.listId} />;
            })}
          </div>
        </div>
      </>);
    } else {
      return (<>
        <div className="container">
          <div className="row mt-1">
            <h2>{this.props.listName}</h2>
            <button className="btn-secondary" onClick={() => { this.props.changeView('list'); }}>Go Back to Lists</button>
          </div>
        </div>
      </>);
    }
  }
}
