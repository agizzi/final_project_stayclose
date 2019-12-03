import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import star from './StaticAssets/star.svg';
import SVG from 'react-inlinesvg';
import goldStar from './StaticAssets/goldStar.svg';



class ContentLikes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      likes: 0
    };
    this.handleLikeSubmit = this.handleLikeSubmit.bind(this);
  }

  handleLikeSubmit() {
    let user = this.props.userId;
    let content = this.props.contentId;
    event.preventDefault()
    let config = {
      headers: {
        Authorization: `Token ${localStorage.getItem("access_key")}`
      }
    }
    axios.get('/api/add-or-delete-like-content/', {
      params: {
        userId: user,
        contentId: content
      }
    }, config
    ).then(res => {
      this.setState({ likes: res.data['likes'].length })
    })
  }

  componentDidMount() {
    this.setState({ likes: this.props.likes })
  }

  render() {
    return (
      <div className="likes">
        <div onClick={this.handleLikeSubmit}>
          <div className="star-outline">
            <SVG className="star" src={star} /> {this.state.likes}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(ContentLikes);