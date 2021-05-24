import axios from 'axios';
const postsAxios = axios.create();

const returnPosts = posts => {
    return {
        type: "RETURN_POSTS",
        posts: posts
    }
}

export const getPosts = category => {
    return dispatch => {
        return postsAxios.get(`/categories/posts/${category}`)
            .then(res => {
                console.log(res.data)
                dispatch(returnPosts(res.data.posts));
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
        default:
            return posts;
    }
}

export default posts;