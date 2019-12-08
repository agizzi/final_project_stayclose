import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';



class ProfilePicture extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: ""


        }
    }

    getUser(){
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

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    componentDidMount() {
        this.getUser()
        this.timer = setInterval(()=> this.getUser(), 4000);
    }

    render() {

        return (

            <div>
                {this.state.user.avatar != null &&
                    <img className={`profile-pic ${this.props.size && 'profile-pic-' + this.props.size}`} src={this.state.user.avatar}></img>
                }
            </div>
        )





    }
}

export default withRouter(ProfilePicture);