import { Component } from 'react';
import axios from 'axios';
import { addHost } from '../utils';

class Logout extends Component {
  constructor(props) {
    super(props);
    axios.post(addHost() + '/api/logout', {}).then(res => {
      window.location.assign('/login');
    }).catch(err => {
      console.log(`\nFailed to login`);
    });
  }

  render() {
    return null;
  }
}

export default Logout;
