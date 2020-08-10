import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class ListCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deleteModalShow: false, searchModalShow: false };
    this.handleClick = this.handleClick.bind(this);
    this.deleteModal = this.deleteModal.bind(this);
    this.searchModal = this.searchModal.bind(this);
  }

  handleClick(event) {

  }

  deleteModal() {
    this.setState((prevState, props) => { return { deleteModalShow: !prevState.deleteModalShow }; });
  }

  searchModal() {
    this.setState((prevState, props) => { return { searchModalShow: !prevState.searchModalShow }; });
  }

  render() {
    if (this.props.item.type === 'custom') {
      return (<>
        <div className="col-11 m-2 border white">
          <h3>{this.props.item.name}</h3>
          <div>
            <Button color="secondary" onClick={() => this.searchModal()} className="m-2">Add To list</Button>
            <Modal isOpen={this.state.searchModalShow} toggle={() => this.searchModal()} >
              <ModalBody>
                Leave this page and search for movies?
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => this.searchModal()}>Cancel</Button>
                <Button color="primary" onClick={() => { this.props.changeView('search'); }}>Go to Search Page </Button>{' '}
              </ModalFooter>
            </Modal>
          </div>
          <button className="btn btn-secondary m-2" onClick={() => { this.props.getItemsInList(this.props.item.listId); }}>View List Content</button>
          <div>
            <Button color="danger" className="m-2" onClick={() => this.deleteModal()}>Delete List</Button>
            <Modal isOpen={this.state.deleteModalShow} toggle={() => this.deleteModal()} >
              <ModalBody>
                Are you sure you want to delete this list?
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" className="m-2" onClick={() => this.deleteModal()}>Cancel</Button>
                <Button color="danger" onClick={() => this.props.deleteList(this.props.item.listId)}>Delete List </Button>{' '}
              </ModalFooter>
            </Modal>
          </div>
        </div>
      </>);
    } else {
      return (<>

        <div className="col-11 m-2 border white">
          <h3>{this.props.item.name}</h3>
          <div>
            <Button color="secondary" onClick={() => this.searchModal()} className="m-2">Add To list</Button>
            <Modal isOpen={this.state.searchModalShow} toggle={() => this.searchModal()} >
              <ModalBody>
                Leave this page and search for movies?
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => this.searchModal()}>Cancel</Button>
                <Button color="primary" onClick={() => { this.props.changeView('search'); }}>Go to Search Page </Button>{' '}
              </ModalFooter>
            </Modal>
          </div>
          <button className="btn btn-secondary m-2" onClick={() => { this.props.getItemsInList(this.props.item.listId, this.props.item.name); }}>View List Content</button>
        </div>

      </>);
    }
  }
}
