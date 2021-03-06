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
            contents: [],
            contentFetched: false
        }

    }

    componentDidMount() {
        this.loadContent()
        this.timer = setInterval(()=> this.loadContent(), 2000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    contentSort(b, a){
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
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
            content.sort(this.contentSort)
            this.setState({ contents: content })
            this.setState({ contentFetched: true })
        })
    }


    render() {
        const { match: { params } } = this.props;
        return (
            <React.Fragment>
                <NavBar username={localStorage.getItem('username')} userId={params.userId} />
                <div className="contents">
                    <div className="profile-1">
                        <Content circleId={params.circleId} circleName={params.circleName} userId={params.userId} contents={this.state.contents} contentFetched={this.state.contentFetched} loadContent={() => this.loadContent()} contentFetched={this.state.contentFetched} />
                    </div>
                    <div className="profile-2">
                        <Toolbar circleId={params.circleId} circleName={params.circleName} userId={params.userId} loadContent={() => this.loadContent()}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

export default withRouter(CircleFeed);