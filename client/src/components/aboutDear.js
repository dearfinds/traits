import React, { Component } from 'react';
import * as EmailValidator from 'email-validator';
import { addHost } from '../utils/index';
import * as axios from 'axios';

class AboutDear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: '',
    };
  }

  emailOnChange(event) {
    this.setState({ email: event.target.value });
  }

  submitEmail() {
    if (EmailValidator.validate(this.state.email)) {
      this.setState({ error: '' });
      axios.post(addHost() + "/api/emailList", { email: this.state.email })
        .then(res => console.log(`\nSuccessfully added email`))
        .catch(err => console.log(err));
    } else {
      this.setState({ error: 'Please enter valid email' });
    }
  }

  render() {
    return <div className="app-content text-content">
      <p>
        Dear is a partner finding platform that imbibes the science of marriage.
        We believe that matching people based on their personal traits proves more effective than matching people by any other social, physical, societal, ethnic characteristics.
      </p>
      <p>
        Keeping this in mind, we ask you the most important questions first - 'What are you as a person?' and 'What kind of a person do you want as your partner?'
      </p>
      <p>
        We are providing access to select customers in beta right now and intend to open up the platform late this year to public use. If you are interested in signing up for Dear, please subscribe to us.
      </p>
      {
        this.state.error ?
        <div className="survey-errors-wrapper">
          <ul>
            <li>{this.state.error}</li>
          </ul>
        </div>
        : null
      }
      <div className="know-more-signup-submit">
        <input type="email" className="input" placeholder="Email"
          value={this.state.email} onChange={e => this.emailOnChange(e)}/>
        <button className="primary-button"
          onClick={e => this.submitEmail()}>Keep me posted</button>
      </div>
    </div>;
  }
}

export default AboutDear;
