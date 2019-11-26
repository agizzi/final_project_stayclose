import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class Circle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            members: []
        }
    }

    componentDidMount() {
        let config = {
            headers: {
                Authorization: localStorage.getItem("access_key")
            }
        }
        axios.get('/api/users-by-circle/', {
            params: {
                id: this.props.circleId
            }
        }, config
        ).then(res => {
            let members = res.data
            this.setState({ members: members })
        })
    }

    render() {
        return (
            <div className="members">
                {this.state.members.map(member => <p className="member" key={member.id}>{member.username}</p>)}
            </div>
        );
    }

}

export default withRouter(Circle);