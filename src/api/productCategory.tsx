import axios from 'axios';
import { API } from '../utils/config';

export const getProductCategory = () => {
    return axios.get(`${API}/product/category/admin`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}