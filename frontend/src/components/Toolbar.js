import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
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
      showModal: false,
      members: ""
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleSubmit() {
    event.preventDefault()
    console.log(this.state.members)
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

  render() {
    return (
      <div className="postButton" >
        <button type="button" className="add-post"><Link className="nav" to={'/post/' + this.props.circleId + '/' + this.props.circleName + '/' + this.props.match.params.userId + '/' + localStorage.getItem('username')}>Add Post</Link></button>
        <button type="button" className="delete-button" onClick={(e) => this.handleDelete()}>Delete Circle</button>
        <button type="button" className="add-member" onClick={this.handleOpenModal}>Add Member</button>
        <ReactModal isOpen={this.state.showModal} style={customStyles}>
          <button className="modal" onClick={this.handleCloseModal}>X</button>
          <h2>New Members: </h2>
          <form onSubmit={this.handleSubmit}>
            <label>
              Add Members:
              </label>
            <input type='text' onChange={(e) => this.setState({ members: e.target.value })} />
            <button type='submit' value='create'>Add Members</button>
          </form>
        </ReactModal>
      </div>
    )
  }
}
export default withRouter(Toolbar)
