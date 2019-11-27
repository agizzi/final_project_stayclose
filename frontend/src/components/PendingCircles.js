import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { request } from 'http';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


class PendingCircles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending_circles: []
    };

  }

  componentDidMount() {
    let config = {
      headers: {
        Authorization: `Token ${localStorage.getItem("access_key")}`
      }
    }

    axios.get('/api/pending-circles-by-user/', config, {
    }).then(res => {
      let pending_circles = res.data
      this.setState({ pending_circles: pending_circles })
      console.log(pending_circles)

    })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.pending_circles.length > 0 &&
          <div className="invites">
            <h3 className="invites-header">Your Circle Invitations:</h3>
            <div className="circle-list">
              {this.state.pending_circles.map(pending_circle => <Link className="pending-circle-name" to={'/pending_circle/' + pending_circle.id + '/' + pending_circle.name + '/' + this.props.userId} key={pending_circle.id}>{pending_circle.name}</Link>)}
            </div>
          </div>
        }
      </React.Fragment>
    );
  }
}


export default withRouter(PendingCircles);

