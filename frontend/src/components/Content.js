import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
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
class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contents: [],
            showModal: false
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    handleDelete(id){
        console.log(id);
        let config = {
            headers: {
                Authorization: `Token ${localStorage.getItem("access_key")}`
            }
        }
        axios.delete('http://127.0.0.1:8000/api/content/' + id, config, {
        }).then(res => {
            this.setState({ showModal: false} );
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
        axios.get('http://127.0.0.1:8000/api/content-by-circle/',{
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
        const { match: { params } } = this.props;
        return (
            <div className="content">
                <div className="contentDetail">
                    <h1 className="content-header">{this.props.circleName}</h1>
                    {this.state.contents.map(content =>
                    <div className="content" key={content.id}>
                        <div className="avatar"></div>
                        <p>text: {content.text_post}</p>
                        <p>author: {content.author}</p>
                        <p>created at: {content.created_at}</p>
                        <button>Edit</button>
                        <button onClick={this.handleOpenModal}>Delete</button>
                        <ReactModal isOpen={this.state.showModal} style={customStyles}>
                                <button className="modal" onClick={this.handleCloseModal}>X</button>
                                <h2>Delete?</h2>
                                <button className="delete" onClick={(e) => this.handleDelete(content.id)}>Yes</button>
                                <button className="no" onClick={this.handleDelete}>No</button>
                        </ReactModal>
                    </div>
                    )}
                </div>
                <React.Fragment>
                    Members: <Circle circleId={params.circleId}/>
                </React.Fragment>
                <div className="postButton">
                    <button type="button" className="add"><Link className="nav" to={'/post/' + this.props.circleId + '/' + this.props.circleName + '/' + this.props.match.params.userId + '/' + localStorage.getItem('username')} >Add Post</Link></button>
                </div>
            </div>
        );
      }

}

export default withRouter(Content);