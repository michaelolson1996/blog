import axios from 'axios';
const adminAxios = axios.create();
const adminURL = '/admin';

const getCategories = categories => {
    return {
        type: "GET_CATEGORIES",
        categories: categories
    }
}

export const postCategory = category => {

    console.log(category);
    // return dispatch => {
    //     adminAxios.post(`${adminURL}/new/category/${category.title}`, {  })
    //         .then(res => {
    //             console.log(res);
    //             dispatch(getCategories(res.data))
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }
}

const initialCategories = [];

const categories = (categories = initialCategories, action) => {
    switch (action.type) {
        case "GET_CATEGORIES": {
            return {
                categories: [...action.cards]
            }
        }
        default:
            return categories;
    }
}

export default categories;