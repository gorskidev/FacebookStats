import React from 'react'

import Post from '../Post/Post'

import './PostBox.css'

class PostBox extends React.Component {
    constructor(props) {
        super(props);

        this.formatDate = this.formatDate.bind(this)
    }

    formatDate() {
        return this.props.formatDate(this.props.date)
    }

    render() {
        if(this.props.hasOwnProperty('formatDate')){
            return (
                <div className="postBox">
                    <img className="profilePicture" src={this.props.imgSrc} />
                    <a className="userName">{this.props.name}</a>
                    <a className="date">{this.formatDate()} • Najebolandia</a>
                    <Post post={this.props.post.content}/>
                </div>
            )
        } else {
            return (
                <div className={this.props.className}>
                    <Post post={this.props.post.content}/>
                </div>
            )
        }
    }
}

export default PostBox
