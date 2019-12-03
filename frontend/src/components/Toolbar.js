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
      memberUsernames: [],
      isAdmin: false,
      circleAdmin: "",
      adminUsername: "",
      pending_members: ""
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
    this.setState({ showAddModal: false });
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

      if (res.data.length > 0) {
        for (let i = 0; i < res.data.length; i++) {
          let userId = res.data[i].id
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
      this.setState({ members: res.data.members })
      this.setState({ circleAdmin: res.data.admin })

      if (res.data['admin'] == this.props.userId) {
        this.setState({ isAdmin: true })
      }
      let membersUser = []
      for (let member of this.state.members) {
        axios.get('/api/users/' + member + '/', config, {
        }).then(res => {
          membersUser.push(res.data.username)
        })
      }
      // console.log(membersUser)
      this.setState({ memberUsernames: membersUser })
      console.log(membersUser)
      axios.get('/api/users/' + this.state.circleAdmin + '/', config, {
      }).then(res => {
        this.setState({ adminUsername: res.data.username })
        console.log(this.state.adminUsername)
      })
    })
  }


  render() {
    const { match: { params } } = this.props;
    if (this.state.isAdmin) {
      return (
        <div className="postButton" >
          <h1 className="content-header">{this.props.circleName}</h1>
          <h4 className="you-are-admin">You are the admin of this circle.</h4>
          <button type="button" className="add-member"><Link to={'/post/' + this.props.circleId + '/' + this.props.circleName + '/' + this.props.match.params.userId + '/' + localStorage.getItem('username')}>Add Post</Link></button>
          <button type="button" className="add-member" onClick={(e) => this.handleDelete()}>Delete Circle</button>
          <button type="button" className="add-member" onClick={this.handleOpenAddModal}>Add Member</button>
          <ReactModal isOpen={this.state.showAddModal} style={customStyles}>
            <button className="modal" onClick={this.handleCloseAddModal}>X</button>
            <h2>New Members: </h2>
            <form onSubmit={this.handleAddSubmit}>
              <label>
                Add Members:
              <div></div>
                <input type='text' onChange={(e) => this.setState({ members: e.target.value })} />
              </label>
              <div></div>
              <button type='submit' value='create'>Add Members</button>
            </form>
          </ReactModal>
          <button type="button" className="add-member" onClick={this.handleOpenLeaveModal}>Leave Circle</button>
          <ReactModal isOpen={this.state.showLeaveModal} style={customStyles}>
            <button className="modal" onClick={this.handleCloseLeaveModal}>X</button>
            <h2>Are You Sure You Want to leave? </h2>
            <div className="leaving">
              <button type='submit' className="left" value='create' onClick={this.handleLeaveSubmit}>Yes</button>
              <button type='submit' className="left" value='create' onClick={this.handleCloseLeaveModal}>No</button>
            </div>
          </ReactModal>
          <h4>Members: {this.state.memberUsernames.length}</h4>
          {this.state.memberUsernames.map(member => <p key={member}>{member}</p>)}


        </div>
      )
    } else {
      return (
        <div className="postButton" >
          <h1 className="content-header">{this.props.circleName}</h1>
          <button type="button" className="add-member"><Link className="nav" to={'/post/' + this.props.circleId + '/' + this.props.circleName + '/' + this.props.match.params.userId + '/' + localStorage.getItem('username')}>Add Post</Link></button>
          <button type="button" className="add-member" onClick={this.handleOpenAddModal}>Add Member</button>
          <ReactModal isOpen={this.state.showAddModal} style={customStyles}>
            <button className="modal" onClick={this.handleCloseAddModal}>X</button>
            <h2>Add Member</h2>
            <form onSubmit={this.handleAddSubmit}>
              <label className="adding-members">
                Add Members:
              </label>
              <div></div>
              <input type='text' onChange={(e) => this.setState({ members: e.target.value })} />
              <div></div>
              <button type='submit' value='create'>Add Members</button>
            </form>
          </ReactModal>
          <button type="button" className="add-member" onClick={this.handleOpenLeaveModal}>Leave Circle</button>
          <ReactModal isOpen={this.state.showLeaveModal} style={customStyles}>
            <button className="modal" onClick={this.handleCloseLeaveModal}>X</button>
            <div></div>
            <h2>Are You Sure? </h2>
            <div></div>
            <button type='submit' value='create' onClick={this.handleLeaveSubmit}>Yes</button>
            <button type='submit' value='create' onClick={this.handleCloseLeaveModal}>No</button>
          </ReactModal>
          <h4>Admin:</h4>
          {this.state.adminUsername}
          <h4>Members:</h4>
          {this.state.memberUsernames.map(member => <p key={member}>{member}</p>)}
        </div>
      )
    }
  }
}


export default withRouter(Toolbar)
