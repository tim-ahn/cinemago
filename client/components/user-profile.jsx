import React from 'react';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, profile: {}, editBio: false };
    this.openBioEdit = this.openBioEdit.bind(this);
    this.saveBioEdit = this.saveBioEdit.bind(this);
    this.onBioChange = this.onBioChange.bind(this);
  }

  componentDidMount() {
    // fetch user profile endpoint
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
        }
      ).catch(err => console.error(err));
  }

  openBioEdit() {
    this.setState({ editBio: true });
  }

  saveBioEdit() {
    const fetchURL = '/api/users/' + this.props.userId;
    fetch(fetchURL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ bio: this.state.profile.bio })
    })
      .then(result => this.setState({ editBio: false }))
      .catch(err => console.error(err));
  }

  onBioChange() {
    const newProfile = this.state.profile;
    newProfile.bio = event.target.value;
    this.setState({ profile: newProfile });
  }

  render() {
    // todo: change view when clicking reviews, lists, settings
    let bio;
    if (this.state.editBio) {
      bio = <>
        <form onSubmit={this.saveBioEdit}>
          <textarea onChange={this.onBioChange} value={this.state.profile.bio} className="form-control" id="bio-form" rows="3"></textarea>
          <div className="row flex-row-reverse">
            <button className="btn btn-primary mt-1 mr-3">Save</button>
          </div>
        </form>
      </>;
    } else {
      bio = <p className="text-muted px-1">{this.state.profile.bio}</p>;
    }

    if (this.state.loading) {
      return <h2>Loading...</h2>;
    } else {
      return <>
        <div className="container">
          <div className="d-flex flex-column justify-content-center">
            <h3 className='text-center'>{this.state.profile.name}</h3>
            <img className='rounded mx-auto d-block' src={(this.state.profile.imageURL === null) ? '../images/image_placeholder.png' : this.state.profile.imageURL}></img>
            <div className="border border-secondary p-2 w-50 mx-auto mt-3 white">
              <div className="row justify-content-between px-3">
                <p className="font-weight-bold">Bio:</p>
                <p onClick={this.openBioEdit} className="mini-text text-muted pointer"><u>Edit</u></p>
              </div>
              {bio}
            </div>
            <div className="border border-secondary p-2 w-50 mx-auto mt-3 white">
              <p className="font-weight-bold">Reviews</p>
              <p className="font-weight-bold">Lists</p>
              <p className="font-weight-bold">Settings</p>
            </div>
          </div>
        </div>

      </>;
    }
  }
}

export default UserProfile;
