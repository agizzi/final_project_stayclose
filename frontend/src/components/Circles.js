import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


class Circles extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="circle-list">
          {this.props.circles.map(circle => <Link className="circle-name" to={'/circle/' + circle.id + '/' + circle.name + '/' + this.props.userId} key={circle.id}>{circle.name}</Link>)}
        </div>
      </React.Fragment>
    );
  }
}


export default withRouter(Circles);

