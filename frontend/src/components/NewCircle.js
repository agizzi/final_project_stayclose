import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class NewCircle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            members: ''
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let config = {
            headers: {
                Authorization: localStorage.getItem("access_key")
            }
        }
        axios.post('http://127.0.0.1:8000/api/circles/', {
            name: this.state.name,
            created_at: "2020-11-22",
            admin: 1,
            content: null,
            members: [
                1
            ]
        }, config
        ).then(res => {
            console.log(res)
            this.props.history.push("/profile");
        }).catch(function (error) {
            alert('circle not created, try again')
        })
    }

    render() {
        return (
            <div className='circleForm'>
                <h2>New Circle: </h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Circle Name:
                        <div></div>
                    <input type='text' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    <div></div>
                    </label>
                    <label>
                        Add Members:
                        <div></div>
                    <input type='text' value={this.state.members} onChange={(e) => this.setState({ members: e.target.value })} />
                    </label>
                    <div></div>
                    <button type='submit' value='create'>Create a Circle</button>
                </form>
            </div>
        )
    }
}

export default withRouter(NewCircle);