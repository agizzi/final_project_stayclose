import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NavBar from './NavBar'
import Content from './Content'
// import Toolbar from './Toolbar'

class CircleFeed extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { match: { params } } = this.props;
        return (
            <div>
                <React.Fragment>
                    <NavBar username={localStorage.getItem('username')} />
                    {/* <Toolbar circleId={params.circleId} circleName={params.circleName} /> */}
                    <Content circleId={params.circleId} circleName={params.circleName} />
                </React.Fragment>
            </div>
        );
    }

}

export default withRouter(CircleFeed);