import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import user from './StaticAssets/user.svg';
import SVG from 'react-inlinesvg';


class ProfilePicture extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: ''
        }
    }

    componentDidMount() {
        let config = {
            headers: {
                Authorization: localStorage.getItem("access_key")
            }
        }
        console.log(this.props.userId)
        axios.get('/api/users/' + this.props.userId + '/', {
        }, config
        ).then(res => {
            this.setState({ user: res.data })
            console.log(res.data)
        })
    }

    render() {
        return (
            <div>
                {this.state.user.avatar != null &&
                    <img className={`profile-pic ${this.props.size && 'profile-pic-' + this.props.size}`} src={this.state.user.avatar}></img>
                }

            </div>
        );
    }
}

export default withRouter(ProfilePicture);