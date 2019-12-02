import React, { Component } from 'react';
import LoginForm from './Login';
import RegistrationForm from './Registration';
import ProfilePage from './Profile';
import PrivateRoute from './helpers/PrivateRoute'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CircleFeed from './CircleFeed';
import NewContent from './NewContent';
import PendingCircle from './PendingCircle';


class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/register" component={RegistrationForm} />
          <PrivateRoute path="/circle/:circleId/:circleName/:userId" component={CircleFeed} />
          <PrivateRoute path="/post/:circleId/:circleName/:userId/:memberName" component={NewContent} />
          <PrivateRoute path="/pending-circle/:pendingCircleId/:pendingCircleName/" component={PendingCircle} />
          <PrivateRoute exact path="/profile" component={ProfilePage} />
          <Route path="" component={LoginForm} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;