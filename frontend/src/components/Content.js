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
            contents: [],
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
        this.loadContent()
    }

    loadContent() {
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
                    <Post content={content} userId={this.props.userId} key={content.id} loadContent={() => this.loadContent()} />
                )}
            </div>
        );
    }

}

export default withRouter(Content);