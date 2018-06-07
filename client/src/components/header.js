import React, { Component } from 'react';
import DearLogo from '../images/DearLogo.png';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="logo">
          <img src={DearLogo} alt="" />
        </div>
        <div className="header-navs">
          <Link className="header-nav-item" to='/profile'>PROFILE</Link>
          <Link className="header-nav-item" to='/matches'>MATCHES</Link>
          <Link className="header-nav-item" to='/about'>ABOUT</Link>
          <Link className="header-nav-item" to='/contact'>CONTACT</Link>
          <Link className="header-nav-item" to='/logout'>LOGOUT</Link>
        </div>
      </div>
    );
  }
}

export default Header;
