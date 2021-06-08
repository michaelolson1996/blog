import axios from 'axios';
const emailAxios = axios.create();
const emailUrl = "/email";

const returnEmailStatus = data => {
    return {
        type: "EMAIL_STATUS"
    }
}

export const sendEmail = (data) => {
    return dispatch => {
        return emailAxios.post(`${emailUrl}/`, data)
            .then(res => {
                console.log(res)
            })
    }
}