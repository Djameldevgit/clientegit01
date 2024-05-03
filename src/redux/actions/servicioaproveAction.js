import { GLOBALTYPES } from './globalTypes';
import { imageUpload } from '../../utils/imageUpload';
import { postDataAPI, getDataAPI, patchDataAPI, deleteDataAPI } from '../../utils/fetchData';
import { createNotify, removeNotify } from './notifyAction';

export const SERVICIOAPROVE_TYPES = {
    GET_SERVICIOS_PENDIENTES: 'GET_SERVICIOS_PENDIENTES',
    CREATE_SERVICIO_PENDIENTE: 'CREATE_SERVICIO_PENDIENTE',
    APROVE_SERVICIO_PENDIENTE: 'APROVE_SERVICIO_PENDIENTE',
    DELETE_SERVICIO_PENDIENTE: 'DELETE_SERVICIO_PENDIENTE',
    LOADING_SERVICIO: 'LOADING_SERVICIO',
};

export const createServicioPendiente = ({ servicioData,   wilaya, commune,   images, auth, socket }) => async (dispatch) => {
    let media = [];
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        if (images.length > 0) media = await imageUpload(images);

        const res = await postDataAPI('crearserviciopendiente', { ...servicioData,   wilaya, commune,  images: media }, auth.token);

        dispatch({
            type: SERVICIOAPROVE_TYPES.CREATE_SERVICIO_PENDIENTE,
            payload: { ...res.data.newServicio, user: auth.user }
        });

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
       
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                success: res.data.msg
            } 
        });
        // Notify
        const msg = {
            id: res.data.newServicio._id,
            text: 'ajouter une nouvelle publication service.',
            recipients: res.data.newServicio.user.followers,
            url: `/servicio/${res.data.newServicio._id}`,
            image: media[0].url
        };

        dispatch(createNotify({ msg, auth, socket }));

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
};

export const getServiciosPendientesss = (token) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        const res = await getDataAPI('getserviciospendientes', token);
         
        dispatch({
            type: SERVICIOAPROVE_TYPES.GET_SERVICIOS_PENDIENTES,
            payload: { ...res.data, page: 2 }
        });

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
};

export const aprovarServicioPendiente = (servicio, estado, auth) => async (dispatch) => {
    try {
        dispatch({ type: SERVICIOAPROVE_TYPES.LOADING_SERVICIO, payload: true });
      
        const res = await patchDataAPI(`aprovarservicio/${servicio._id}/aprovado`, { estado }, auth.token);

        dispatch({
            type: SERVICIOAPROVE_TYPES.APROVE_SERVICIO_PENDIENTE,
            payload: res.data,
        });

        dispatch({ type: SERVICIOAPROVE_TYPES.LOADING_SERVICIO, payload: false });
        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (error) {
        const errorMsg = error.response ? error.response.data.msg : 'Unexpected error occurred';
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: errorMsg },
        });
    }
};

export const deleteServicioPendiente = ({ servicio, auth, socket }) => async (dispatch) => {
    dispatch({ type: SERVICIOAPROVE_TYPES.DELETE_SERVICIO_PENDIENTE, payload: servicio });

    try {
        const res = await deleteDataAPI(`servicio/${servicio._id}`, auth.token);

        // Notify
        const msg = {
            id: servicio._id,
            text: 'suprimer une publication.',
            recipients: res.data.newServicio.user.followers,
            url: `/servicio/${servicio._id}`,
        };
        dispatch(removeNotify({ msg, auth, socket }));

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
};
