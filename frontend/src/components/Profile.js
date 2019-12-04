import React, { Component } from 'react';
import NavBar from './NavBar';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Circles from './Circles';
import PendingCircles from './PendingCircles';


class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: localStorage.getItem("username"),
            authtoken: localStorage.getItem("access_key"),
            userId: 0,
            circles: [],
            pending_circles: []
        };
    }

    addCircle(circle) {
        this.setState({
            circles: this.state.circles.concat([circle])
        })
    }

    componentDidMount() {
        let config = {
            headers: {
                Authorization: `Token ${this.state.authtoken}`
            }
        }

        axios.get('/api/user/', config, {
        }).then(res => {
            let userId = res.data.id
            this.setState({ userId: userId })
        })

        axios.get('/api/circles-by-user', config, {
        }).then(res => {
            let circles = res.data
            this.setState({ circles: circles })
        })

        axios.get('/api/pending-circles-by-user/', config, {
        }).then(res => {
            let pending_circles = res.data
            this.setState({ pending_circles: pending_circles })
        })
    }

    render() {
        if (this.state.circles.length > 0) {
            return (
                <React.Fragment>
                    <NavBar username={this.state.username} userId={this.state.userId} addCircle={(circle) => this.addCircle(circle)} />
                    <PendingCircles username={this.state.username} userId={this.state.userId} pendingCircles={this.state.pending_circles} />
                    <Circles username={this.state.username} userId={this.state.userId} circles={this.state.circles} />
                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment>
                    <NavBar username={this.state.username} userId={this.state.userId} addCircle={(circle) => this.addCircle(circle)} />
                    <PendingCircles username={this.state.username} userId={this.state.userId} pendingCircles={this.state.pending_circles} />
                    <div className="no-circles">
                        <h3 className="empty-profile">You do not have any circles.</h3>
                        <h3 className="empty-profile">Click '<i>+ Circle</i> ' to create one!</h3>
                    </div>
                </React.Fragment>

            )
        }
    }
}

export default withRouter(ProfilePage);









