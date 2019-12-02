import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { request } from 'http';
import PendingCircle from './PendingCircle';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


class PendingCircles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending_circles: [],
      userId: this.props.userId

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
      // console.log(pending_circles)

    })
  }

  render() {

    const { match: { params } } = this.props;

    return (
      <React.Fragment>
        {/* <PendingCircle username={this.state.username} userId={params.userId} circleId={params.circleId} /> */}
        {this.state.pending_circles.length > 0 &&
          <div className="invites">
            <h2 className="invites-header">Your Circle Invitations:</h2>
            <div className="circle-list">
              {this.state.pending_circles.map(pending_circle => <Link className="pending-circle-name" to={'/pending-circle/' + pending_circle.id + '/' + pending_circle.name + '/'} key={pending_circle.id}>{pending_circle.name}</Link>)}
            </div>
            <hr></hr>
          </div>
        }
      </React.Fragment>
    );
  }
}


export default withRouter(PendingCircles);

