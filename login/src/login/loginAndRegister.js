import React, { Component } from 'react';
import LoginDetails from './loginDetails';
import axios from 'axios';
import * as _ from 'lodash';
import * as DearLogo from '../images/DearLogo.png';
import * as DearText from '../images/DearText.png';

class LoginAndRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      email: '',
      password: '',
      submitForm: 'Login',
    };
    this.getOther = this.getOther.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  valChange(field, e) {
    this.setState({
      [field]: e.target.value,
    });
  }

  formChange(label) {
    this.setState({ submitForm: label, errors: [] });
  }

  getOther() {
    return this.state.submitForm === "Login" ? "Register" : "Login";
  }

  submitForm() {
    if (this.state.submitForm === "Login") {
      axios.post("/api/login", {
        email: this.state.email,
        password: this.state.password,
      }).then(res => {
        // console.log(`\nLogin Successful`);
        // that.props.history.push('/');
        window.location.assign('/');
      }).catch(err => {
        console.log(`\nLogin Failed`);
        this.setState({ errors: ['Invalid email/password combination.']});
      });
    }
    else if (this.state.submitForm === "Register") {
      axios.post("/api/register", {
        email: this.state.email,
        password: this.state.password,
      }).then(res => {
        // console.log(`\nRegister Successful||${JSON.stringify(res.data)}`);
        // that.props.history.push('/');
        window.location.assign('/');
      }).catch(err => {
        if (_.get(err, 'response.data.error') === 'User with email exists') {
          this.setState({ errors: ['Email already used - Please login.'] });
          return;
        }

        console.log(`\nRegister Failed||${JSON.stringify(err.message)}`);
      });
    }
  }

  render() {
    return (
      <div className="login-app-content">
        <div className="login-logo">
          <div className="login-logo-img">
            <img src={DearLogo} alt="" />
          </div>
          <div className="login-logo-text">
            <img src={DearText} alt="" />
          </div>
        </div>
        <div className="login-register-wrapper">
          <div className="login-content">
            <div className="login-register-toggle-wrapper">
              <a href="" className={ this.state.submitForm === "Login" ?
                  "login-register-toggle-input--selected" : "login-register-toggle-input"}
                onClick={(e) => {e.preventDefault(); this.formChange("Login")}}
                >Login</a>
              <a href="" className={ this.state.submitForm === "Register" ?
                  "login-register-toggle-input--selected" : "login-register-toggle-input"}
                onClick={(e) => {e.preventDefault(); this.formChange("Register")}}
                >Sign up</a>
            </div>
            <LoginDetails
              value={{ email: this.state.email, password: this.state.password }}
              emailChange={e => this.valChange('email', e)}
              passwordChange={e => this.valChange('password', e)}
              onSubmit={this.submitForm}
              submitDisplay={this.state.submitForm}
            />
            {
              _.isEmpty(this.state.errors) ? null :
              <div className="errors-content">
                <ul>
                {_.map(this.state.errors, (error, index) => {
                  return <li key={index}>{error}</li>;
                })}
                </ul>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default LoginAndRegister;
