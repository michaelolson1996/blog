import axios from 'axios';
const categoryAxios = axios.create();
const categoryUrl = "/admin/category";

const returnCategories = categories => {
    return {
        type: "RETURN_CATEGORIES",
        categories: categories
    }
}

export const editCategory = () => {
    
}

export const getCategories = () => {
    return dispatch => {
        return categoryAxios.get(`${ categoryUrl }/`)
            .then(res => {
                dispatch(returnCategories(res.data.categories));
            })
            .catch(err => {
                console.log(err);
            })
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
        case "RETURN_CATEGORIES": {
            return {
                categories: [...action.categories]
            }
        }
        default:
            return categories;
    }
}

export default categories;