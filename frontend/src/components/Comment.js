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
            author: '',
            showDeleteModal: false
        };
        this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
        this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this);
    }

    handleOpenDeleteModal() {
        this.setState({ showDeleteModal: true });
    }

    handleCloseDeleteModal() {
        this.setState({ showDeleteModal: false });
    }

    handleDeleteSubmit(id) {
        let config = {
            headers: {
                Authorization: `Token ${localStorage.getItem("access_key")}`
            }
        }
        axios.delete('/api/comments/' + id + '/', config, {
        }).then(res => {
            this.setState({ showDeleteModal: false });
            this.componentDidMount();
        })
    }

      componentDidMount() {
    }

    render() {
        return (
                    <div className="comment" >
                        <div className="post-comment">
                            <div className="post-1-pic">
                                <ProfilePicture userId={this.props.comment.author} />
                            </div>
                            <div className="post-2">
                                <div>
                                    <p className="postings-1">{this.props.comment.author} says, </p>
                                </div>
                                <div>
                                    <p className="postings-2"> "{this.props.comment.comment}"</p>
                                </div>
                                <div className="postings-buttons">
                                    <p className="posters"><Moment parse="MM-DD-YYYY HH:mm">{this.props.comment.created_at}</Moment></p>
                                    <p className="posters"><CommentLikes likes={this.props.comment.likes.length} commentId={this.props.comment.id} userId={this.props.userId}/></p>
                                    {this.props.comment.author == this.props.userId &&
                                        <button className="posters" onClick={(e) => this.handleOpenDeleteModal()}>Delete</button>
                                    }
                                    <ReactModal isOpen={this.state.showDeleteModal} style={customStyles}>
                                    <button className="exiter" onClick={(e) => this.handleCloseDeleteModal()}>X</button>
                                        <h3 className="delete-message">Delete: </h3>
                                        <div className="delete">
                                            <button className="deleting" onClick={(e) => this.handleDeleteSubmit(comment.id)}>Yes</button>
                                            <button className="deleting" onClick={(e) => this.handleCloseDeleteModal()}>No</button>
                                        </div>
                                    </ReactModal>
                                </div>
                            </div>
                        </div>
                    </div>
        )
    }
}

export default withRouter(Comment);