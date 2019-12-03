import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class Greeting extends Component {
  render() {
    return (
      <h3 className="greeting">
        Hi, {this.props.username}!
      </h3>
    );
  }
}


export default withRouter(Greeting);