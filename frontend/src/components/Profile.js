import React, { Component } from 'react';
import NavBar from './NavBar';
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
        this.setState({ username: localStorage.getItem("username") })
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








