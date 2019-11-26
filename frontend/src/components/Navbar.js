import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
import Notification from './Notifications';
import { Link } from 'react-router-dom';
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

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            name: '',
            members: '',
            addedMember: '',
            userId: '',
            showModal: false
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }



    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    handleSubmit = (event) => {
        console.log('submit working')
        event.preventDefault();
        let config = {
            headers: {
                Authorization: localStorage.getItem("access_key")
            }
        }

        this.setState({ user: localStorage.getItem("username") })
        this.setState({ userId: localStorage.getItem("userId") })

        if (this.state.members !== '') {
            axios.get('http://127.0.0.1:8000/api/users/', config, {
            }).then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    if (this.state.members === res.data[i].username) {
                        this.setState({ addedMember: res.data[i].id })
                    }
                }
                axios.post('http://127.0.0.1:8000/api/circles/', config, {
                    name: this.state.name,
                    created_at: "2020-11-30",
                    admin: this.state.userId,
                    members: [
                        this.state.addedMember
                    ]
                }, config
                ).then(res => {
                    console.log(res)
                    this.props.history.push("/profile");
                }).catch(function (error) {
                    alert('circle not created, try again')
                })
            })
        }

        else {

            axios.post('http://127.0.0.1:8000/api/circles/', config, {
                name: this.state.name,
                created_at: "2020-11-30",
                admin: this.state.userId,
                members: []
            },
            ).then(res => {
                console.log(res)
                this.props.history.push("/profile");
            }).catch(function (error) {
                alert('circle not created, try again')
            })
        }


    }

    handleLogout() {
        window.localStorage.clear()
        this.props.history.push('/')
    }

    render() {
        if (localStorage.getItem('access_key')) {
            return (
                <div className="navbar">
                    <h1> StayClose </h1>
                    <ul className="links">
                        <li><button type="button" className="add"><Link className="nav"> {this.props.username}'s Profile Settings </Link></button></li>
                        <li><button className="add" onClick={this.handleOpenModal}>+ Circle </button></li>
                        <div>
                            <ReactModal isOpen={this.state.showModal} style={customStyles}>
                                <h2>New Circle: </h2>
                                <form onSubmit={this.handleSubmit}>
                                    <label>
                                        Circle Name:
                                        <div></div>
                                        <input type='text' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                                        <div></div>
                                    </label>
                                    <label>
                                        Add Members:
                                        <div></div>
                                        <input type='text' value={this.state.members} onChange={(e) => this.setState({ members: e.target.value })} />
                                    </label>
                                    <div></div>
                                    <button type='submit' value='create'>Create a Circle</button>
                                </form>
                                <button onClick={this.handleCloseModal}>Close Modal</button>
                            </ReactModal>
                        </div>
                        <li><button type="button" onClick={this.handleCloseModal} className="add"><a className="nav" onClick={() => this.handleLogout()}>Logout </a></button></li>
                        <li className="notification"><Link to="/notification" className="nav">
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
                    <h1 className="nav"> Hi! Welcome to StayClose. </h1>
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

export default withRouter(NavBar);
