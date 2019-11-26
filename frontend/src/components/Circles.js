import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { request } from 'http';
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

    console.log(this.props.userId)
    let config = {
      headers: {
        Authorization: `Token ${localStorage.getItem("access_key")}`
      }
    }

    axios.get('http://127.0.0.1:8000/api/circles/', config, {
    }).then(res => {
      let circles = res.data
      this.setState({ circles: circles })
      console.log(circles)

    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="circle-list">
          {this.state.circles.map(circle => <Link className="circle-name" to={'/circle/' + circle.id + '/' + circle.name + '/' + this.props.userId} key={circle.id}>{circle.name}</Link>)}
        </div>
      </React.Fragment>
    );
  }
}


export default withRouter(Circles);

