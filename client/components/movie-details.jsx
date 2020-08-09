import React from 'react';

export default class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
      heartIconColor: '',
      eyeIconColor: '',
      listIconColor: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.addMovieToFavorites = this.addMovieToFavorites.bind(this);
  }

  handleClick(event) {
    this.props.changeView('search');
  }

  addMovieToFavorites() {
    const toggleOn = this.state.isToggleOn;
    if (toggleOn === false) {
      this.props.addItemToList(1, this.props.details[1]);
      this.setState({
        isToggleOn: true,
        heartIconColor: 'text-danger'
      });
    } else {
      this.props.removeItemsInList(1, this.props.details[0].id);
      this.setState({
        isToggleOn: false,
        heartIconColor: ''
      });
    }
  }

  render() {
    const backDropPath = this.props.details[1].backdrop_path;
    const posterPath = this.props.details[1].poster_path;
    const youtubeURL = this.props.details[3].results[0].key;

    let usersAlsoLiked = null;
    let reviews = null;
    const recommendedMoviesArray = this.props.details[2].results;
    const reviewsArray = this.props.details[0].results;

    const newMoviesArray = recommendedMoviesArray.filter(movies => this.props.details[2].results);
    const newReviewsArray = reviewsArray.filter(reviews => this.props.details[0].results);

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
                <i className={`far fa-heart ${this.state.heartIconColor}`} onClick={() => this.addMovieToFavorites()}></i>
                <i className="far fa-eye" onClick={() => this.props.addItemToList(2, this.props.details[1])}></i>
                <i className="far fa-list-alt" ></i>
              </div>
            </div>

            <div className="col-6">
              <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} style={{ width: '100%' }}></img>
            </div>

          </div>

          <p>{this.props.details[1].overview}</p>

          {reviews}
          {usersAlsoLiked}

        </div>
      </>
    );
  }
}
