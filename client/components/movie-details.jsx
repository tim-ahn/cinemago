import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

export default class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieIsToggleOn: false,
      addModalShow: false,
      dropdownOpen: false,
      heartIconColor: '',
      eyeIconColor: '',
      listIconColor: '',
      listId: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.addRemoveMovieToList = this.addRemoveMovieToList.bind(this);
    this.addModal = this.addModal.bind(this);
    this.addMovieToCustomList = this.addMovieToCustomList.bind(this);
  }

  componentDidMount() {
    fetch(`/api/listItems/${this.props.lists[0].listId}`)
      .then(res => res.json())
      .then(data => {
        const include = data.filter(item => item.movieId === this.props.details[1].id);
        if (include.length >= 1) {
          this.setState({
            movieIsToggleOn: true,
            heartIconColor: 'text-danger'
          });
        }
      });
    fetch(`/api/listItems/${this.props.lists[1].listId}`)
      .then(res => res.json())
      .then(data => {
        const include = data.filter(item => item.movieId === this.props.details[1].id);
        if (include.length >= 1) {
          this.setState({
            movieIsToggleOn: true,
            eyeIconColor: 'text-success'
          });
        }
      });
    this.setState({ listId: this.props.lists[0].listId });
  }

  handleClick(event) {
    this.props.changeView('search');
  }

  addModal() {
    this.setState((prevState, props) => { return { addModalShow: !prevState.addModalShow }; });
  }

  addRemoveMovieToList(event) {
    const button = event.target.getAttribute('value');
    const movieIsToggleOn = this.state.movieIsToggleOn;

    if (button === 'heart') {
      if (movieIsToggleOn === false) {
        this.props.addItemToList(this.props.lists[0].listId, this.props.details[1]);
        this.setState({
          movieIsToggleOn: true,
          heartIconColor: 'text-danger'
        });
      } else {
        this.props.removeItemsInListMovieDetails(this.props.lists[0].listId, this.props.details[0].id);
        this.setState({
          movieIsToggleOn: false,
          heartIconColor: ''
        });
      }
    } else {
      if (movieIsToggleOn === false) {
        this.props.addItemToList(this.props.lists[1].listId, this.props.details[1]);
        this.setState({
          movieIsToggleOn: true,
          eyeIconColor: 'text-success'
        });
      } else {
        this.props.removeItemsInListMovieDetails(this.props.lists[1].listId, this.props.details[0].id);
        this.setState({
          movieIsToggleOn: false,
          eyeIconColor: ''
        });
      }
    }
  }

  addMovieToCustomList() {
    this.props.addItemToList(this.state.listId, this.props.details[1]);
    this.addModal();
  }

  // first need to create a modal to add movies to existing lists
  // then option to create your own list
  // addMovieToCustomList() {
  //   const modalToggleOn = this.state.modalToggleOn;

  //   this.props.addItemToList(this.props.lists[])
  // }

  render() {

    let modal = null;
    const backDropPath = this.props.details[1].backdrop_path;
    const posterPath = this.props.details[1].poster_path;
    const youtubeURL = this.props.details[3].results[0].key;

    let usersAlsoLiked = null;
    let reviews = null;
    const recommendedMoviesArray = this.props.details[2].results;
    const reviewsArray = this.props.details[0].results;

    const newMoviesArray = recommendedMoviesArray.filter(movies => this.props.details[2].results);
    const newReviewsArray = reviewsArray.filter(reviews => this.props.details[0].results);

    if (this.state.modalToggleOn === true) {
      modal = <>
        <Modal isOpen={this.state.addModalShow} toggle={() => this.addModal()}>
          <ModalBody>

            <label htmlFor="lists">Which list would you like to add to?</label>

            <select name="lists" id="userLists" onChange={() => this.setState({ listId: parseInt(event.target.value) })}>
              {this.props.lists.map(item => {
                return <option key={item.listId} value={item.listId}> {item.name}</option>;
              })}
            </select>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.addModal()}>Cancel</Button>
            <Button color="primary" onClick={() => { this.add(); }}>Add to List</Button>{' '}
          </ModalFooter>
        </Modal>
      </>;
    }

    if (newMoviesArray < 1) {
      usersAlsoLiked = null;
    } else {
      const recommendedMovie1 = this.props.details[2].results[0].poster_path;
      const recommendedMovie2 = this.props.details[2].results[1].poster_path;
      const recommendedMovie3 = this.props.details[2].results[2].poster_path;
      usersAlsoLiked =
        <>
          <h2>Users also liked:</h2>
          <div className="row justify-content-center px-2">
            <div className="col-4 border">
              <img src={`https://image.tmdb.org/t/p/w500${recommendedMovie1}`} style={{ width: '100%' }}></img>
            </div>
            <div className="col-4 border">
              <img src={`https://image.tmdb.org/t/p/w500${recommendedMovie2}`} style={{ width: '100%' }}></img>
            </div>
            <div className="col-4 border">
              <img src={`https://image.tmdb.org/t/p/w500${recommendedMovie3}`} style={{ width: '100%' }}></img>
            </div>
          </div>
        </>;
    }

    if (newReviewsArray < 1) {
      reviews =
        <div className="row">
          <p>No Reviews</p>
        </div>;
    } else {
      const author1 = this.props.details[0].results[0].author;
      const author2 = this.props.details[0].results[1].author;
      const review1 = this.props.details[0].results[0].content;
      const review2 = this.props.details[0].results[1].content;
      reviews =
        <>
          <div className="row reviews">
            <h2>Reviews <img src="../images/plus-sign-icon.png"></img> </h2>
          </div>
          <div className="row">

            <div className="col-6 border">
              <p>{author1}</p>
              <p>{review1}</p>
            </div>

            <div className="col-6 border">
              <p>{author2}</p>
              <p>{review2}</p>
            </div>
          </div>
        </>;
    }

    return (
      <>
        <div className="container mb-5">
          <div className="row">
            <div onClick={() => this.handleClick()}>
              <img className="position-absolute" src="../images/less-than-icon.png" ></img>
              <img src={`https://image.tmdb.org/t/p/w500${backDropPath}`} style={{ width: '100%', height: '100%' }}></img>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <h2 className="title">{this.props.details[1].title}</h2>
              <p>Average Rating: {this.props.details[1].vote_average}</p>

              <div className="d-flex justify-content-between">
                <button>
                  <a href={`https://www.youtube.com/watch?v=${youtubeURL}`}> <img src="../images/play-icon.png"></img>Trailer </a>
                </button>
                <div className="pt-2">
                  {this.props.details[1].runtime} mins
                </div>
              </div>

              <div>
                <i className={`far fa-heart fa-3x ${this.state.heartIconColor}`} onClick={() => this.addRemoveMovieToList(event)} value="heart"></i>
                <i className={`far fa-eye fa-3x ${this.state.eyeIconColor}`} onClick={() => this.addRemoveMovieToList(event)} value="eye"></i>
                <i className="far fa-list-alt fa-3x" onClick={() => this.addModal()} value="list" ></i>
              </div>

              <Modal isOpen={this.state.addModalShow} toggle={() => this.addModal()} >
                <ModalBody>

                  <label htmlFor="lists">Which list would you like to add to?</label>

                  <select name="lists" id="userLists" onChange={() => this.setState({ listId: parseInt(event.target.value) })}>
                    {this.props.lists.map(item => {
                      return <option key={item.listId} value={item.listId}> {item.name}</option>;
                    })}
                  </select>
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={() => this.addModal()}>Cancel</Button>
                  <Button color="primary" onClick={() => this.addMovieToCustomList()}>Add to List</Button>
                </ModalFooter>
              </Modal>

            </div>

            <div className="col-6">
              <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} style={{ width: '100%' }}></img>
            </div>

          </div>

          <p>{this.props.details[1].overview}</p>

          {reviews}
          {usersAlsoLiked}
          {modal}
        </div>
      </>
    );
  }
}
