import React, { Component } from 'react';
import LoginForm from './Login';
import RegistrationForm from './Registration';
import ProfilePage from './Profile';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

class App extends Component {
  constructor(){
    super();
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/register" component={RegistrationForm} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route path = "" component={LoginForm} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;