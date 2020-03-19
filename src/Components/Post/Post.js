import React from 'react';

class Post extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <div>
                <p>{this.props.post}</p>
            </div>
        )
    }
}

export default Post