import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class ContentLikes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            likes: 0
        };
        this.handleLikeSubmit = this.handleLikeSubmit.bind(this);
    }

    handleLikeSubmit() {
        let user = this.props.userId;
        let content = this.props.contentId;
        event.preventDefault()
        let config = {
          headers: {
            Authorization: `Token ${localStorage.getItem("access_key")}`
          }
        }
        axios.get('/api/add-or-delete-like-content/', {
          params: {
            userId: user,
            contentId: content
          }
        }, config
        ).then(res => {
          this.setState({likes: res.data['likes'].length})
        })
      }

      componentDidMount() {
        this.setState({ likes: this.props.likes })
    }

    render() {
        return (
            <div className="likes">
                <p onClick={this.handleLikeSubmit}>Likes: {this.state.likes}</p>
            </div>
        );
    }
}

export default withRouter(ContentLikes);