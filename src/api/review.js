import axios from 'axios';
import { API } from '../utils/config';

export const productReview = (data) => {
    console.log(data)
    return axios.post(`${API}/review/admin`,data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const hideReview = (data) => {
    return axios.post(`${API}/review`,data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}