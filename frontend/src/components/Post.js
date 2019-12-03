import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import ContentLikes from './ContentLikes';
import Circle from './Circle';
import Comments from './Comments';
import ReactModal from 'react-modal';
import Moment from 'react-moment';
import ProfilePicture from './ProfilePicture';

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

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            contentId: '',
            post: '',
            showDeleteModal: false,
            showEditModal: false,
        }
        this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
        this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this);
        this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
        this.handleClosEditModal = this.handleCloseEditModal.bind(this);
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

    handleDelete() {
        let config = {
            headers: {
                Authorization: `Token ${localStorage.getItem("access_key")}`
            }
        }
        axios.delete('/api/content/' + this.state.contentId, config, {
        }).then(res => {
            this.setState({ showDeleteModal: false });
            this.componentDidMount();
            this.forceUpdate();
        })
    }

    handleEdit() {
        let config = {
            headers: {
                Authorization: `Token ${localStorage.getItem("access_key")}`
            }
        }
        axios.patch('/api/content/' + this.state.contentId + '/', {
            text_post: this.state.post
        }, config
        ).then(res => {
            this.setState({ showEditModal: false });
            this.setState({ text: '' });
            this.componentDidMount();
            this.forceUpdate();
        })
    }

    componentDidMount() {
        let config = {
            headers: {
                Authorization: localStorage.getItem("access_key")
            }
        }
        axios.get('/api/user/', config, {
        }).then(res => {
          this.setState({user: res.data})
        })
    }

    render() {
        return (
            <div className="content-2" key={this.props.content.id}>
            <div className="post-me">
                <div className="post-1-pic">
                    <ProfilePicture userId={this.props.content.member} />
                </div>
                <div className="post-2">
                    <div>
                        <div className="posters-buttons">
                            <p className="posters-1">{this.props.content.author} says, </p>
                            {this.props.content.member == this.props.userId &&
                            <button className="posters-2" onClick={(e) => this.handleOpenEditModal(this.props.content.text_post, this.props.content.id)}>Edit</button>
                            }
                            <ReactModal isOpen={this.state.showEditModal} style={customStyles}>
                                <button className="exit" onClick={(e) => this.handleCloseEditModal()}>X</button>
                                <h3>Edit Your Post: </h3>
                                <form>
                                    <input className="editing-input" type='text' defaultValue={this.state.post} onChange={(e) => this.setState({ post: e.target.value })} />
                                </form>
                                <div className="edit">
                                    <button className="editing" onClick={(e) => this.handleEdit()}>Save</button>
                                    <button className="editing" onClick={(e) => this.handleCloseEditModal()}>Do Not Save</button>
                                </div>
                            </ReactModal>
                            {this.props.content.member == this.props.userId &&
                            <button className="posters" onClick={(e) => this.handleOpenDeleteModal(content.id)}>Delete</button>
                            }
                            <ReactModal isOpen={this.state.showDeleteModal} style={customStyles}>
                                <button className="exiter" onClick={(e) => this.handleCloseDeleteModal()}>X</button>
                                <h3 className="delete-message">Are you sure you want to delete your post?</h3>
                                <div className="delete">
                                    <button className="deleting" onClick={(e) => this.handleDelete()}>Yes</button>
                                    <button className="deleting" onClick={(e) => this.handleCloseDeleteModal()}>No</button>
                                </div>
                            </ReactModal>
                        </div>
                    </div>
                    <div>
                        <p className="posting-2"> "{this.props.content.text_post}"</p>
                    </div>
                    {this.props.content.img_post != null &&
                        <div>
                            <img src={this.props.content.img_post} />
                        </div>
                    }
                    <div></div>
                    <div className="posting-user">
                        <p className="posters"><Moment format="LLL">{new Date(this.props.content.updated_at)}</Moment></p>
                        <p className="posters"><ContentLikes likes={this.props.content.likes.length} contentId={this.props.content.id} userId={this.props.userId}/></p>
                    </div>
                 </div>
            </div>
            <Comments contentId={this.props.content.id} userId={this.props.userId}/>
        </div>
        );
    }

}

export default withRouter(Post);
