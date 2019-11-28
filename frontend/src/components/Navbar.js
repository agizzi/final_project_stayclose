import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
import Notification from './Notifications';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import Dropzone from 'react-dropzone';

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
            user: localStorage.getItem('username'),
            name: '',
            members: '',
            addedMember: '',
            userId: '',
            user: '',
            showAddModal: false,
            showSettingsModal: false
        };
        this.handleOpenAddModal = this.handleOpenAddModal.bind(this);
        this.handleCloseAddModal = this.handleCloseAddModal.bind(this);
        this.handleOpenSettingsModal = this.handleOpenSettingsModal.bind(this);
        this.handleCloseSettingsModal = this.handleCloseSettingsModal.bind(this);
    }



    handleOpenAddModal() {
        this.setState({ showAddModal: true });
    }

    handleCloseAddModal() {
        this.setState({ showAddModal: false });
    }

    handleOpenSettingsModal() {
        this.setState({ showSettingsModal: true });
    }

    handleCloseSettingsModal() {
        this.setState({ showSettingsModal: false });
    }

    handleAddSubmit = (event) => {
        let currName = this.state.name
        let currAdmin = this.props.userId
        event.preventDefault();
        let config = {
            headers: {
                Authorization: `Token ${localStorage.getItem("access_key")}`
            }
        }
            axios.post('/api/circles/', {
                name: currName,
                created_at: "2020-11-30",
                admin: currAdmin,
                members: []
            }, config
            ).then(res => {
                this.setState({ showAddModal: false} );
                if (this.props.location.pathname != '/profile/'){
                    this.props.history.push('/profile');
                } else {
                    window.location.reload(false);
                }
            }).catch(function (error) {
                alert('circle not created, try again')
            })
    }

    handleSettingsSubmit = (event) => {
        let newUsername = this.state.user
        let currUser = this.props.userId
        console.log(newUsername)
        event.preventDefault();
        let config = {
            headers: {
                Authorization: `Token ${localStorage.getItem("access_key")}`
            }
        }
            axios.patch('/api/users/' + currUser + '/', {
                username: newUsername,
            }, config
            ).then(res => {
                this.setState({ showSettingsModal: false} );
                localStorage.setItem('username', newUsername);
                if (this.props.location.pathname != '/profile/'){
                    this.props.history.push('/profile');
                } else {
                    window.location.reload(false);
                }
            }).catch(function (error) {
                alert('username not changed, try again')
            })
    }


    handleLogout() {
        window.localStorage.clear()
        this.props.history.push('/')
    }

    componentDidMount() {
        let config = {
          headers: {
            Authorization: `Token ${localStorage.getItem("access_key")}`
          }
        }
        axios.get('/api/user/', config, {
        }).then(res => {
          this.setState({user: res.data})
        })
      }

    render() {
        if (localStorage.getItem('access_key')) {
            return (
                <div className="navbar">
                    <h1 className="links"><Link className="header" to="/profile"> StayClose</Link></h1>
                    <img className='profile-pic' src={this.state.user.avatar}></img>
                    <ul className="links-2">
                        <li><button type="button" className="add" onClick={this.handleOpenSettingsModal}>{this.props.username}'s Profile Settings </button></li>
                        <div>
                            <ReactModal isOpen={this.state.showSettingsModal} style={customStyles}>
                                <button className="modal" onClick={this.handleCloseSettingsModal}>X</button>
                                <h2>Settings: </h2>
                                <form onSubmit={this.handleSettingsSubmit}>
                                    <label>
                                        Username:
                                        <div></div>
                                        <input type='text' defaultValue={this.state.user} onChange={(e) => this.setState({ user: e.target.value })} />
                                        <div></div>
                                    </label>
                                    <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                                        {({getRootProps, getInputProps}) => (
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                            </div>
                                        </section>
                                    )}
                                    </Dropzone>
                                    <button type='submit' value='create'>Change Settings</button>
                                </form>
                            </ReactModal>
                        </div>
                        <li><button className="add" onClick={this.handleOpenAddModal}>+ Circle </button></li>
                        <div>
                            <ReactModal isOpen={this.state.showAddModal} style={customStyles}>
                                <button className="modal" onClick={this.handleCloseAddModal}>X</button>
                                <h2>New Circle: </h2>
                                <form onSubmit={(e) => this.handleSettingSubmit}>
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
