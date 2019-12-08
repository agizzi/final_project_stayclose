import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CommentLikes from './CommentLikes';
import Comment from './Comment';
import axios from 'axios';
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

class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            newComment: '',
            showAddModal: false,
            showDeleteModal: false
        };
        this.handleOpenAddModal = this.handleOpenAddModal.bind(this);
        this.handleCloseAddModal = this.handleCloseAddModal.bind(this);
        this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
        this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this);
    }

    handleOpenAddModal() {
        this.setState({ showAddModal: true });
    }

    handleCloseAddModal() {
        this.setState({ showAddModal: false });
    }

    handleOpenDeleteModal() {
        this.setState({ showDeleteModal: true });
    }

    handleCloseDeleteModal() {
        this.setState({ showDeleteModal: false });
    }

    handleAddSubmit() {
        let author = this.props.userId
        let content = this.props.contentId
        event.preventDefault()
        let config = {
            headers: {
                Authorization: `Token ${localStorage.getItem("access_key")}`
            }
        }
        axios.post('/api/comments/', {
            comment: this.state.newComment,
            author: author,
            content: content
        }, config
        ).then(res => {
            this.setState({ showAddModal: false });
            this.setState({ newComment: "" });
            this.loadComments();
        })
    }

    componentDidMount() {
        this.loadComments()
        this.timer = setInterval(()=> this.loadComments(), 2000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    commentSort(a, b){
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    }

    loadComments() {
        let id = this.props.contentId
        let config = {
            headers: {
                Authorization: localStorage.getItem("access_key")
            }
        }
        axios.get('/api/comments-by-content/', {
            params: {
                contentId: id
            }
        }, config
        ).then(res => {
            let comments = res.data
            comments.sort(this.commentSort)
            this.setState({ comments: comments })
        })
    }

    render() {
        return (
            <div className="comments">
                {this.state.comments.map(comment =>
                    <Comment comment={comment} userId={this.props.userId} key={comment.id} loadComments={() => this.loadComments()} />
                )}
                <button className="add-comment" onClick={(e) => this.handleOpenAddModal()}>Add Comment</button>
                <ReactModal isOpen={this.state.showAddModal} style={customStyles}>
                    <button className="modal"  onClick={(e) => this.handleCloseAddModal()}>X</button>
                    <h2 className="add-comment-message">Comment: </h2>
                    <div className="delete">
                        <form>
                            <input className="new-comment-input" type='text' value={this.state.newComment} onChange={(e) => this.setState({ newComment: e.target.value })} />
                            <div></div>
                            <button onClick={(e) => this.handleAddSubmit()}>Comment</button>
                        </form>
                    </div>
                </ReactModal>
            </div>
        )
    }
}

export default withRouter(Comments);