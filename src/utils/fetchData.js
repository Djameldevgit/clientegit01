import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true; // Asegura que las cookies se envíen en las solicitudes CORS

// Funciones de API
export const getDataAPI = async (url, token) => {
    try {
        const res = await axios.get(`/api/${url}`, {
            headers: { Authorization: token }
        });
        return res.data; // Devuelve solo los datos de la respuesta
    } catch (error) {
        throw error; // Lanza el error para manejarlo en el componente que llama a esta función
    }
};

export const postDataAPI = async (url, post, token) => {
    try {
        const res = await axios.post(`/api/${url}`, post, {
            headers: { Authorization: token }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const putDataAPI = async (url, post, token) => {
    try {
        const res = await axios.put(`/api/${url}`, post, {
            headers: { Authorization: token }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const patchDataAPI = async (url, post, token) => {
    try {
        const res = await axios.patch(`/api/${url}`, post, {
            headers: { Authorization: token }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const deleteDataAPI = async (url, token) => {
    try {
        const res = await axios.delete(`/api/${url}`, {
            headers: { Authorization: token }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};
