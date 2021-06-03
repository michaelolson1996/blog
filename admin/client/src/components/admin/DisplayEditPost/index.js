import React from 'react';
import CategoryItem from '../CategoryItem';
import { connect } from 'react-redux';
import { getPosts } from '../../../redux/posts';
import { NavLink } from 'react-router-dom';

class DisplayEditPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            categories: [],
            displayPosts: false,
        }
    }

    retrievePosts = category => {
        this.props.getPosts(category);

        this.setState({ displayPosts: true })
    }

    componentDidUpdate() {
        if (this.props.categories !== undefined && this.props.categories.categories.length > 0 && this.state.categories.length !== this.props.categories.categories.length) {
            this.setState({
                categories: [...this.props.categories.categories]
            })
        }

        if (this.props.posts.posts !== undefined && this.props.posts.posts.length > 0 && this.state.posts.length !== this.props.posts.posts.length) {
            this.setState({
                posts: [...this.props.posts.posts]
            })
        }
    }

    render() {
        return (
            <>
            {
                console.log(this.props)
            }
               {
                   this.state.displayPosts ?
                        <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
                            {
                                this.state.posts.map((post, i) => {
                                    return (
                                        <NavLink className="category-post-button" to="/" key={i}>
                                            {decodeURIComponent(post)}
                                        </NavLink>
                                    )
                                })
                            }
                        </div>
                   :
                        <div style={{ height: '100%', width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                            {
                                this.props.categories.categories ?
                                    this.props.categories.categories.map((category, i) => {
                                        return <CategoryItem
                                                    retrievePosts={ this.retrievePosts }
                                                    key={i}
                                                    src={`data:image/png;base64,${category.image}`}
                                                    title={category.title} />
                                    })
                                :
                                    <></>
                            }
                        </div>
               }
            </>
        )
    }
}

export default connect(state => state, { getPosts })(DisplayEditPost)