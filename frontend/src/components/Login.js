import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: ''
        };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/api/rest-auth/login/', {
            username: this.state.user,
            password: this.state.pass
        }).then(res => {
            console.log(res.data)
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                    <input type='text' name='user' value={this.state.user} onChange={(e) => this.setState({ user: e.target.value })} />
                    </label>
                    <label>
                        Password:
                    <input type='text' name='pass' value={this.state.pass} onChange={(e) => this.setState({ pass: e.target.value })} />
                    </label>
                    <input type='submit' value='submit' />
                </form>
                <p>
                    Not a Member?
                </p>
                <p>
                    <Link to="/register">Register</Link>
                </p>
            </div>
        );
    }
}

export default withRouter(LoginForm);