import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
import Circle from './Circle';
import ReactModal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
};
class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      showLeaveModal: false,
      members: "",
      isAdmin: false,
      pending_member: ""
    }
    this.handleOpenAddModal = this.handleOpenAddModal.bind(this);
    this.handleCloseAddModal = this.handleCloseAddModal.bind(this);
    this.handleOpenLeaveModal = this.handleOpenLeaveModal.bind(this);
    this.handleCloseLeaveModal = this.handleCloseLeaveModal.bind(this);
    this.handleAddSubmit = this.handleAddSubmit.bind(this);
    this.handleLeaveSubmit = this.handleLeaveSubmit.bind(this);
  }

  handleOpenAddModal() {
    this.setState({ showAddModal: true });
  }

  handleCloseAddModal() {
    this.setState({ showAddModal: false });
  }

  handleOpenLeaveModal() {
    this.setState({ showLeaveModal: true });
  }

  handleCloseLeaveModal() {
    this.setState({ showLeaveModal: false });
  }

  handleAddSubmit() {
    event.preventDefault()
    let circleId = this.props.circleId
    console.log(circleId)
    let config = {
      headers: {
        Authorization: `Token ${localStorage.getItem("access_key")}`
      }
    }
    axios.get('/api/user-by-username/', {
      params: {
        entered_usernames: this.state.members
      }
    }, config).then(res => {
      console.log(res.data)
      if (res.data.length > 0) {
        for (let i = 0; i < res.data.length; i++) {
          let userId = res.data[i].id
          console.log("circleID =" + circleId)
          console.log("userId =" + userId)
          axios.get('/api/invite-member/', {
            params: {
              userId: userId,
              circleId: circleId
            }, config,
          }).then(res => {
            console.log(res)
          })
        }

      }
    })
  }

  handleLeaveSubmit() {
    let user = this.props.userId;
    let circle = this.props.circleId;
    event.preventDefault()
    let config = {
      headers: {
        Authorization: `Token ${localStorage.getItem("access_key")}`
      }
    }
    axios.get('/api/remove-user-from-circle/', {
      params: {
        userId: user,
        circleId: circle
      }
    }, config
    ).then(res => {
      this.props.history.push('/profile')
    })
  }

  handleDelete() {
    let config = {
      headers: {
        Authorization: `Token ${localStorage.getItem("access_key")}`
      }
    }
    axios.delete('/api/circles/' + this.props.circleId, config, {
    }).then(res => {
      this.props.history.push('/profile');
    })
  }

  componentDidMount() {
    let config = {
      headers: {
        Authorization: `Token ${localStorage.getItem("access_key")}`
      }
    }
    axios.get('/api/circles/' + this.props.circleId + '/', config, {
    }).then(res => {
      if (res.data['admin'] == this.props.userId) {
        this.setState({ isAdmin: true })
      }
    })
  }

  render() {
    const { match: { params } } = this.props;
    if (this.state.isAdmin) {
      return (
        <div className="postButton" >
          <h1 className="content-header">{this.props.circleName}</h1>
          <button type="button" className="toolbar"><Link to={'/post/' + this.props.circleId + '/' + this.props.circleName + '/' + this.props.match.params.userId + '/' + localStorage.getItem('username')}>Add Post</Link></button>
          <button type="button" className="toolbar" onClick={(e) => this.handleDelete()}>Delete Circle</button>
          <button type="button" className="toolbar" onClick={this.handleOpenAddModal}>Add Member</button>
          <ReactModal isOpen={this.state.showAddModal} style={customStyles}>
            <button className="modal" onClick={this.handleCloseAddModal}>X</button>
            <h2>New Members: </h2>
            <form onSubmit={this.handleAddSubmit}>
              <label>
                Add Members:
              </label>
              <input type='text' onChange={(e) => this.setState({ members: e.target.value })} />
              <button type='submit' value='create'>Add Members</button>
            </form>
          </ReactModal>
          <button type="button" className="add-member" onClick={this.handleOpenLeaveModal}>Leave Circle</button>
          <ReactModal isOpen={this.state.showLeaveModal} style={customStyles}>
            <button className="modal" onClick={this.handleCloseLeaveModal}>X</button>
            <h2>Are You Sure? </h2>
            <button type='submit' value='create' onClick={this.handleLeaveSubmit}>Yes</button>
            <button type='submit' value='create' onClick={this.handleCloseLeaveModal}>No</button>
          </ReactModal>
          <React.Fragment>
            Members: <Circle circleId={params.circleId} />
          </React.Fragment>
        </div>
      )
    } else {
      return (
        <div className="postButton" >
          <button type="button" className="add-post"><Link className="nav" to={'/post/' + this.props.circleId + '/' + this.props.circleName + '/' + this.props.match.params.userId + '/' + localStorage.getItem('username')}>Add Post</Link></button>
          <button type="button" className="add-member" onClick={this.handleOpenAddModal}>Add Member</button>
          <ReactModal isOpen={this.state.showAddModal} style={customStyles}>
            <button className="modal" onClick={this.handleCloseAddModal}>X</button>
            <h2>New Members: </h2>
            <form onSubmit={this.handleAddSubmit}>
              <label>
                Add Members:
              </label>
              <input type='text' onChange={(e) => this.setState({ members: e.target.value })} />
              <button type='submit' value='create'>Add Members</button>
            </form>
          </ReactModal>
          <button type="button" className="add-member" onClick={this.handleOpenLeaveModal}>Leave Circle</button>
          <ReactModal isOpen={this.state.showLeaveModal} style={customStyles}>
            <button className="modal" onClick={this.handleCloseLeaveModal}>X</button>
            <h2>Are You Sure? </h2>
            <button type='submit' value='create' onClick={this.handleLeaveSubmit}>Yes</button>
            <button type='submit' value='create' onClick={this.handleCloseLeaveModal}>No</button>
          </ReactModal>
        </div>
      )
    }
  }
}
export default withRouter(Toolbar)
