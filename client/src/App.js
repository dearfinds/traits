import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Profile from './components/profile';
import ContactUs from './components/contactUs';
import Matches from './components/matches';
import AboutDear from './components/aboutDear';
import BetaAccess from  './components/betaAccess';
import 'react-input-range/lib/css/index.css';
import 'react-select/dist/react-select.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', verified: false };
  }

  accessChange(email) {
    this.setState({ email, verified: true });
  }

  render() {
    if (!this.state.verified) {
      return <BetaAccess verified={this.state.verified} onChange={(email)=>this.accessChange(email)} />;
    }
    const hoc_profile = () => <Profile email={this.state.email} />;
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={hoc_profile} />
            <Route path='/profile' component={hoc_profile} />
            <Route path='/matches' component={Matches} />
            <Route path='/about' component={AboutDear} />
            <Route path='/contact' component={ContactUs} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
