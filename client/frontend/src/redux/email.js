import axios from 'axios';
const emailAxios = axios.create();
const emailUrl = "/api/email";

const returnEmailStatus = data => {
    return {
        type: "EMAIL_STATUS",
        success: data.success
    }
}

export const sendEmail = (data) => {
    return dispatch => {
        return emailAxios.post(`${emailUrl}/`, data)
            .then(res => {
                dispatch(returnEmailStatus(res.data))
            })
    }
}

const initialSuccess = false;

const emailSuccess = (success = initialSuccess, action) => {
    switch (action.type) {
        case "EMAIL_STATUS": {
            return {
                success: action.success
            }
        }
        default: {
            return success
        }
    }
}

export default emailSuccess;
