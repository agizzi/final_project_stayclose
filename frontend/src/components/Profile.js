import React, { Component } from 'react';
import NavBar from './Navbar';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Circles from './Circles'

class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        };
    }

    componentDidMount() {
        let config = {
            headers: {
                Authorization: localStorage.getItem("access_key")
            }
        }
        axios.get('http://127.0.0.1:8000/api/users/', config, {
        }).then(res => {
            this.setState({ username: res.data[0].username })
            localStorage.setItem('username', this.state.username)
        })
    }

    render() {
        return (
            <React.Fragment>
                <NavBar username={this.state.username} />
                <Circles />
            </React.Fragment>

        );
    }
}

export default withRouter(ProfilePage);

console.log('hi');








