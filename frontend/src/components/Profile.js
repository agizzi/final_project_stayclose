import React, { Component } from 'react';
import NavBar from './NavBar';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Circles from './Circles'

class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            userId: '',

        };
    }


    componentDidMount() {
        this.setState({ username: localStorage.getItem("username") })
        let config = {
            headers: {
                Authorization: localStorage.getItem("access_key")
            }
        }

        axios.get('http://127.0.0.1:8000/api/users/', config, {
        }).then(res => {
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].username === this.state.username) {
                    this.setState({ userId: res.data[i].id })
                    localStorage.setItem('userId', this.state.userId);
                }
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <NavBar username={this.state.username} />
                <Circles username={this.state.username} />
            </React.Fragment>

        );
    }
}

export default withRouter(ProfilePage);








