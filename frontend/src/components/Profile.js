import React, { Component } from 'react';
import NavBar from './NavBar';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Circles from './Circles'
import PendingCircles from './PendingCircles';

class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: localStorage.getItem("username"),
            userId: 0
        };
    }


    componentDidMount() {
        let config = {
            headers: {
                Authorization: `Token ${localStorage.getItem("access_key")}`
            }
        }

        axios.get('/api/user/', config, {
        }).then(res => {
            let userId = res.data.id
            this.setState({ userId: userId })
        })
    }

    render() {
        return (
            <React.Fragment>
                <NavBar username={this.state.username} userId={this.state.userId} />
                <PendingCircles username={this.state.username} userID={this.state.userId} />
                <Circles username={this.state.username} userId={this.state.userId} />
            </React.Fragment>

        );
    }
}

export default withRouter(ProfilePage);








