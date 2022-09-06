import axios from 'axios';
import { API } from '../utils/config';

export const productReview = (data) => {
    return axios.post(`${API}/review/admin`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const hideReview = (data) => {
    console.log(data, `${API}/review`)
    return axios.put(`${API}/review`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}