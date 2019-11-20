import React, { Component } from 'react';
import {Link, withRouter } from 'react-router-dom';

class Notification extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className = "notification">
                <nav>
                    <ul>
                        <li className = "notify"> hello </li>
                    </ul>
                </nav>
                <button type="submit"> Filter your Notifications</button>
            </div>
        )
    }
}
export default withRouter(Notification);
