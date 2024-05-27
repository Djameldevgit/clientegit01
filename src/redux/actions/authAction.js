import { GLOBALTYPES } from './globalTypes'
import { postDataAPI } from '../../utils/fetchData'
import valid from '../../utils/valid'
import axios from 'axios'
//import { useHistory } from 'react-router-dom';

export const login = (data) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        const res = await postDataAPI('login', data)
        dispatch({ //está extrayendo el token de acceso de la respuesta del servidor y almacenándolo en la aplicación cliente para su uso posterior en las solicitudes que requieran autenticación.
           
            type: GLOBALTYPES.AUTH,  payload: {// En esa parte del código, el token de acceso (access_token) y la información del usuario (user) se están guardando en el estado global de la aplicación bajo la acción GLOBALTYPES.AUTH. Esto significa que una vez que el usuario ha iniciado sesión correctamente, el token de acceso y la información del usuario se almacenan en el estado global de la aplicación, lo que permite que la aplicación acceda a esta información desde cualquier parte donde se necesite, como componentes de React o acciones posteriores en el flujo de la aplicación
                token: res.data.access_token,
                user: res.data.user
            } 
        })

        localStorage.setItem("firstLogin", true)  //localStorage.setItem("firstLogin", true): Esta línea de código establece un valor en el almacenamiento local del navegador llamado "firstLogin" y le asigna el valor true. El propósito de esto parece ser marcar que el usuario ha iniciado sesión por primera vez. Esta marca puede ser útil para identificar si es la primera vez que un usuario inicia sesión en la aplicación, lo que puede ser útil para realizar ciertas acciones o mostrar cierta información de bienvenida en futuras sesiones.
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                success: res.data.msg
            } 
        })
        
    } catch (err) {
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                error: err.response.data.msg
            } 
        })
    }
}


export const refreshToken = () => async (dispatch) => {//sta acción refreshToken se encarga de renovar el token de acceso utilizando el token de actualización almacenado en una cookie en el navegador, si el usuario ha iniciado sesión previamente (marcado por "firstLogin" en el almacenamiento local). Esto ayuda a mantener al usuario autenticado y a garantizar que puedan seguir accediendo a recursos protegidos de la aplicación sin necesidad de volver a iniciar sesión manualmente.

 const firstLogin = localStorage.getItem("firstLogin")
    if(firstLogin){
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })

        try {
            const res = await postDataAPI('refresh_token')
            dispatch({ 
                type: GLOBALTYPES.AUTH, 
                payload: {
                    token: res.data.access_token,
                    user: res.data.user
                } 
            })

            dispatch({ type: GLOBALTYPES.ALERT, payload: {} })

        } catch (err) {
            dispatch({ 
                type: GLOBALTYPES.ALERT, 
                payload: {
                    error: err.response.data.msg
                } 
            })
        }
    }
}

export const register = (data) => async (dispatch) => {
    const check = valid(data);
    if (check.errLength > 0)
        return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg });

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res=  await axios.post('/user/register', data);
  
         

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                msg: res.data.msg
            },
        });
    } catch (err) {
        console.error('Error en el bloque catch:', err);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg,
            },
        });
    }
};


export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('firstLogin')
        await postDataAPI('logout')
        window.location.href = "/login"
    } catch (err) {
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                error: err.response.data.msg
            } 
        })
    }
}