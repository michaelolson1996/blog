import React from 'react';
import "./styles/categoryPosts.css";
import { getPosts } from '../redux/posts';
import { connect } from 'react-redux';

class CategoryPosts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        this.props.getPosts(window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]);
    }

    componentDidUpdate() {
        console.log(this.props.posts.posts)
        if (this.props.posts.posts && this.props.posts.posts.length !== this.state.posts.length)
            this.setState({ posts: [...this.props.posts.posts] })
    }

    render() {
        return (
            <div className="category-posts-wrapper">
                {
                    this.state.posts.length > 0 ?
                        this.state.posts.map((post, i) => {
                            return <div key={i}>{post}</div>
                        })
                    :
                        <></>
                }
            </div>
        )
    }
}

export default connect(state => state, { getPosts })(CategoryPosts);