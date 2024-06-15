import axios from 'axios';

// Configuración de axios
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true, // Asegura que las cookies se envíen en las solicitudes CORS
});

// Funciones de API
export const getDataAPI = async (url, token) => {
    try {
        const res = await axiosInstance.get(`/api/${url}`, {
            headers: { Authorization: token }
        });
        return res.data; // Devuelve solo los datos de la respuesta
    } catch (error) {
        throw error; // Lanza el error para manejarlo en el componente que llama a esta función
    }
};

export const postDataAPI = async (url, post, token) => {
    try {
        const res = await axiosInstance.post(`/api/${url}`, post, {
            headers: { Authorization: token }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const putDataAPI = async (url, post, token) => {
    try {
        const res = await axiosInstance.put(`/api/${url}`, post, {
            headers: { Authorization: token }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const patchDataAPI = async (url, post, token) => {
    try {
        const res = await axiosInstance.patch(`/api/${url}`, post, {
            headers: { Authorization: token }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const deleteDataAPI = async (url, token) => {
    try {
        const res = await axiosInstance.delete(`/api/${url}`, {
            headers: { Authorization: token }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

