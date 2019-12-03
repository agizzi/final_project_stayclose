import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

class ProfilePicture extends Component {
    constructor(props) {
        super(props);

        static propTypes = {
            post: PropTypes.object,
            comment: PropTypes.object,
        }

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
        axios.get('/api/users/' + this.props.userId + '/', {
        }, config
        ).then(res => {
            this.setState({ user: res.data })
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.user.avatar != null &&
                    <img className='profile-pic' src={this.state.user.avatar}></img>
                }
                {this.props.post && 
                    <img className='post-pic' src={this.state.user.avatar}></img>
                }
                {this.props.comment && 
                    <img className='comment-pic' src={this.state.user.avatar}></img>
                }
            </React.Fragment>
        );
    }
}

export default withRouter(ProfilePicture);