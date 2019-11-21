import React, { Component } from 'react';
import Notification from './Notifications'
import { Link } from 'react-router-dom';

class NavBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
<<<<<<< HEAD
        if (localStorage.getItem('auth_key')){
            return (
                <div className = "navbar">
                    <h1 className = "nav"> Hi {this.props.name}! Welcome back to StayClose. </h1>
                    <nav>
                        <ul>
                            <li className = "nav"> {this.props.name}'s Account </li>
                            <li className = "nav"> Add Circle </li>
                            <li className = "nav"> Notifications </li>
                        </ul>
                    </nav>
                    <Notification />
                </div>
            )
        } else {
            return (
                <div className = "navbar">
                    <h1 className = "nav"> Hi! Welcome back to StayClose. </h1>
                    <nav>
                        <ul>
                            <li className = "nav"> <Link to="/login"> Login </Link> </li>
                            <li className = "nav"> <Link to="/register"> Register </Link> </li>
                        </ul>
                    </nav>
                    <Notification />
                </div>
            )
        }
=======
        return (
            <div className="navbar">
                <h1 className="nav"> Hi {this.props.username}! Welcome back to StayClose. </h1>
                <nav>
                    <ul>
                        <li className="nav"> {this.props.username}'s Account </li>
                        <li className="nav"> Add Circle </li>
                        <li className="nav"> Notifications </li>
                    </ul>
                </nav>
                <Notification />
            </div>
        )
>>>>>>> master
    }
}

export default NavBar;
