import axios from 'axios';
const categoryAxios = axios.create();

const getCategories = categories => {
    return {
        type: "GET_CATEGORIES",
        categories: categories
    }
}

export const postCategory = category => {
    console.log("entering post redux funct")
    return dispatch => {
        categoryAxios.post(`/admin/category/new`, {category: "new"})
            .then(res => {
                console.log("sent post to category backend")
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