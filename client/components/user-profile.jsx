import React from 'react';
import { Collapse, CardBody, Card } from 'reactstrap';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      profile: {},
      editBio: false,
      selectedImage: null,
      fileError: null,
      fileOptionOpen: false
    };
    this.openBioEdit = this.openBioEdit.bind(this);
    this.saveBioEdit = this.saveBioEdit.bind(this);
    this.onBioChange = this.onBioChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.onImageSelect = this.onImageSelect.bind(this);
    this.toggleUploadOption = this.toggleUploadOption.bind(this);
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
    event.preventDefault();
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

  toggleUploadOption() {
    this.setState((prevState, props) => { return { fileOptionOpen: !prevState.fileOptionOpen }; });
  }

  uploadImage(event) {
    event.preventDefault();
    if (this.state.selectedImage === null) {
      return;
    }
    const fetchURL = '/api/users/image/' + this.props.userId;
    const formData = new FormData();
    formData.append('image',
      this.state.selectedImage,
      this.state.selectedImage.name);
    const options = {
      method: 'POST',
      body: formData
    };
    fetch(fetchURL, options)
      .then(result => result.json())
      .then(data => {
        const updatedProfile = { ...this.state.profile };
        updatedProfile.imageURL = data.imageURL;
        this.setState({ profile: updatedProfile });
      })
      .catch(err => console.error(err));
  }

  onImageSelect(event) {
    const image = event.target.files[0];
    const maxImageSize = 2 * 1000 * 1000;// 2mb
    if (image.size > maxImageSize) {
      this.setState({ fileError: 'Image size must be less than 2MB', selectedImage: null });
    } else if (!['image/jpeg', 'image/png'].includes(image.type)) {
      this.setState({ fileError: 'File must be a .jpg or .png image', selectedImage: null });
    } else {
      this.setState({ fileError: null, selectedImage: image });
    }

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
        <div className="container mb-5">
          <div>
            <div className="w-50 mx-auto">
              <h3 className="text-center">{this.state.profile.name}</h3>
            </div>
            <img className='profile-img rounded mx-auto d-block' src={(this.state.profile.imageURL === null) ? '../images/image_placeholder.png' : this.state.profile.imageURL}></img>
            <div className="border  p-2 w-75 mx-auto mt-3 white">
              <div className="row justify-content-between px-3">
                <p className="font-weight-bold">Bio:</p>
                <p onClick={this.openBioEdit} className="mini-text text-muted pointer"><u>Edit</u></p>
              </div>
              {bio}
            </div>
            <div className="border p-2 w-75 mx-auto mt-3 white">
              <button className="btn btn-outline-dark" onClick={() => this.props.viewReviews()}>My reviews</button>

            </div>
            <div className="border p-2 w-75 mx-auto mt-3 white">
              <button onClick={this.toggleUploadOption} className="btn btn-outline-dark">Update Profile Image</button>
              <Collapse isOpen={this.state.fileOptionOpen}>
                <Card>
                  <CardBody>
                    {this.state.fileError && <p className="text-danger">{this.state.fileError}</p>}
                    <form onSubmit={this.uploadImage}>
                      <div className="row mt-2">
                        <input type="file" name="image" onChange={this.onImageSelect}></input>
                        <button className="btn btn-success">Upload</button>
                      </div>
                      <p className="mini-text text-muted m-0">File Limit of 2MB. Use only .jpg or .png files </p>
                    </form>
                  </CardBody>
                </Card>
              </Collapse>
            </div>
          </div>

        </div>

      </>;
    }
  }
}

export default UserProfile;
