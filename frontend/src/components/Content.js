import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contents: []
        }
    }

    componentDidMount() {
        let config = {
          headers: {
            Authorization: localStorage.getItem("access_key")
          }
        }
        axios.get('http://127.0.0.1:8000/api/content-by-circle/',{
            params: {
                id: this.props.circleId
            }
        }, config
        ).then(res => {
            let content = res.data
            this.setState({ contents: content })
        })
    }

    render() {
        return (
            <div className="content">
                <div className="contentDetail">
                    <h1>Contents</h1>
                    {this.state.contents.map(content => <p className="content" key={content.id}>{content.text_post}</p>)}
                </div>
                <div className="postButton">
                    <button type="button" className="add"><Link className="nav" to={'/post/' + this.props.circleId + '/' + localStorage.getItem('username')} >Add Post</Link></button>
                </div>
            </div>
        );
      }

}

export default withRouter(Content);