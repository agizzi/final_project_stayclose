import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Star from './Star';

class CommentLikes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      likes: 0,
      userHasLiked: ""
    };
    this.handleLikeSubmit = this.handleLikeSubmit.bind(this);
    this.changeStar = this.changeStar.bind(this);
  }

  handleLikeSubmit() {
    let user = this.props.userId;
    let comment = this.props.commentId;
    event.preventDefault()
    let config = {
      headers: {
        Authorization: `Token ${localStorage.getItem("access_key")}`
      }
    }
    axios.get('/api/add-or-delete-like-comment/', {
      params: {
        userId: user,
        commentId: comment
      }
    }, config
    ).then(res => {
      this.setState({ likes: res.data['likes'].length })
      this.changeStar()
    })
  }

  changeStar() {
    if (this.state.userHasLiked == false) {
      this.setState({ userHasLiked: true })
    } else {
      this.setState({ userHasLiked: false })
    }
  }

  checkLikes(){
    this.setState({ likes: this.props.likes })

    let config = {
      headers: {
        Authorization: `Token ${localStorage.getItem("access_key")}`
      }
    }
    axios.get('/api/comments/' + this.props.commentId + "/", {
    }, config).then(res => {
      let likes = res.data.likes
      for (let like of likes) {
        if (like == this.props.userId) {
          this.setState({ userHasLiked: true })
        }
      }
    })
  }

  componentDidMount() {
    this.checkLikes()
    this.timer = setInterval(()=> this.checkLikes(), 4000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    return (
      <div className="likes">
        <div onClick={this.handleLikeSubmit}>
          <div className="star-outline">
            <Star userHasLiked={this.state.userHasLiked} /> <p className="star">{this.state.likes} </p>
          </div>
        </div>
      </div>

    );
  }
}

export default withRouter(CommentLikes);

