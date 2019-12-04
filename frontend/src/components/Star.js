import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import star from './StaticAssets/star.svg';
import SVG from 'react-inlinesvg';
import goldStar from './StaticAssets/goldStar.svg';



class Star extends Component {
  constructor(props) {
    super(props);
  }




  render() {
    if (this.props.userHasLiked == true) {
      return (
        <div className="star-outline">
          <SVG className="gold-star" src={goldStar} /></div>
      )
    } else {
      return (
        <div className="star-outline">
          <SVG className="star" src={star} /> </div>

      );
    }

  }
}

export default withRouter(Star);