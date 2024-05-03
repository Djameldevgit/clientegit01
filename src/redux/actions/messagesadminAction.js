 
import { GLOBALTYPES } from '../actions/globalTypes';
import { postDataAPI, getDataAPI  } from '../../utils/fetchData'
 

export const MESSAGEADMIN_TYPE = {
    CREATE_MESSAGES: 'CREATE_MESSAGES',
    GET_MESSAGES: 'GET_MESSAGES',
    DELETE_MESSAGES: 'DELETE_MESSAGES'
};

 

export const createMessageAdmin = ({  descripcion,email,asunto,auth  }) => async (dispatch) => {
    console.log(descripcion,email,asunto)
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        // Realizar la solicitud HTTP para crear el mensaje
        const res = await postDataAPI('mensajes', { descripcion,email,asunto }, auth.token);
 
 
            // Si la solicitud es exitosa y devuelve datos
            // Despachar la acción para crear el mensaje con los datos recibidos
            dispatch({
                type: MESSAGEADMIN_TYPE.CREATE_MESSAGES,
                payload: { ...res.data.newMensaje, user: auth.user }
            });

            // Crear la notificación
           

            // Despachar la acción para crear la notificación
    
            // Si la respuesta es inesperada o no contiene los datos esperados
            // Despachar una alerta con un mensaje de error
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: 'Error al enviar el mensaje.' }
            });
       

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    } catch (err) {
        // Si ocurre un error durante la solicitud HTTP
        // Despachar una alerta con el mensaje de error recibido en la respuesta
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg || 'Error de servidor.' }
        });
    }
};


export const getmessageadmin = (token) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        const res = await getDataAPI('mensajes', token)

        dispatch({
            type: MESSAGEADMIN_TYPE.GET_MESSAGES,
            payload: { ...res.data, page: 2 }
        })

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const deletemessageadmin = () => () => {
    // Implementar eliminar mensaje del administrador
};
