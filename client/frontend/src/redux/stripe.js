import axios from 'axios';
const stripeAxios = axios.create();
const stripeUrl = "/api/payment";

const returnResponse = id => {
    return {
        type: "RETURN_RESPONSE",
        id: id
    }
}

export const createCheckoutSession = () => {
    return dispatch => {
        return stripeAxios.post(stripeUrl)
            .then(res => {
                dispatch(returnResponse(res.data.id))
            })
    }
}

const initialId = [];

const payments = (id = initialId, action) => {
    switch (action.type) {
        case "RETURN_RESPONSE": {
            return {
                id: action.id
            }
        }
        default: {
            return id
        }
    }
}

export default payments;
