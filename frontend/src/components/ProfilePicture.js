import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class ProfilePicture extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: ''
        }
    }

    componentDidMount() {
        console.log(this.props.userId)
        let config = {
            headers: {
                Authorization: localStorage.getItem("access_key")
            }
        }
        axios.get('/api/users/' + this.props.userId + '/', {
        }, config
        ).then(res => {
            this.setState({ user: res.data })
        })
    }

    render() {
        return (
            <div>
            {this.state.user.avatar != null &&
                <img className='profile-pic' src={this.state.user.avatar}></img>
                }
            </div>
        );
    }

}

export default withRouter(ProfilePicture);