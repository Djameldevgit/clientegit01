import axios from 'axios'

// Establecer la URL base dependiendo del entorno (producción o desarrollo)
const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://tu-api.com' // URL de tu servidor en producción
  : 'http://localhost:5000'; // URL de tu servidor en desarrollo

// Función para GET request
export const getDataAPI = async (url, token) => {
    const res = await axios.get(`${baseURL}/api/${url}`, {
        headers: { Authorization: token }
    })
    return res;
}

// Función para POST request
export const postDataAPI = async (url, post, token) => {
    const res = await axios.post(`${baseURL}/api/${url}`, post, {
        headers: { Authorization: token }
    })
    return res;
}

// Función para PUT request
export const putDataAPI = async (url, post, token) => {
    const res = await axios.put(`${baseURL}/api/${url}`, post, {
        headers: { Authorization: token }
    })
    return res;
}

// Función para PATCH request
export const patchDataAPI = async (url, post, token) => {
    const res = await axios.patch(`${baseURL}/api/${url}`, post, {
        headers: { Authorization: token }
    })
    return res;
}

// Función para DELETE request
export const deleteDataAPI = async (url, token) => {
    const res = await axios.delete(`${baseURL}/api/${url}`, {
        headers: { Authorization: token }
    })
    return res;
}
