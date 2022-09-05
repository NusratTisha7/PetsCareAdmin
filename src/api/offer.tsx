import axios from 'axios';
import { API } from '../utils/config';

export const Offer = () => {
    return axios.get(`${API}/offer/admin`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}