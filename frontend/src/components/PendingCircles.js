import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class PendingCircles extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.pendingCircles.length > 0 &&
          <div className="invites">
            <h2 className="invites-header">Your Circle Invitations:</h2>
            <div className="circle-list">
              {this.props.pendingCircles.map(pending_circle => <Link className="pending-circle-name" to={'/pending-circle/' + pending_circle.id + '/' + pending_circle.name + '/'} key={pending_circle.id}>{pending_circle.name}</Link>)}
            </div>
            <hr></hr>
          </div>
        }
      </React.Fragment>
    );
  }
}


export default withRouter(PendingCircles);

