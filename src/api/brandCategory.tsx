import axios from 'axios';
import { API } from '../utils/config';

export const getBrand = () => {
    return axios.get(`${API}/brand/admin`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}