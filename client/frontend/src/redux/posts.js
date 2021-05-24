import axios from 'axios';
const postsAxios = axios.create();

const returnPosts = posts => {
    return {
        type: "RETURN_POSTS",
        posts: posts
    }
}

const returnPost = post => {
    return {
        type: "RETURN_POST",
        post
    }
}

export const getPosts = category => {
    return dispatch => {
        return postsAxios.get(`/categories/posts/${category}`)
            .then(res => {
                dispatch(returnPosts(res.data.posts));
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const getPost = post => {
    return dispatch => {
        return postsAxios.get(post.post)
            .then(res => {
                dispatch(returnPost(res.data));
            })
            .catch(err => {
                console.log(err);
            })
    }
}

const initialPosts = [];

const posts = (posts = initialPosts, action) => {
    switch (action.type) {
        case "RETURN_POSTS": {
            return {
                posts: [...action.posts]
            }
        }
        case "RETURN_POST": {
            return {
                post: [action.post]
            }
        }
        default:
            return posts;
    }
}

export default posts;