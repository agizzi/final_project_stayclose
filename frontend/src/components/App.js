import React, { Component } from 'react';
import LoginForm from './Login';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from '../store';

class App extends Component {
  constructor(){
    super();
  }
  render() {
    return (
      <div><LoginForm /></div>
    );
  }
}

export default App;