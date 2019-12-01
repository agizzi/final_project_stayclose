import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import ContentLikes from './ContentLikes';
import Comments from './Comments';
import ReactModal from 'react-modal';
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
class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contents: [],
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
        axios.get('/api/content-by-circle/', {
            params: {
                id: this.props.circleId
            }
        }, config
        ).then(res => {
            let content = res.data
            this.setState({ contents: content })
        })
    }

    render() {
        return (
            <div className="contentDetail">
                {this.state.contents.map(content =>
                    <div className="content-2" key={content.id}>
                        <div className="post-me">
                            <div className="post-1">
                                <div><p>avatar</p></div>
                            </div>
                            <div className="post-2">
                                <div>
                                    <p className="posting-1">{content.author}</p>
                                </div>
                                <div>
                                    <p className="posting-2"> "{content.text_post}"</p>
                                </div>
                                <div></div>
                                <div className="posting-buttons">
                                    <p className="posters"> <Moment parse="MM-DD-YYYY HH:mm"> {content.created_at} </Moment></p>
                                    <p className="posters"><ContentLikes likes={content.likes.length} contentId={content.id} userId={this.props.userId}/></p>
                                    {content.member == this.props.userId &&
                                    <button className="posters" onClick={(e) => this.handleOpenEditModal(content.text_post, content.id)}>Edit</button>
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
                                    {content.member == this.props.userId &&
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
                                    
                                    <Comments contentId={content.id} userId={this.props.userId}/>
                                </div>
                            </div>    
                        </div>
                    </div>
                 )}    
            </div>
        );
    }

}

export default withRouter(Content);