import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { request } from 'http';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';




console.log("new-circle")


class NewCircle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            members: '',
<<<<< 9 << HEAD
        addedMember: '',

        };
}


=======
            addedMember: '',
        };
    }

>>>>>>> master
handleSubmit = (event) => {
    event.preventDefault();
    let config = {
        headers: {
            Authorization: localStorage.getItem("access_key")
        }
    }

    if (this.state.members !== '') {
        axios.get('http://127.0.0.1:8000/api/users/', config, {
        }).then(res => {
            for (let i = 0; i < res.data.length; i++) {
                if (this.state.members === res.data[i].username) {
                    console.log('true')
                    this.setState({ addedMember: res.data[i].id })
                }
            }

            axios.post('http://127.0.0.1:8000/api/circles/', {
                name: this.state.name,
                created_at: "2020-11-30",
                admin: 1,
                content: [],
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

        axios.post('http://127.0.0.1:8000/api/circles/', {
            name: this.state.name,
            created_at: "2020-11-30",
            admin: 1,
            content: [],
            members: [

            ]
        }, config
        ).then(res => {
            console.log(res)
            this.props.history.push("/profile");
        }).catch(function (error) {
            alert('circle not created, try again')
        })

    }
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
                <label>
                    Add Members:
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
                <button value='create' onClick={this.handleCloseModal}>Create a Circle</button>
            </form>


        </div >
    )
}
}


export default withRouter(NewCircle);