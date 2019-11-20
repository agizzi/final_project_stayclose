import React, { Component } from 'react';
import querystring from 'querystring';
import axios from 'axios';

class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: '',
            pass: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/api/rest-auth/login/', {
            username: this.state.user,
            password: this.state.pass
        }).then(res => {
            console.log(res.data)
        })
    }
    render(){
        return(
        <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Username:
                    <input type='text' name ='user' value={this.state.user} onChange={this.handleChange} />
                </label>
                <label>
                    Password:
                    <input type='text' name= 'pass' value={this.state.pass} onChange={this.handleChange} />
                </label>
                <input type='submit' value='submit' />
            </form>
        </div>
        );
    }
}

export default LoginForm;