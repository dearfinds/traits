import { Component } from 'react';
import axios from 'axios';

class Logout extends Component {
  constructor(props) {
    super(props);
    axios.post('/api/logout', {}).then(res => {
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
