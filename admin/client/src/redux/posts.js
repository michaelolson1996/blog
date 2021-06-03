import axios from 'axios';
const postsAxios = axios.create();

const returnPosts = posts => {
    return {
        type: "RETURN_POSTS",
        posts
    }
}

export const getPosts = category => {
    return dispatch => {
        return postsAxios.get(`/admin/post/${category}`)
            .then(res => {
                dispatch(returnPosts(res.data.posts))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const postPost = (post) => {
    return dispatch => {
        return postsAxios.post(`/admin/post/${ post.chosenCategory }`, post)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

const initialPosts = [];

const posts = (posts = initialPosts, action) => {
    switch (action.type){
        case "RETURN_POSTS": {
            return {
                posts: [...action.posts]
            }
        }
        default: {
            return posts;
        }
    }
}

export default posts;