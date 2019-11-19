import React, { Component } from 'react';
import Login from './Login';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from '../store';

class App extends Component {
  constructor(){
    super();
  }
  render() {
    return (
      <div><Login /></div>
    );
  }
}

export default App;