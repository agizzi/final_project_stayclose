import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import NavBar from './Navbar';

class GetUserName extends Component {
  constructor() {
    super()

    this.state = {
      username: ''
    };
  }

  let config = {
  headers: {
    headerName: localStorage.getItem("authkey")
  }
}
componentDidMount() {
  axios.get('http://127.0.0.1:8000/api/users/1/', config, {
    username: this.state.username
  }).then(res => {
    console.log(res.data)
  })
}

render() {
  return (
    <NavBar username={this.state.username} />
  );
}
}

export default GetUserName;