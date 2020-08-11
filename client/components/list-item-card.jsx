import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

export default class ListItemCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      removeModalShow: false

    };
    this.removeModal = this.removeModal.bind(this);
  }

  removeModal() {
    this.setState((prevState, props) => { return { removeModalShow: !prevState.removeModalShow }; });
  }

  remove() {
    this.props.removeItemsInList(this.props.listId, this.props.id);
    this.removeModal();
  }

  render() {
    let posterURL;
    if (this.props.poster_path !== null) {
      posterURL = `https://image.tmdb.org/t/p/w500${this.props.poster_path}`;
    } else {
      posterURL = '../images/image_placeholder.png';
    }
    let year;
    if (this.props.fullInfo.releaseDate) {
      year = this.props.fullInfo.releaseDate.substr(0, 4);
    } else {
      year = 'Not Available';
    }

    return (<>
      <div >
        <div className="row m-2 border white">
          <div className="col m-2">
            <img src={posterURL} className="card-img" styles=""></img>
          </div>
          <div className="col m-4">
            <h1 className="card-title">{this.props.fullInfo.title}</h1>
            <h4 className="card-subtitle mb-2 text-muted">Release Year:{year}</h4>
            <p className="card-text">{this.props.fullInfo.description}</p>
            <button color="primary" onClick={() => this.props.changeView('review')} >Write a Review</button>
            <Button color="danger" onClick={() => this.removeModal()} className="m-2">Remove</Button>
            <Modal isOpen={this.state.removeModalShow} toggle={() => this.removeModal()} >
              <ModalBody>
                Are you sure you want to remove this movie?
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => this.removeModal()}>Cancel</Button>
                <Button color="danger" onClick={() => { this.remove(); }}>Remove From List</Button>{' '}
              </ModalFooter>
            </Modal>
          </div>

        </div>

      </div>

    </>);
  }
}
