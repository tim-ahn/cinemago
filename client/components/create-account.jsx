import React from 'react';

export default class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const property = event.target.name;
    this.setState({
      [property]: event.target.value
    });
  }

  handleSubmit(event, info) {
    event.preventDefault();
    this.props.signUp(this.state.name, this.state.email, this.state.password);
    this.setState({
      name: '',
      email: '',
      password: ''
    });
  }

  render() {
    return (<>
      <div className="container centered">
        <div className="center2 mb-4 border p-5 bg-white">
          <h1 className="loginTitle">CINEMAGO</h1>
          <h3 className="loginTitle">Create an Account</h3>
          <div className="login my-auto">
            <form className="form-login" onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="name"
                value={this.state.name}
                onChange={this.handleChange}
                className="m-1 w-100 border"
                name="name"
                style={{ backgroundColor: 'rgb(250, 250, 250)' }}
              />
              <input
                type="text"
                placeholder="email"
                value={this.state.email}
                onChange={this.handleChange}
                className="m-1 w-100 border"
                name="email"
                style={{ backgroundColor: 'rgb(250, 250, 250)' }}
              />
              <input
                type="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.handleChange}
                className="m-1 w-100 border"
                name="password"
                style={{ backgroundColor: 'rgb(250, 250, 250)' }}
              />
              <button className="btn btn-secondary m-1" >sign-up</button>
            </form>
          </div>
          <div>
            <button className="btn btn-secondary m-1" onClick={() => this.props.changeView('login')}>Back to Log In</button>
          </div>
        </div>
      </div>
    </>);
  }
}
