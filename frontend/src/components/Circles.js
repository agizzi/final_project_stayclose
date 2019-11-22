import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


class Circles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circles: []
    };
  }

  componentDidMount() {
    let config = {
      headers: {
        Authorization: localStorage.getItem("access_key")
      }
    }
    axios.get('http://127.0.0.1:8000/api/circles/', config, {
    }).then(res => {
      console.log(res)
      for (let i = 0; i < res.data.length; i++) {
        this.state.circles.push(<Link key={i}> {res.data[i].name} </Link>)
      }
    })
  }




  render() {
    return (
      <div className="circle-list">
        {this.state.circles}
      </div>
    );
  }
}

export default withRouter(Circles);

