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
                Authorization: `Token ${localStorage.getItem("access_key")}`
            }
        }

        axios.get('http://127.0.0.1:8000/api/user/', config, {
        }).then(res => {
            this.setState({ userId: res.data.id })
        })
    }

    render() {
        return (
            <React.Fragment>
                <NavBar username={this.state.username} />
                <Circles username={this.state.username} userId={this.state.userId} />
            </React.Fragment>

        );
    }
}

export default withRouter(ProfilePage);








