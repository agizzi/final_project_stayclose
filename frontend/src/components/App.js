import React, { Component } from 'react';
import LoginForm from './Login';
import RegistrationForm from './Registration';
import ProfilePage from './Profile';
import PrivateRoute from './helpers/PrivateRoute'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NewCircle from './NewCircle';

class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/register" component={RegistrationForm} />
          <PrivateRoute exact path="/new-circle" component={NewCircle} />
          <PrivateRoute exact path="/profile" component={ProfilePage} />
          <Route path="" component={LoginForm} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;