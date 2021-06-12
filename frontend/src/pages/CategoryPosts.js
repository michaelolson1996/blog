import React from 'react';
import { NavLink } from 'react-router-dom';
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
        this.props.getPosts(this.window.location.pathname.split("/")[this.window.location.pathname.split("/").length - 1]);
    }

    componentDidUpdate() {
        if (this.props.posts.posts && this.props.posts.posts.length !== this.state.posts.length)
            this.setState({ posts: [...this.props.posts.posts] })
    }

    render() {
        return (
            <div className="category-posts-wrapper">
                {
                    this.state.posts.length > 0 ?
                        this.state.posts.map((post, i) => {
                            return (
                                <NavLink className="category-post-button" to={`/categories/${this.window.location.pathname.split("/")[this.window.location.pathname.split("/").length - 1]}/${post}`} key={i}>
                                    {decodeURIComponent(post)}
                                </NavLink>
                            )
                        })
                    :
                        <></>
                }
            </div>
        )
    }
}

export default connect(state => state, { getPosts })(CategoryPosts);