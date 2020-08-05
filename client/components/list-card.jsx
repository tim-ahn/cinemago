import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class ListCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deleteModalShow: false };
    this.handleClick = this.handleClick.bind(this);
    this.deleteModal = this.deleteModal.bind(this);
  }

  handleClick(event) {

  }

  deleteModal() {
    this.setState((prevState, props) => { return { deleteModalShow: !prevState.deleteModalShow }; });
  }

  render() {
    if (this.props.item.type === 'custom') {
      return (<>
        <div className="col-11 m-2 border">
          <h3>{this.props.item.name}</h3>
          <button className="m-2">
            <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-file-earmark-plus-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M2 3a2 2 0 0 1 2-2h5.293a1 1 0 0 1 .707.293L13.707 5a1 1 0 0 1 .293.707V13a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3zm7 2V2l4 4h-3a1 1 0 0 1-1-1zm-.5 2a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V11a.5.5 0 0 0 1 0V9.5H10a.5.5 0 0 0 0-1H8.5V7z" />
            </svg>
          </button>
          <div>
            <Button color="danger" onClick={() => this.deleteModal()}>Delete Modal</Button>
            <Modal isOpen={this.state.deleteModalShow} toggle={() => this.deleteModal()} >
              <ModalBody>
                Are you sure you want to delete this list?
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={() => this.props.deleteList(this.props.item.listId)}>Delete List </Button>{' '}
                <Button color="secondary" onClick={() => this.deleteModal()}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
          {/* <button className="btn btn-danger" onClick={() => { this.props.deleteList(this.props.item.listId); }}>Delete This List</button> */}
        </div>
      </>);
    } else {
      return (<>

        <div className="col-11 m-2 border">
          <h5>{this.props.item.name}</h5>
          <button className="btn btn-secondary m-2">
            Add to List
          </button>
        </div>

      </>);
    }
  }
}
