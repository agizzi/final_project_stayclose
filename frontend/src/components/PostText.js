import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class PostText extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
            return (
                <div>
                    <p className="posting-2"> "{this.props.postText}"</p>
                </div>
        )
    }

}

export default withRouter(PostText);