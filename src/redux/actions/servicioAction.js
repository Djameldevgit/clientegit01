import { GLOBALTYPES } from './globalTypes';
import { imageUpload } from '../../utils/imageUpload';
import { getDataAPI, patchDataAPI, deleteDataAPI, putDataAPI } from '../../utils/fetchData';
import { createNotify, removeNotify } from './notifyAction'

export const SERVICIO_TYPES = {
    LOADING_SERVICIO: 'LOADING_SERVICIO',
    GET_SERVICIOS: 'GET_SERVICIOS',
    UPDATE_SERVICIO: 'UPDATE_SERVICIO',
    GET_SERVICIO: 'GET_SERVICIO',
    LIKE_SERVICIO: 'LIKE_SERVICIO',
    INCREMENT_VIEWS: 'INCREMENT_VIEWS'
};

export const getServicios = () => async (dispatch) => {
    try {
        dispatch({ type: SERVICIO_TYPES.LOADING_SERVICIO, payload: true });
        const res = await getDataAPI('servicios');

        dispatch({
            type: SERVICIO_TYPES.GET_SERVICIOS,
            payload: { ...res.data, page: 2 }
        });

        dispatch({ type: SERVICIO_TYPES.LOADING_SERVICIO, payload: false });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
};

export const updateServicio = ({ servicioData, wilaya, commune, images, auth, statusservicio }) => async (dispatch) => {
    let media = [];
    const imgNewUrl = images.filter((img) => !img.url);
    const imgOldUrl = images.filter((img) => img.url);

    if (
        statusservicio.servicioData === servicioData &&
 
        imgNewUrl.length === 0 &&
        imgOldUrl.length === statusservicio.images.length
    ) {
        return;
    }

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl);

        const updatedData = {
            contentservicio: servicioData.contentservicio,
           
            
            direcion: servicioData.direcion,
            wilaya,
            commune,
          
            discripcion: servicioData.discripcion,
            priceservicio: servicioData.priceservicio,
            dinero: servicioData.dinero,
            negociable: servicioData.negociable,
            nomprenom: servicioData.nomprenom,
            telefono: servicioData.telefono,
            email: servicioData.email,
            web: servicioData.web,
            informacion: servicioData.informacion,
         
            images: [...imgOldUrl, ...media]
        };

        const res = await patchDataAPI(`servicio/${statusservicio._id}`, updatedData, auth.token);

        dispatch({ type: SERVICIO_TYPES.UPDATE_SERVICIO, payload: res.data.newServicio });

        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg },
        });
    }
};

export const likeServicio = ({ servicio, auth, socket }) => async (dispatch) => {
    const newServicio = { ...servicio, likes: [...servicio.likes, auth.user] };
    dispatch({ type: SERVICIO_TYPES.LIKE_SERVICIO, payload: newServicio });

    socket.emit('likeServicio', newServicio);

    try {
        await patchDataAPI(`servicio/${servicio._id}/like`, null, auth.token);

        // Notify
        const msg = {
            id: auth.user._id,
            text: 'a aimé votre service.',
            recipients: [servicio.user._id],
            url: `/servicio/${servicio._id}`,
            contentservicio: servicio.contentservicio,
            image: servicio.images[0].url
        };

        dispatch(createNotify({ msg, auth, socket }));

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
};
export const unLikeServicio = ({ servicio, auth, socket }) => async (dispatch) => {
    const newServicio = { ...servicio, likes: servicio.likes.filter(like => like._id !== auth.user._id) };
    dispatch({ type: SERVICIO_TYPES.UPDATE_SERVICIO, payload: newServicio });

    socket.emit('unLikeServicio', newServicio);

    try {
        await patchDataAPI(`servicio/${servicio._id}/unlike`, null, auth.token);

        // Notify
        const msg = {
            id: auth.user._id,
            text: 'a aimé votre publication service.',
            recipients: [servicio.user._id],
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

export const getServicio = ({ detailServicio, id }) => async (dispatch) => {
    if (detailServicio.every(servicio => servicio._id !== id)) {
        try {
            const res = await getDataAPI(`servicio/${id}`);

            dispatch({ type: SERVICIO_TYPES.GET_SERVICIO, payload: res.data.servicio });
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.msg }
            });
        }
    }
};

export const deleteServicio = ({ servicio, auth, socket }) => async (dispatch) => {
    dispatch({ type: SERVICIO_TYPES.DELETE_SERVICIO, payload: servicio });

    try {
        const res = await deleteDataAPI(`servicio/${servicio._id}`, auth.token);

        // Notify
        const msg = {
            id: servicio._id,
            text: 'a suprime publication.',
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

export const saveServicio = ({ servicio, auth }) => async (dispatch) => {
    const newUser = { ...auth.user, saved: [...auth.user.saved, servicio._id] };
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

    try {
        await patchDataAPI(`saveServicio/${servicio._id}`, null, auth.token);
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
};

export const unSaveServicio = ({ servicio, auth }) => async (dispatch) => {
    const newUser = { ...auth.user, saved: auth.user.saved.filter(id => id !== servicio._id) };
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

    try {
        await patchDataAPI(`unSaveServicio/${servicio._id}`, null, auth.token);
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
};

export const incrementServicioViews = ({ servicio, auth }) => async (dispatch) => {
    try {
        await putDataAPI(`servicio/${servicio._id}`, auth.token);
        dispatch({ type: SERVICIO_TYPES.INCREMENT_VIEWS, payload: servicio._id });
    } catch (error) {
        console.error(error);
    }
};