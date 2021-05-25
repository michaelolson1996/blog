import React from 'react';
import { NavLink } from 'react-router-dom';
import { getPost } from '../redux/posts';
import { connect } from 'react-redux';
import parse from 'html-react-parser';
import "./styles/post.css";

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            post: []
        }
    }

    componentDidMount() {
        this.props.getPost({ post: window.location.pathname.toString() });
    }

    componentDidUpdate() {
        if (this.props.posts.post && this.props.posts.post.length !== this.state.post.length)
            this.setState({ post: [this.props.posts.post[0]] })
    }

    render() {
        return (
            <div className="category-posts-wrapper">
                {
                    this.state.post.length > 0 ?
                        parse(this.state.post[0])
                    :
                        <></>
                }
            </div>
        )
    }
}

export default connect(state => state, { getPost })(Post);