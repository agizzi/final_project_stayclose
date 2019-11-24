import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Circle from './Circle'
import NavBar from './NavBar'
import Content from './Content'

class CircleFeed extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { match: { params } } = this.props;
        return (
            <React.Fragment>
                <NavBar username={localStorage.getItem('username')} />
                <Circle circleId={params.circleId}/>
                <Content circleId={params.circleId}/>
            </React.Fragment>
        );
      }

}

export default withRouter(CircleFeed);