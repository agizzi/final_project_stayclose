import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CommentLikes from './CommentLikes';
import axios from 'axios';
import ReactModal from 'react-modal';
import ProfilePicture from './ProfilePicture';
import Moment from 'react-moment';

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

class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            author: "",
            showDeleteModal: false,
            comment: "",
            showEditModal: false,
            commentId: "",

        };
        this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
        this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this);
        this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
        this.handleClosEditModal = this.handleCloseEditModal.bind(this);
    }

    handleOpenDeleteModal() {
        this.setState({ showDeleteModal: true });
    }

    handleCloseDeleteModal() {
        this.setState({ showDeleteModal: false });
    }

    handleOpenEditModal(text, id) {
        this.setState({ comment: text })
        this.setState({ contentId: id });
        this.setState({ showEditModal: true });
    }

    handleCloseEditModal() {
        this.setState({ comment: '' });
        this.setState({ showEditModal: false });
    }

    handleDeleteSubmit(id) {
        event.preventDefault()
        let config = {
            headers: {
                Authorization: `Token ${localStorage.getItem("access_key")}`
            }
        }
        axios.delete('/api/comments/' + this.props.comment.id + '/', config, {
        }).then(res => {
            this.setState({ showDeleteModal: false });
            this.props.loadComments()
        })
    }

    handleEdit(id) {
        event.preventDefault()
        let config = {
            headers: {
                Authorization: `Token ${localStorage.getItem("access_key")}`
            }
        }
        axios.patch('/api/comments/' + this.props.comment.id + '/', {
            comment: this.state.comment
        }, config
        ).then(res => {
            this.setState({ showEditModal: false });
            this.props.loadComments()

        })
    }

    componentDidMount() {
        let config = {
            headers: {
                Authorization: `Token ${localStorage.getItem("access_key")}`
            }
        }
        axios.get('/api/users/' + this.props.comment.author + '/', config, {
        }).then(res => {
            this.setState({ author: res.data.username })
        })
    }

    render() {
        return (
            <div className="comment" >
            <div className="post-comment">
                <div className="posts-1">
                    <ProfilePicture userId={this.props.comment.author} size='small' />
                </div>
                <div className="posts-2">
                        <p className="postings-1">{this.state.author} says, "{this.props.comment.comment}"</p>
                        {this.props.comment.author == this.props.userId &&
                            <button className="posters-delete" onClick={(e) => this.handleOpenEditModal(this.props.comment.comment, this.props.comment.id)}>Edit</button>
                        }
                            <ReactModal isOpen={this.state.showEditModal} style={customStyles}>
                                <button className="exit" onClick={(e) => this.handleCloseEditModal()}>X</button>
                                <h3>Edit Your Comment: </h3>
                                <form>
                                    <input className="editing-input" type='text' defaultValue={this.state.comment} onChange={(e) => this.setState({ comment: e.target.value })} />
                                </form>
                                <div className="edit">
                                    <button className="editing" onClick={(e) => this.handleEdit(this.props.comment.id)}>Save</button>
                                    <button className="editing" onClick={(e) => this.handleCloseEditModal()}>Do Not Save</button>
                                </div>
                            </ReactModal>
                        {this.props.comment.author == this.props.userId &&
                                <button className="posters-delete" onClick={(e) => this.handleOpenDeleteModal()}>Delete</button>
                            }
                            <ReactModal isOpen={this.state.showDeleteModal} style={customStyles}>
                            <button className="exiter" onClick={(e) => this.handleCloseDeleteModal()}>X</button>
                                <h3 className="delete-message">Are you sure you want to delete your comment? </h3>
                                <div className="delete">
                                    <button className="deleting" onClick={(e) => this.handleDeleteSubmit(this.props.comment.id)}>Yes</button>
                                    <button className="deleting" onClick={(e) => this.handleCloseDeleteModal()}>No</button>
                                </div>
                            </ReactModal>
                        <div className="postings-buttons">
                            <p className="posters"><Moment format="LLL">{new Date(this.props.comment.updated_at)}</Moment></p>
                            <p className="posters"><CommentLikes likes={this.props.comment.likes.length} commentId={this.props.comment.id} userId={this.props.userId} size='small' /></p>
                        </div>
                </div>
            </div>
        </div>
        )
    }
}

export default withRouter(Comment);