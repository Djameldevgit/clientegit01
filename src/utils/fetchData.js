import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log('Base URL:', process.env.REACT_APP_BASE_URL);
// Función para obtener datos de la API
export const getDataAPI = async (url, token) => {
    const res = await axios.get(`${BASE_URL}/${url}`, {
        headers: { Authorization: token },
    });
    return res;
};
export const postDataAPI = async (url, token) => {
    const res = await axios.get(`${BASE_URL}/${url}`, {
        headers: { Authorization: token },
    });
    return res;
};
/*
export const getDataAPI = async (url, token) => {
    const res = await axios.get(`${BASE_URL}/${url}`, {
        headers: { Authorization: token }
    });
    return res;
};

// Función para enviar datos a la API (POST)
export const postDataAPI = async (url, data, token) => {
    const res = await axios.post(`${BASE_URL}/${url}`, data, {
        headers: { Authorization: token }
    });
    return res;
};
*/
 
export const putDataAPI = async (url, data, token) => {
    const res = await axios.put(`${BASE_URL}/${url}`, data, {
        headers: { Authorization: token }
    });
    return res;
};

// Función para actualizar datos parcialmente (PATCH)
export const patchDataAPI = async (url, data, token) => {
    const res = await axios.patch(`${BASE_URL}/${url}`, data, {
        headers: { Authorization: token }
    });
    return res;
};

// Función para eliminar datos (DELETE)
export const deleteDataAPI = async (url, token) => {
    const res = await axios.delete(`${BASE_URL}/${url}`, {
        headers: { Authorization: token }
    });
    return res;
};
