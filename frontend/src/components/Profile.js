import React, { Component } from 'react';
import NavBar from './NavBar';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Circles from './Circles';
import PendingCircles from './PendingCircles';
import ReactModal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};


class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: localStorage.getItem("username"),
            authtoken: localStorage.getItem("access_key"),
            userId: 0,
            name: '',
            circles: [],
            pending_circles: [],
            userFetched: false,
            circlesFetched: false,
            pendingCirclesFetched: false,
            showAddModal: false,
        }
        this.handleOpenAddModal = this.handleOpenAddModal.bind(this);
        this.handleCloseAddModal = this.handleCloseAddModal.bind(this);
    }

    handleOpenAddModal() {
        this.setState({ showAddModal: true });
    }

    handleCloseAddModal() {
        this.setState({ showAddModal: false });
    }

    addCircle(circle) {
        this.setState({
            circles: this.state.circles.concat([circle])
        })
    }

    handleAddSubmit = (event) => {
        event.preventDefault();
        let currName = this.state.name
        let currAdmin = this.state.userId
        let config = {
            headers: {
                Authorization: `Token ${localStorage.getItem("access_key")}`
            }
        }
        const newCircle = {
            name: currName,
            admin: currAdmin,
            pending_members: [],
            members: []
        }
        axios.post('/api/circles/', newCircle, config
        ).then(res => {
            this.setState({ showAddModal: false });
            this.setState({ name: '' })
            this.addCircle(res.data)
        }).catch(function (error) {
            alert('circle not created, try again')
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
            console.log(res)
            this.setState({ userId: userId })
            this.setState({ userFetched: true })
        })

        axios.get('/api/circles-by-user', config, {
        }).then(res => {
            let circles = res.data
            this.setState({ circles: circles })
            this.setState({ circlesFetched: true })
        })

        axios.get('/api/pending-circles-by-user/', config, {
        }).then(res => {
            let pending_circles = res.data
            this.setState({ pending_circles: pending_circles })
            this.setState({ pendingCirclesFetched: true })
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
        else if (this.state.circles.length == 0 && this.state.userFetched && this.state.circlesFetched && this.state.pendingCirclesFetched) {
            return (
                <React.Fragment>
                    <NavBar username={this.state.username} userId={this.state.userId} addCircle={(circle) => this.addCircle(circle)} />
                    <PendingCircles username={this.state.username} userId={this.state.userId} pendingCircles={this.state.pending_circles} />
                    <div className="no-circles">
                        <h3 className="empty-profile">You do not have any circles.</h3>
                        <div className="creative"><button className="add" onClick={this.handleOpenAddModal}>Click here to create one! </button></div>
                        <ReactModal isOpen={this.state.showAddModal} style={customStyles}>
                            <button className="modal" onClick={this.handleCloseAddModal}>X</button>
                            <h2>New Circle: </h2>
                            <form onSubmit={this.handleAddSubmit}>
                                <label>
                                    Circle Name:
                                    <div></div>
                                    <input type='text' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                                    <div></div>
                                </label>
                                <button type='submit' value='create'>Create a Circle</button>
                            </form>
                        </ReactModal>
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









