import axios from 'axios';
import { API } from '../utils/config';

export const getProducts = (index:number) => {
    return axios.get(`${API}/product/admin/getAllProductsAdmin/${index-1}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}