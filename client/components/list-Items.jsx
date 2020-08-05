import React from 'react';
import ListItemCard from './list-item-card';

export default class ListItems extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    if (this.props.viewListItems.length > 0) {
      return (<>

        <div className="container">
          <div className="row">
            <h2>{this.props.listName}</h2>
            {this.props.viewListItems.map(item => {
              return <ListItemCard key={item.movieId} id={item.movieId} poster_path={item.posterURL} fullInfo={item} />;
            })}
          </div>
        </div>
      </>);
    } else {
      return (<>
        <div className="container">
          <div className="row">
            <h2>{this.props.listName}</h2>
          </div>
        </div>
      </>);
    }
  }
}
