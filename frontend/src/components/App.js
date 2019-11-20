import React, { Component } from 'react';
import LoginForm from './Login';
import RegistrationForm from './Registration';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../store';

class App extends Component {
  constructor(){
    super();
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/register" component={RegistrationForm} />
          <Route path = "" component={LoginForm} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;