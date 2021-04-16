import axios from 'axios';
// import categoryRouter from '../../../backend/routes';
const categoryAxios = axios.create();
// const categoryURL = 'http://localhost:5000';

const getCategories = categories => {
    return {
        type: "GET_CATEGORIES",
        categories: categories
    }
}

export const postCategory = category => {
    return dispatch => {
        categoryAxios.post(`/`, {category: "new"})
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
                categories: [...action.cards]
            }
        }
        default:
            return categories;
    }
}

export default categories;