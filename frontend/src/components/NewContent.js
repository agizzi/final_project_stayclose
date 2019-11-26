import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


class NewContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: '',
            userId: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { match: { params } } = this.props;
        let config = {
            headers: {
                Authorization: localStorage.getItem("access_key")
            }
        }
        axios.post('http://127.0.0.1:8000/api/content/',{
            params: {
                text_post: this.state.post,
                img_post: null,
                caption: "",
                created_at: "2020-11-30",
                updated_at: "2020-11-30",
                likes: 0,
                member: 1,
                circle: 1,
                tags: null
            }
        }, config
        ).then(res => {
            this.props.history.push('/circle/' + this.props.circleId + '/' + this.props.circleName)
        })
    }

    render() {
    return (
        <div className='postForm'>
            <h2>New Post: </h2>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Post:
                    <div></div>
                    <input type='text' value={this.state.post} onChange={(e) => this.setState({ post: e.target.value })} />
                    <div></div>
                </label>
                <div></div>
                <button type='submit' value='create'>Create a Post</button>
            </form>
        </div>
    )
    }
}

export default withRouter(NewContent);