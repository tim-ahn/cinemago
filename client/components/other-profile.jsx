import React from 'react';
import MovieSlide from './movie-slide';

class OtherProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      profile: {},
      reviews: [],
      lists: [],
      favorites: []
    };

    this.getOtherUserReviews = this.getOtherUserReviews.bind(this);

  }

  componentDidMount() {
    // fetch user profile endpoint
    // todo: fetch movies and reviews
    const fetchURL = '/api/users/' + this.props.userId;
    fetch(fetchURL)
      .then(
        result => result.json()
      ).then(
        result => {
          this.setState({
            loading: false,
            profile: result
          });
          return result;
        }
      ).then(data => {
        fetch(`/api/lists/${data.userId}`)
          .then(res => res.json())
          .then(data => {
            this.setState({ lists: data });
            return data;
          }).then(data => {
            fetch(`/api/listItems/${this.state.lists[0].listId}`)
              .then(res => res.json())
              .then(data => {
                if (Array.isArray(data)) {
                  this.setState({ favorites: data });
                }
              }
              );
          });
      }).catch(err => console.error(err));
  }

  getOtherUserReviews(userId) {
    fetch(`/api/reviews/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          this.setState({ reviews: data });
          this.props.getOtherUserReviews(data);
        }
      })
      .then(data => this.props.changeView('otherReviews'));
  }

  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>;
    } else {
      return <>
        <div className="container mb-5">
          <button className="btn btn-outline-danger" onClick={this.props.goBack}>Go Back</button>
          <div className="d-flex flex-column justify-content-center">
            <h3 className='text-center'>{this.state.profile.name}</h3>
            <img className='profile-img rounded mx-auto d-block' src={(this.state.profile.imageURL === null) ? '../images/image_placeholder.png' : this.state.profile.imageURL}></img>
            <div className="border border-secondary p-2 w-100 mx-auto mt-3 white">
              <div className="row justify-content-between px-3">
                <p className="font-weight-bold">Bio:</p>
              </div>
              <p className="text-muted px-1">{this.state.profile.bio}</p>
            </div>
            <div className="border border-secondary p-2 w-100 mx-auto mt-3 white">
              <p className="font-weight-bold">Favorite Movies:</p>
              <MovieSlide getMovieDetails={this.props.getMovieDetails} movies={this.state.favorites}/>
            </div>
            <div className="border border-secondary p-2 w-100 mx-auto mt-3 white">
              <p className="font-weight-bold">Reviews:</p>
              <button className="btn btn-outline-dark" onClick={() => this.getOtherUserReviews(this.props.userId)}>Reviews</button>
            </div>

          </div>

        </div>

      </>;
    }
  }
}

export default OtherProfile;
