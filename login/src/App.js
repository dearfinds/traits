import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginAndRegister from './login/loginAndRegister';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={LoginAndRegister} />
            <Route path="*" component={LoginAndRegister} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
