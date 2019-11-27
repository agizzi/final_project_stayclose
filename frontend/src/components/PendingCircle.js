import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class PendingCircle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: []
    }
  }

  componentDidMount() {
    let config = {
      headers: {
        Authorization: localStorage.getItem("access_key")
      }
    }
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
        <h3>You have been invited to join {this.props.pending_circle.name} by {this.props}</h3>
      </div>
    );
  }

}

export default withRouter(Circle);