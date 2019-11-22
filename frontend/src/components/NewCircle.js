import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class NewCircle extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            members: ''
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let config = {
            headers: {
                Authorization: localStorage.getItem("access_key")
            }
        }
        axios.post('http://127.0.0.1:8000/api/circles/', {
            name: this.state.name,
            created_at: "2020-11-22",
            admin: 2,
            content: null,
            members: [
            8,
            9,
            3,
            4
        ]
        }, config
        ).then(res => {
            console.log(res)
            this.props.history.push("/profile");
        }).catch(function(error) {
            alert('circle not created, try again')
        })
    }

    render() {
        return(
       <div className='circleForm'>
           <form onSubmit={this.handleSubmit}>
                    <label>
                        Circle Name:
                    <input type='text' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </label>
                    <label>
                        Add Members:
                    <input type='text' value={this.state.members} onChange={(e) => this.setState({ members: e.target.value })} />
                    </label>
                    <input type='submit' value='create' />
                </form>
       </div>
        )
    }
}

export default withRouter(NewCircle);