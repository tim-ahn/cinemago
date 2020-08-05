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
          <button className="btn btn-secondary m-2">
            Add to List
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
