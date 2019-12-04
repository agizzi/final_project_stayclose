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
            pending_circles: [],
            userFetched: false,
            circlesFetched: false,
            pendingCirclesFetched: false,
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
            this.setState({userFetched: true})
        })

        axios.get('/api/circles-by-user', config, {
        }).then(res => {
            let circles = res.data
            this.setState({ circles: circles })
            this.setState({circlesFetched: true})
        })

        axios.get('/api/pending-circles-by-user/', config, {
        }).then(res => {
            let pending_circles = res.data
            this.setState({ pending_circles: pending_circles })
            this.setState({ pendingCirclesFetched: true})
        })
    }

    render() {
        if (this.state.circles.length > 0 && this.state.userFetched && this.state.circlesFetched && this.state.pendingCirclesFetched) {
            return (
                <React.Fragment>
                    <NavBar username={this.state.username} userId={this.state.userId} addCircle={(circle) => this.addCircle(circle)} />
                    <PendingCircles username={this.state.username} userId={this.state.userId} pendingCircles={this.state.pending_circles} />
                    <Circles username={this.state.username} userId={this.state.userId} circles={this.state.circles} />
                </React.Fragment>
            )
        }
        else if (this.state.circles.length == 0 && this.state.userFetched && this.state.circlesFetched && this.state.pendingCirclesFetched){
            return (
                <React.Fragment>
                    <NavBar username={this.state.username} userId={this.state.userId} addCircle={(circle) => this.addCircle(circle)} />
                    <PendingCircles username={this.state.username} userId={this.state.userId} pendingCircles={this.state.pending_circles} />
                    <div>
                        <h3 className="empty">You do not yet have any circles. Click +Circle to create one!</h3>
                    </div>
                </React.Fragment>

            )
        }
        else {
            return (
                <React.Fragment>
                    <NavBar username={this.state.username} userId={this.state.userId} addCircle={(circle) => this.addCircle(circle)} />
                    <PendingCircles username={this.state.username} userId={this.state.userId} pendingCircles={this.state.pending_circles} />
                    <div>
                        <h3 className="empty">Loading Profile...</h3>
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default withRouter(ProfilePage);









