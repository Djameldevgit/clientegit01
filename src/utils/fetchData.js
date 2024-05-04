import axios from 'axios'
import { API_URL } from './config';
 
 axios.defaults.withCredentials=true
 

export const getDataAPI = async (url, token) => {
    const res = await axios.get(`${API_URL}/api/${url}`, {
        headers: { Authorization: token },
    });
    return res;
};

export const postDataAPI = async (url, post, token) => {
    const res = await axios.post(`${API_URL}/api/${url}`, post, {
        headers: { Authorization: token}
    })
    return res;
}

export const putDataAPI = async (url, post, token) => {
    const res = await axios.put(`${API_URL}/api/${url}`, post, {
        headers: { Authorization: token}
    })
    return res;
}

export const patchDataAPI = async (url, post, token) => {
    const res = await axios.patch(`${API_URL}/api/${url}`, post, {
        headers: { Authorization: token}
    })
    return res;
}

export const deleteDataAPI = async (url, token) => {
    const res = await axios.delete(`${API_URL}/api/${url}`, {
        headers: { Authorization: token}
    })
    return res;
}