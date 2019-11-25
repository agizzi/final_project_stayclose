import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


class NewContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: ''
        }
    }

    render() {
    return (
        <div className='postForm'>
            <h2>New Circle: </h2>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Post:
                    <div></div>
                    <input type='text' value={this.state.post} onChange={(e) => this.setState({ name: e.target.value })} />
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