import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { request } from 'http';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';



class NewCircle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            members: '',
            addedMember: ''

        };
    }


    handleSubmit = (event) => {
        event.preventDefault();
        let config = {
            headers: {
                Authorization: localStorage.getItem("access_key")
            }
        }


        axios.post('/api/circles/', {
            name: this.state.name,
            created_at: "2020-11-30",
            admin: 1,
            content: [],
            members: [

            ]
        }, config
        ).then(res => {
            this.props.history.push("/profile");
        }).catch(function (error) {
            alert('circle not created, try again')
        })
    }

    render() {
        return (

            <div className='circleForm'>
                <h2>New Circle: </h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Circle Name:
                        <div></div>
                        <input type='text' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                        <div></div>
                    </label>
                    <div></div>
                    <button value='create' onClick={this.handleCloseModal}>Create a Circle</button>
                </form>
            </div >
        )
    }
}

export default withRouter(NewCircle);