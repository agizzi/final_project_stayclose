import React, { Component } from 'react';
import LoginForm from './Login';
import RegistrationForm from './Registration';
import ProfilePage from './Profile';
import PrivateRoute from './helpers/PrivateRoute'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CircleFeed from './CircleFeed';
import NewContent from './NewContent';


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
          <PrivateRoute path="/circle/:circleId/:circleName" component={CircleFeed} />
          <PrivateRoute path="/post/:circleId/:circleName/:memberName" component={NewContent} />
          <PrivateRoute exact path="/profile" component={ProfilePage} />
          <Route path="" component={LoginForm} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;