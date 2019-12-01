import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NavBar from './NavBar'
import Content from './Content'
import Toolbar from './Toolbar'

class CircleFeed extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { match: { params } } = this.props;
        return (
            <React.Fragment>
                <NavBar username={localStorage.getItem('username')} userId={params.userId}/>
                <div className="contents">
                    <div className="profile-1">
                        <Content circleId={params.circleId} circleName={params.circleName} userId={params.userId}/>
                    </div>
                    <div className="profile">
                        <Toolbar circleId={params.circleId} circleName={params.circleName} userId={params.userId}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

export default withRouter(CircleFeed);