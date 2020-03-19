import React from 'react'

import PostBox from '../PostBox/PostBox'
import '../PostBox/PostBox.css' 

class SearchResults extends React.Component {
    constructor(props) {
        super(props);

        this.formatDate = this.formatDate.bind(this)
    }

    formatDate() {
        return this.props.formatDate(this.props.date)
    }

    render() {
        return (
            <div>
                {
                    this.props.posts.map(post => <PostBox 
                        post={this.props.posts}
                        date={this.props.date}
                        formatDate={this.formatDate}
                        key={post.id}/>
                        )
                }
            </div>
        )
    }
}

export default SearchResults