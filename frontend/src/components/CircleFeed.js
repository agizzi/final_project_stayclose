import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NavBar from './NavBar'
import Content from './Content'
import Toolbar from './Toolbar'
import axios from 'axios';

class CircleFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contents: []
        }

    }

    componentDidMount() {
        this.loadContent()
    }

    loadContent() {
        let config = {
            headers: {
                Authorization: localStorage.getItem("access_key")
            }
        }
        axios.get('/api/content-by-circle/', {
            params: {
                id: this.props.match.params.circleId
            }
        }, config
        ).then(res => {
            let content = res.data
            this.setState({ contents: content })
        })
    }


    render() {
        const { match: { params } } = this.props;
        return (
            <React.Fragment>
                <NavBar username={localStorage.getItem('username')} userId={params.userId} />
                <div className="contents">
                    <div className="profile-1">
                        <Content circleId={params.circleId} circleName={params.circleName} userId={params.userId} contents={this.state.contents} loadContent={() => this.loadContent()} />
                    </div>
                    <div className="profile-2">
                        <Toolbar circleId={params.circleId} circleName={params.circleName} userId={params.userId} loadContent={() => this.loadContent()} />
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

export default withRouter(CircleFeed);