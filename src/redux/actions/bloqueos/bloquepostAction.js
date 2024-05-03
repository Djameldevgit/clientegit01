import { patchDataAPI  } from "../../../utils/fetchData";
import { GLOBALTYPES  } from './../globalTypes'

export const BLOQUEOSPOST_TYPES = {
  LOADING:'LOADING',
  NOBLOQUEADO:'NOBLOQUEADO',
  BLOQUEADO: 'BLOQUEADO',
  BLOQUEADOUSER: 'BLOQUEADOUSER',
  DESBLOQUEADOUSER: 'DESBLOQUEADOUSER',
 

}

export const postsinbloqueo= (user, auth) => async (dispatch) => {
  try {
   
    dispatch({type: BLOQUEOSPOST_TYPES.LOADING, payload: true})
   
    const res = await patchDataAPI(`user/${user._id}/sinbloqueopost`, { bloquepost: 'non-bloque-post' }, auth.token);
    dispatch({
      type: BLOQUEOSPOST_TYPES.NOBLOQUEADO,
      payload: { user, res: res.data }
    });   
    
    dispatch({type: BLOQUEOSPOST_TYPES.LOADING, payload: false})
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg }
    });
  }
};
 
export const postconbloqueo = (user, auth) => async (dispatch) => {
  try {
    dispatch({type: BLOQUEOSPOST_TYPES.LOADING, payload: true})

    const res = await patchDataAPI(`user/${user._id}/bloqueopost`, { bloquepost: 'bloque-post' }, auth.token);
    dispatch({
      type: BLOQUEOSPOST_TYPES.BLOQUEADO,
      payload: { user, res: res.data }
    });   
    
    dispatch({type: BLOQUEOSPOST_TYPES.LOADING, payload: false})
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg }
    });
  }
};

 
export const bloqueuser = (user, auth) => async (dispatch) => {
  try {
    dispatch({type: BLOQUEOSPOST_TYPES.LOADING, payload: true})

    const res = await patchDataAPI(`user/${user._id}/bloqueouser`, { bloquepost: 'bloque-user' }, auth.token);
    dispatch({
      type: BLOQUEOSPOST_TYPES.BLOQUEADOUSER,
      payload: { user, res: res.data }
    });   
    
    dispatch({type: BLOQUEOSPOST_TYPES.LOADING, payload: false})
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg }
    });
  }
};
export const nonlbloqueuser = (user, auth) => async (dispatch) => {
  try {
    dispatch({type: BLOQUEOSPOST_TYPES.LOADING, payload: true})

    const res = await patchDataAPI(`user/${user._id}/sinbloqueouser`, { bloquepost: 'non-bloque-user' }, auth.token);
    dispatch({
      type: BLOQUEOSPOST_TYPES.DESBLOQUEADOUSER,
      payload: { user, res: res.data }
    });   
    
    dispatch({type: BLOQUEOSPOST_TYPES.LOADING, payload: false})
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg }
    });
  }
};

 