import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Si BASE_URL es `undefined`, debes manejar el error o proporcionar un valor predeterminado
if (!BASE_URL) {
    console.error("La variable de entorno REACT_APP_BASE_URL no está definida.");
}


// Función para obtener datos de la API
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

// Función para actualizar datos (PUT)
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
