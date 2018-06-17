import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Profile from './components/profile';
import ContactUs from './components/contactUs';
import Matches from './components/matches';
import AboutDear from './components/aboutDear';
import BetaAccess from  './components/betaAccess';
import Logout from './components/logout';
// import LoginAndRegister from './components/login/loginAndRegister';
import 'react-input-range/lib/css/index.css';
import 'react-select/dist/react-select.css';
import './App.css';

const headerFooterHoc = (PassedComponent) => (props) => {
  return (
    <div>
      <Header />
      <PassedComponent {...props} />
      <Footer />
    </div>
  );
}
const HFRouteWrap = headerFooterHoc(Route);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', verified: false };
  }

  accessChange(email) {
    console.log(`\nComing into to associate email|`);
    this.setState({ email, verified: true });
  }

  render() {
    const HOCProfile = () => <Profile /*email={this.state.email}*/ />;
    const HOCBetaAccess = () => <BetaAccess
      verified={this.state.verified} onChange={email => this.accessChange(email)} />
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            {/* <HFRouteWrap exact path='/' component={HOCProfile} /> */}
            <HFRouteWrap path="/verifyBeta" component={HOCBetaAccess} />
            <HFRouteWrap path='/profile' component={HOCProfile} />
            <HFRouteWrap path='/matches' component={Matches} />
            <HFRouteWrap path='/about' component={AboutDear} />
            <HFRouteWrap path="/contact" component={ContactUs} />
            <HFRouteWrap path="/logout" component={Logout} />
            <HFRouteWrap path='*' component={HOCProfile} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
