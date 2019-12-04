import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Post from './Post'

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

    render() {
        if (this.props.contents.length != 0) {
            return (
                <div className="contentDetail">
                    {this.props.contents.map(content =>
                        <Post content={content} userId={this.props.userId} key={content.id} loadContent={() => this.props.loadContent()} />
                    )}
                </div>
            );
        } else {
            return (
                <div>
                    <h3 className="empty">This circle has not posts yet, Use add a post to add a post!</h3>
                </div>
            );
        }
    }
}



export default withRouter(Content);