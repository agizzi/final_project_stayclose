import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Post from './Post'
import ReactModal from 'react-modal';
import Dropzone from 'react-dropzone';

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

class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            contentId: '',
            post: '',
            showDeleteModal: false,
            showEditModal: false,
            showPostModal: false, 
            username: localStorage.getItem("username")
            
        }
        this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
        this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this);
        this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
        this.handleCloseEditModal = this.handleCloseEditModal.bind(this);
        this.handleOpenPostModal = this.handleOpenPostModal.bind(this);
        this.handleClosePostModal = this.handleClosePostModal.bind(this);
        
    }

    handleOpenDeleteModal(id) {
        this.setState({ contentId: id });
        this.setState({ showDeleteModal: true });
    }

    handleCloseDeleteModal() {
        this.setState({ showDeleteModal: false });
    }

    handleOpenEditModal(text, id) {
        this.setState({ post: text })
        this.setState({ contentId: id });
        this.setState({ showEditModal: true });
    }

    handleCloseEditModal() {
        this.setState({ post: '' });
        this.setState({ showEditModal: false });
    }

    handleOpenPostModal() {
        this.setState({ showPostModal: true });
    }

    handleClosePostModal() {
    this.setState({ showPostModal: false });
    }

    handlePostSubmit () {
        let post_text = this.state.post;
        let member = this.props.userId;
        let circle = this.props.circleId;
        event.preventDefault();
        let config = {
            headers: {
                Authorization: `Token ${localStorage.getItem("access_key")}`
            }
        }
    axios.post('/api/content/', {
      author: this.state.username,
      text_post: post_text,
      img_post: null,
      caption: "",
      likes: [],
      member: member,
      circle: circle,
      tags: null
    }, config
    ).then(res => {
      return res.data
    }).then(datum => {
      if (this.state.hasPic) {
        let profilePicture = this.state.picToUpload[0]
        let data = new FormData()
        data.append('file', profilePicture)
        let config = {
          headers: {
            Authorization: `Token ${localStorage.getItem("access_key")}`
          }
        }
        axios.put('/api/add-image-to-content/' + datum.id + '/', data, config
        ).then(res => {
          this.handleClosePostModal()
          this.setState({ picToUpload: [] })
          this.setState({ post: "" })
          this.props.loadContent()
        }).catch(function (error) {
          alert('username not changed, try again')
        })
      } else {
        this.handleClosePostModal()
        this.setState({ picToUpload: [] })
        this.setState({ post: "" })
        this.props.loadContent()
      }
    })
    }
    
    
    

    render() {
        if (this.props.contents.length > 0 && this.props.contentFetched) {
            return (
                <div className="contentDetail">
                    {this.props.contents.map(content =>
                        <Post content={content} userId={this.props.userId} key={content.id} loadContent={() => this.props.loadContent()} />
                    )}
                </div>
            );
        } else if (this.props.contents.length == 0 && this.props.contentFetched) {
            return (
                <div className="empty">
                    <h3>This circle has no posts yet.</h3>
                    <button type="button" className="add-member" onClick={this.handleOpenPostModal}>Click here to create a post for your feed</button>
                        <ReactModal isOpen={this.state.showPostModal} style={customStyles}>
                        <button className="modal2" onClick={this.handleClosePostModal}>X</button>
                        <h2 className="new-post-header">New Post: </h2>
                        <form onSubmit={(e) => this.handlePostSubmit()}>
                            <label>
                                <input className="posting-input" type='text' value={this.state.post} onChange={(e) => this.setState({ post: e.target.value })} />
                                <div></div>
                            </label>
                            <div></div>
                            <div className="drags">
                            <Dropzone className="dropzone" onDrop={acceptedFiles => this.setState({ picToUpload: acceptedFiles, hasPic: true})}>
                                {({ getRootProps, getInputProps, isDragActive }) => (
                                    <section>
                                        <div clasName="dragdrop"  {...getRootProps()} className="dragpic">
                                            <input {...getInputProps()} />
                                            {isDragActive ? "Drop it like it's hot!" : 'Click Here To Upload A Photo'}
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                            <button type='submit' value='create' className="dragpic">Create a Post</button>
                            </div>
                        </form>
                        </ReactModal>
                </div>
            );
        } else if (!this.props.contentFetched){
            return (
                <div>
                    <h3 className="empty">Loading Content...</h3>
                </div>
            );
        }
    }
}


export default withRouter(Content);