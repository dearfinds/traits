import React, { Component } from 'react';

class LoginDetails extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="login-wrapper">
        <input type="email" value={this.props.email} className="login-input"
          onChange={this.props.emailChange} placeholder="Email" />
        <input type="password" value={this.props.password} className="login-input"
          onChange={this.props.passwordChange} placeholder="Password" />
        <button className="login-input-button primary-button" type="submit">Next</button>
      </form>
    );
  }
}

export default LoginDetails;
