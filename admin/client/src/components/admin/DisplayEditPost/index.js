import React from 'react';
import CategoryItem from '../CategoryItem';
import { connect } from 'react-redux';
import { getPosts } from '../../../redux/posts';

class DisplayEditPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayPosts: false,

        }
    }

    retrievePosts = category => {
        console.log(category)

        this.props.getPosts(category);
        console.log(this.props.posts);
    }

    render() {
        return (
            <>
               {
                   this.state.displayPosts ?
                   <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
                        {
                            
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