import React from 'react';
import { getPost } from '../redux/posts';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { connect } from 'react-redux';
import parse from 'html-react-parser';
import "./styles/post.css";

import Loading from '../components/Loading';

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
        if (this.props.posts.post && this.props.posts.post.length !== this.state.post.length) {


            // let newPost = parse(this.props.posts.post[0])

            // console.log(newPost)

            // newPost[1].props.children.map(item => {
            //     item.props !== undefined && item.props.children !== null ?
            //         item.props.children.map(child => {
            //             typeof(child) === "string" ?
            //                 <>{item}</>
            //             :
            //                 child.props.className === "post-code" ?
            //                     child.props = <SyntaxHighlighter language="javascript" style={docco}>{child.props}</SyntaxHighlighter>
            //                 :
            //                 <>{item}</>
            //         })
            //     :
            //         <></>
            // })

            this.setState({ post: [parse(this.props.posts.post[0])] })
        }
            
    }

    render() {
        return (
            <>
                {
                    this.state.post.length > 0 ?
                        <>
                            {
                                this.state.post[0]
                            }


                            <SyntaxHighlighter language="javascript" style={docco}>print 'hello'</SyntaxHighlighter>
                        </>
                    :
                        <Loading />
                }
            </>
        )
    }
}

export default connect(state => state, { getPost })(Post);