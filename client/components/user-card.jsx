import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalShow: false, message: '' };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState((prevState, props) => { return { modalShow: !prevState.modalShow }; });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.toggleModal();
    this.props.sendMessage(this.props.item.userId, this.state.message);
    this.setState({ message: '' });
  }

  handleMessage(event) {
    this.setState({ message: event.target.value });
  }

  render() {
    return (<>
      <div className="row m-2 border container white">
        <div className="col m-2">
          <img className='rounded mx-auto d-block' src={(this.props.item.imageURL === null) ? '../images/image_placeholder.png' : this.props.item.imageURL}></img>
        </div>
        <div className="col m-4">
          <h1>{this.props.item.name}</h1>
          <p>{this.props.item.email}</p>
          <button type="button" className="btn btn-outline-danger" onClick={() => this.toggleModal()}>Send Message</button>
        </div>
        <Modal isOpen={this.state.modalShow} toggle={() => this.toggleModal()} >
          <ModalHeader toggle={() => this.toggleModal()}>Message</ModalHeader>
          <ModalBody>
            <form className="container">
              <textarea onChange={this.handleMessage} value={this.state.message} className="form-control" placeholder="Write your message here" id="listName"></textarea>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggleModal()}>Cancel</Button>
            <Button color="btn btn-outline-danger" onClick={() => this.handleSubmit(event)}>Send Message</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>

    </>);
  }
}
