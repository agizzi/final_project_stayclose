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
      circleId: "",
      username: "",
      circleAdmin: "",
      adminUsername: "",
      circleName: ""
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
        circleId: this.state.circleId
      }
    }, config
    ).then(res => {
      console.log(res)
      this.props.history.push('/profile')
    })
  }


  handleDecline = (event) => {
    event.preventDefault()
    let config = {
      headers: {
        Authorization: `Token ${localStorage.getItem("access_key")}`
      }
    }
    axios.get('/api/decline-circle-invite/', {
      params: {
        userId: this.state.userId,
        circleId: this.state.circleId
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
      this.setState({ username: res.data.username })
      // console.log(res)
    })


    axios.get('/api/circles/' + this.props.match.params.pendingCircleId, {
    }, config
    ).then(res => {
      console.log(res)
      this.setState({ circleId: res.data.id })
      this.setState({ circleAdmin: res.data.admin })
      this.setState({ circleName: res.data.name })
      console.log(this.state.circleAdmin)
      axios.get('/api/users/' + this.state.circleAdmin, config, {
      }).then(res => {
        this.setState({ adminUsername: res.data.username })
        console.log(res)
        // console.log(this.state.adminUsername)
      })
    })



  }

  render() {
    return (
        <div>
        <Navbar username={this.state.username} />
        <div className="invite-circle">
          <div className="pending">
            <h3>You have been invited to join {this.state.circleName}, which is owned by {this.state.adminUsername}.</h3>
            <h4> Would you like to join this circle?</h4>
            </div >
            <div className="pending-buttons">
              <button type="button" onClick={this.handleAccept}>Yes</button>
              <button type="button" onClick={this.handleDecline}>No</button>
            </div>
        </div>
      </div>
    );
  }

}

export default withRouter(PendingCircle);