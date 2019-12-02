import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

class PendingCircle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [],
      userId: "",
      circleId: this.props.circleId
    }
  }

  handleAccept = (event) => {

    event.preventDefault()
    let circle = this.props.circleId;
    let config = {
      headers: {
        Authorization: `Token ${localStorage.getItem("access_key")}`
      }
    }
    axios.get('/api/accept-circle-invite/', {
      params: {
        userId: this.state.userId,
        circleId: circle
      }
    }, config
    ).then(res => {
      console.log(res)
      this.props.history.push('/profile')
    })
  }


  handleDecline = (event) => {
    event.preventDefault()
    let user = this.props.userId;
    let circle = this.props.circleId;
    let config = {
      headers: {
        Authorization: `Token ${localStorage.getItem("access_key")}`
      }
    }
    axios.get('/api/decline-circle-invite/', {
      params: {
        userId: user,
        circleId: circle
      }
    }, config
    ).then(res => {
      console.log(res)
      this.props.history.push('/profile')
    })
  }



  componentDidMount() {
    let config = {
      headers: {
        Authorization: localStorage.getItem("access_key")
      }
    }

    axios.get('/api/user/', config, {
    }).then(res => {
      this.setState({ userId: res.data.id })
      console.log()
    })


    axios.get('/api/users-by-circle/', {
      params: {
        id: this.props.circleId
      }
    }, config
    ).then(res => {
      let members = res.data
      this.setState({ members: members })
    })
  }

  render() {
    return (
      <div className="invite-circle">
        <Navbar username={this.props.username} />
        <h3>You have been invited to join Circle Name by Circle Admin</h3>
        <h4> Would you like to join this circle?</h4>
        <button type="button" onClick={this.handleAccept}>Yes</button>
        <button type="button" onClick={this.handleDecline}>No</button>
      </div >

    );
  }

}

export default withRouter(PendingCircle);