import React, { Component } from 'react';
import NavBar from './Navbar';
import {Link, withRouter} from 'react-router-dom';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <body>
            <NavBar />
        </body>
        );
    }

}

export default ProfilePage;