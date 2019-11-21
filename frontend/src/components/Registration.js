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
            this.props.history.push("/login");
        }).catch(function(error){
            alert("registration unsuccessful, try again")
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
                    <input type='password' name='pass1' value={this.state.pass} onChange={(e) => this.setState({ pass1: e.target.value })} />
                    </label>
                    <label>
                        Re-enter Password:
                    <input type='password' name='pass2' value={this.state.pass} onChange={(e) => this.setState({ pass2: e.target.value })} />
                    </label>
                    <label>
                        Email:
                    <input type='text' name='email' value={this.state.pass} onChange={(e) => this.setState({ email: e.target.value })} />
                    </label>
                    <input type='submit' value='submit' />
                </form>
            </div>
        );
    }
}

export default withRouter(RegistrationForm);