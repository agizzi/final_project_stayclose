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
      circles: [],
      currentUser: ''
    };
  }

  componentDidMount() {
    let config = {
      headers: {
        Authorization: localStorage.getItem("access_key")
      }
    }

    axios.get('http://127.0.0.1:8000/api/users/', config, {
    }).then(res => {
      let users = res.data
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === this.props.username) {
          this.setState({ currentUser: users[i].id })
        }


      }
    }),


      axios.get('http://127.0.0.1:8000/api/circles/', config, {
      }).then(res => {
        let circles = res.data
        let myCircles = [];
        for (let i = 0; i < circles.length; i++) {
          for (let j = 0; j < circles[i].members.length; j++) {
            if (circles[i].admin === this.state.currentUser || circles[i].members[j] === this.state.currentUser) {
              myCircles.push(circles[i])
              console.log(circles[i].admin)
            }
          }

        }


        this.setState({ circles: myCircles })

      })
  }

  render() {
    return (
      <React.Fragment>\

        <div className="circle-list">
          {this.state.circles.map(circle => <Link className="circle" to={'/circle/' + circle.id + '/' + circle.name} key={circle.id}>{circle.name}</Link>)}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Circles);

