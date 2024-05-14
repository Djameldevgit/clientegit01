import axios from 'axios';
import SERVER_URL from './config';

export const getDataAPI = async (url, token) => {
    const res = await axios.get(`${SERVER_URL}/api/${url}`, {
        headers: { Authorization: token }
    });
    return res;
}

export const postDataAPI = async (url, post, token) => {
    const res = await axios.post(`${SERVER_URL}/api/${url}`, post, {
        headers: { Authorization: token }
    });
    return res;
}

export const putDataAPI = async (url, post, token) => {
    const res = await axios.put(`${SERVER_URL}/api/${url}`, post, {
        headers: { Authorization: token }
    });
    return res;
}

export const patchDataAPI = async (url, post, token) => {
    const res = await axios.patch(`${SERVER_URL}/api/${url}`, post, {
        headers: { Authorization: token }
    });
    return res;
}

export const deleteDataAPI = async (url, token) => {
    const res = await axios.delete(`${SERVER_URL}/api/${url}`, {
        headers: { Authorization: token }
    });
    return res;
}
