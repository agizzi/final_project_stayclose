import React, { Component } from 'react';
import Notification from './Notifications'
import { Link } from 'react-router-dom';

class NavBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (localStorage.getItem('access_key')) {
            return (
                <div className="navbar">
                    <h1 className="nav"> StayClose. </h1>
                    <ul className="links">
                        <li><button type="button" className="add"><Link className="nav"> {this.props.username} </Link></button></li>
                        <li><button type="button" className="add"><Link className="nav">Logout </Link></button></li>
                        <li><button type="button" className="add"><Link className="nav"> + Circle </Link></button></li>
                        <li><Link to="/notification" className="nav">
                            <div className="sandwich"></div>
                            <div className="sandwich"></div>
                            <div className="sandwich"></div>
                        </Link></li>
                    </ul>
                </div>
            )
        } else {
            return (
                <div className="navbar">
                    <h1 className="nav"> Hi! Welcome back to StayClose. </h1>
                    <nav>
                        <ul>
                            <li className="nav"> <Link to="/login"> Login </Link> </li>
                            <li className="nav"> <Link to="/register"> Register </Link> </li>
                        </ul>
                    </nav>
                    <Notification />
                </div>
            )
        }
    }
}

export default NavBar;
