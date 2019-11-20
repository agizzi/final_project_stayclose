import React, { Component } from 'react';
import {Link, withRouter } from 'react-router-dom';

class NavBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className = "navbar">
                <h1 className = "nav"> StayClose </h1>
                <nav>
                    <ul>
                        <li className = "nav"> My Account </li>
                        <li className = "nav"> Add Circle </li>
                        <li className = "nav"> Notifications </li>
                    </ul>
                </nav>
            </div>
        )
    }
}
export default withRouter(NavBar);
