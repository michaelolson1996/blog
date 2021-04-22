import axios from 'axios';
const categoryAxios = axios.create();
const categoryUrl = "/admin/category";

const getCategories = categories => {
    return {
        type: "GET_CATEGORIES",
        categories: categories
    }
}

export const postCategory = category => {
    return dispatch => {
        return categoryAxios.post(`${ categoryUrl }/new`, category)
            .then(res => {
                dispatch(getCategories(res))
            })
            .catch(err => {
                console.log(err);
            });
    }
}

const initialCategories = [];

const categories = (categories = initialCategories, action) => {
    switch (action.type) {
        case "GET_CATEGORIES": {
            return {
                categories: [...action.categories]
            }
        }
        default:
            return categories;
    }
}

export default categories;