// import React, { Component } from 'react';
// import { Link, withRouter } from 'react-router-dom';
// import axios from 'axios';
// import { request } from 'http';
// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// class Toolbar extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {

//     }
//   }



//   render() {
//     return (
//       <div className="postButton">
//         <button type="button" className="add"><Link className="nav" to={'/post/' + this.props.circleId + '/' + this.props.circleName + '/' + localStorage.getItem('username')} >Add Post</Link></button>
//         <button type="button" className="delete" circleId={this.props.circleId} onClick={this.handleSubmit}>Delete Circle</button>
//       </div>
//     )
//   }

// }

// export default withRouter(Toolbar)