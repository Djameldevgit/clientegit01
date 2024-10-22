import { GLOBALTYPES } from './globalTypes'
import { imageUpload } from '../../utils/imageUpload'
import {   getDataAPI, patchDataAPI, deleteDataAPI } from '../../utils/fetchData'
import {  removeNotify } from './notifyAction'

export const USER_TYPES = {
    LOADING_USER: 'LOADING_USER',
    GET_USERS: 'GET_USERS',
    UPDATE_USER: 'UPDATE_USER',
    GET_USER: 'GET_USER',
    DELETE_USER: 'DELETE_USER',
    GET_ACTIVE_USERS_LAST_24H: 'GET_ACTIVE_USERS_LAST_24H',  // Nueva acción
    GET_ACTIVE_USERS_LAST_3H: 'GET_ACTIVE_USERS_LAST_3H'     // Nueva acción
}

// userActions.js
 
export const fetchTotalUsersCount = (token) => async (dispatch) => {
    try {
        const res = await getDataAPI('users/count', token); // Llama al endpoint que cuenta los usuarios
        console.log(res)
        dispatch({ type: USER_TYPES.GET_TOTAL_USERS_COUNT, payload: res.data.count });
    } catch (error) {
        console.error('Error al obtener el total de usuarios:', error);
    }
};



// Acción para obtener usuarios activos en las últimas 24 horas
export const getActiveUsersLast24h = (token) => async (dispatch) => { 
    try {
        const res = await getDataAPI('users/active-last-24h', token);
        dispatch({
            type: USER_TYPES.GET_ACTIVE_USERS_LAST_24H,
            payload:  res.data.users, page: 2  // Asegúrate de extraer la lista de usuarios
        });
    } catch (error) {
        console.error(error);
    }
};

export const getActiveUsersLast3h = (token) => async (dispatch) => { 
    try {
        const res = await getDataAPI('users/active-last-3h', token);
        dispatch({
            type: USER_TYPES.GET_ACTIVE_USERS_LAST_3H,
            payload:  res.data.users, page: 2   // Asegúrate de extraer la lista de usuarios
        });
    } catch (error) {
        console.error(error);
    }
};


 

export const getUsers = (token) => async (dispatch) => {
    try {
        dispatch({ type: USER_TYPES.LOADING_USER, payload: true })
        const res = await getDataAPI('users', token)
        
        dispatch({
            type: USER_TYPES.GET_USERS,
            payload: {...res.data, page: 2}
        })

        dispatch({ type: USER_TYPES.LOADING_USER, payload: false })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const updateUser = ({content, images, auth, status}) => async (dispatch) => {
    let media = []
    const imgNewUrl = images.filter(img => !img.url)
    const imgOldUrl = images.filter(img => img.url)

    if(status.content === content 
        && imgNewUrl.length === 0
        && imgOldUrl.length === status.images.length
    ) return;

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        if(imgNewUrl.length > 0) media = await imageUpload(imgNewUrl)

        const res = await patchDataAPI(`user/${status._id}`, { 
            content, images: [...imgOldUrl, ...media] 
        }, auth.token)

        dispatch({ type: USER_TYPES.UPDATE_USER, payload: res.data.newUser })

        dispatch({ type: GLOBALTYPES.ALERT, payload: {success: res.data.msg} })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

 

 

export const getUser = ({detailUser, id, auth}) => async (dispatch) => {
    if(detailUser.every(user => user._id !== id)){
        try {
            const res = await getDataAPI(`user/${id}`, auth.token)
            dispatch({ type: USER_TYPES.GET_USER, payload: res.data.user })
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {error: err.response.data.msg}
            })
        }
    }
}

export const deleteUser = ({user, auth, socket}) => async (dispatch) => {
    dispatch({ type: USER_TYPES.DELETE_USER, payload: user })

    try {
        const res = await deleteDataAPI(`user/${user._id}`, auth.token)

        // Notify
        const msg = {
            id: user._id,
            text: 'added a new user.',
            recipients: res.data.newUser.user.followers,
            url: `/user/${user._id}`,
        }
        dispatch(removeNotify({msg, auth, socket}))
        
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

  