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
      likes: 0,
      likers: [],
      userHasLiked: "",
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
      this.setState({ likers: res.data.likes })

    })


    // let star = document.querySelector('.star')
    // let goldStar = document.querySelector('.gold-star')
    // star.classList.toggle('hidden')
    // goldStar.classList.toggle('hidden')


  }

  componentDidMount() {
    this.setState({ likes: this.props.likes })

    let config = {
      headers: {
        Authorization: `Token ${localStorage.getItem("access_key")}`
      }
    }
    axios.get('/api/content/' + this.props.contentId, {
    }, config).then(res => {
      let likes = res.data.likes
      let star = document.querySelector('star')
      let goldStar = document.querySelector('gold-star')
      for (let like of likes) {
        if (!like) {
          goldStar.classList.add('hidden')
          star.classList.remove('hidden')
          this.setState({ userHasLiked: false })
        }
        else if (like == this.props.userId) {
          goldStar.classList.remove('hidden')
          star.classList.add('hidden')
          this.setState({ userHasLiked: true })
        }
      }
      console.log(this.state.userHasLiked)


    })


  }

  render() {
    if (this.state.userHasLiked == true) {
      return (
        <div className="likes" >
          <div onClick={this.handleLikeSubmit}>
            <div className="star-outline">
              <SVG className="gold-star" src={goldStar} /><SVG className="star hidden" src={star} />{this.state.likes}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="likes">
          <div onClick={this.handleLikeSubmit}>
            <div className="star-outline">
              <SVG className="star" src={star} /><SVG className="gold-star hidden" src={goldStar} />{this.state.likes}</div>
          </div>
        </div >
      );
    }

  }
}

export default withRouter(ContentLikes);

