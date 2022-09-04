import axios from 'axios';
import { API } from '../utils/config';

export const getPetCategory = () => {
    return axios.get(`${API}/pet/category/admin`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}