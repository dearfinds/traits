import React, { Component } from 'react';
import DearLogo from '../images/DearLogo.png';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'PROFILE'
    };
  }

  render() {
    const that = this;
    const HOCLink = (PassedComponent) => ({ title, ...rest }) => {
      return (
        <div className="header-nav-item">
          <PassedComponent
            className={"header-nav-content" + (that.state.selected === title ? " header-nav-content--selected" : "") }
            onClick={e => that.setState({ selected: title })} {...rest}>
            {title}
          </PassedComponent>
        </div>
      );
    }
    const LinkWrap = HOCLink(Link);
    return (
      <div className="header">
        <div className="logo">
          <img src={DearLogo} alt="" />
        </div>
        <div className="header-navs">
          <LinkWrap title="PROFILE" to="/profile" />
          <LinkWrap title="MATCHES" to="/matches" />
          <LinkWrap title="ABOUT" to="/about" />
          <LinkWrap title="CONTACT" to="/contact" />
          <LinkWrap title="LOGOUT" to="/logout" />
        </div>
      </div>
    );
  }
}

export default Header;
