import React, { Component } from 'react';
import * as _ from 'lodash';
import * as axios from 'axios';
import { addHost } from '../utils/index';

class BetaAccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      error: '',
    };
  }

  codeOnChange(event) {
    this.setState({ code: event.target.value });
  }

  verifyCode() {
    if (_.isEmpty(this.state.code)) {
      this.setState({ error: 'Enter valid code' });
      return
    }
    this.setState({ error: '' });
    axios.post(addHost() + "/api/verifyBeta", { code: this.state.code })
      .then(res => {
        const { onChange } = this.props;
        // console.log(`\nRes${JSON.stringify(res)}`);
        onChange(res.data.email);
      })
      .catch(err => {
        this.setState({ 'error': 'Invalid Code Entered. Please reachout to dearfinds@gmail.com' })
      });
  }

  render() {
    return <div className="app-content beta-access">
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
        <input type="text" className="input" placeholder="Enter referral code for beta access"
          value={this.state.code} onChange={e => this.codeOnChange(e)}/>
        <button className="primary-button"
          onClick={e => this.verifyCode()}>Verify!</button>
      </div>
    </div>;
  }
}

export default BetaAccess;
