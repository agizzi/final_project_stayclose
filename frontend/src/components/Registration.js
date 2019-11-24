import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import axios from 'axios';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass1: '',
            pass2: '',
            email: ''
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/api/rest-auth/registration/', {
            username: this.state.user,
            email: this.state.email,
            password1: this.state.pass1,
            password2: this.state.pass2
        }).then(res => {
            this.props.history.push("/");
        }).catch(function(error){
            alert("registration unsuccessful, try again")
        })
    }
    render() {
        return (
            <div className="registration">
                <div classname="register">
                    <h1>StayClose</h1>
                    <p>"Personal. Practical. Private."</p>
                </div>
                <div className= "register-2">
                    <h2>Register</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Username:
                            <div></div>
                        <input type='text' name='user' value={this.state.user} onChange={(e) => this.setState({ user: e.target.value })} />
                        </label>
                        <div></div>
                        <label>
                            Password:
                            <div></div>
                        <input type='password' name='pass1' value={this.state.pass} onChange={(e) => this.setState({ pass1: e.target.value })} />
                        </label>
                        <div></div>
                        <label>
                            Re-enter Password:
                            <div></div>
                        <input type='password' name='pass2' value={this.state.pass} onChange={(e) => this.setState({ pass2: e.target.value })} />
                        </label>
                        <div></div>
                        <label>
                            Email:
                            <div></div>
                        <input type='text' name='email' value={this.state.pass} onChange={(e) => this.setState({ email: e.target.value })} />
                        </label>
                        <div></div>
                        <button type='submit' value='submit'>Register</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(RegistrationForm);