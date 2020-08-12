import React from 'react';

class OtherProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      profile: {},
      lists: [],
      favorites: []
    };
    this.goBack = this.goBack.bind(this);
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

  goBack() {
    this.props.changeView('search');
  }

  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>;
    } else if (this.state.favorites.length > 0) {
      return <>
        <div className="container mb-5">
          <button className="btn btn-secondary" onClick={this.goBack}>Go Back</button>
          <div className="d-flex flex-column justify-content-center">
            <h3 className='text-center'>{this.state.profile.name}</h3>
            <img className='rounded mx-auto d-block' src={(this.state.profile.imageURL === null) ? '../images/image_placeholder.png' : this.state.profile.imageURL}></img>
            <div className="border border-secondary p-2 w-50 mx-auto mt-3 white">
              <div className="row justify-content-between px-3">
                <p className="font-weight-bold">Bio:</p>
              </div>
              <p className="text-muted px-1">{this.state.profile.bio}</p>
            </div>
            <div className="border border-secondary p-2 w-50 mx-auto mt-3 white">
              <p className="font-weight-bold">Some movies {this.state.profile.name} favorited:</p>
              <div>
                {this.state.favorites.slice(0, 2).map((item, index) => {
                  let posterURL;
                  if (this.props.poster_path !== null) {
                    posterURL = `https://image.tmdb.org/t/p/w500${item.posterURL}`;
                  } else {
                    posterURL = '../images/image_placeholder.png';
                  }
                  return (<>
                    <div className="col-3 m-2" key={index}>
                      <img src={posterURL} className="card-img"></img>
                    </div>

                  </>);
                })
                }

              </div>
            </div>
            <div className="border border-secondary p-2 w-50 mx-auto mt-3 white">
              <p className="font-weight-bold">Reviews:</p>
            </div>

          </div>

        </div>

      </>;
    } else {
      return <>
        <div className="container mb-5">
          <button className="btn btn-secondary" onClick={this.goBack}>Go Back</button>
          <div className="d-flex flex-column justify-content-center">
            <h3 className='text-center'>{this.state.profile.name}</h3>
            <img className='rounded mx-auto d-block' src={(this.state.profile.imageURL === null) ? '../images/image_placeholder.png' : this.state.profile.imageURL}></img>
            <div className="border border-secondary p-2 w-50 mx-auto mt-3 white">
              <div className="row justify-content-between px-3">
                <p className="font-weight-bold">Bio:</p>
              </div>
              <p className="text-muted px-1">{this.state.profile.bio}</p>
            </div>
            <div className="border border-secondary p-2 w-50 mx-auto mt-3 white">
              <p className="font-weight-bold">Some movies {this.state.profile.name} favorited:</p>
              <div>

              </div>
            </div>
            <div className="border border-secondary p-2 w-50 mx-auto mt-3 white">
              <p className="font-weight-bold">Reviews:</p>
            </div>

          </div>

        </div>

      </>;
    }
  }
}

export default OtherProfile;
