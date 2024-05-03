import { patchDataAPI  } from "../../../utils/fetchData";
import { GLOBALTYPES  } from './../globalTypes'

export const BLOQUEOSCOMMENT_TYPES = {
  LOADING:'LOADING',
  NOBLOQUEADO:'NOBLOQUEADO',
  BLOQUEADO: 'BLOQUEADO',
 
 
 

}

export const commentsinbloqueo= (user, auth) => async (dispatch) => {
  try {
   
    dispatch({type: BLOQUEOSCOMMENT_TYPES.LOADING, payload: true})
   
    const res = await patchDataAPI(`user/${user._id}/sinbloqueocomment`, { bloquecomment: 'non-bloque-comment' }, auth.token);
    dispatch({
      type: BLOQUEOSCOMMENT_TYPES.NOBLOQUEADO,
      payload: { user, res: res.data }
    });   
    
    dispatch({type: BLOQUEOSCOMMENT_TYPES.LOADING, payload: false})
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg }
    });
  }
};
 
export const commentconbloqueo = (user, auth) => async (dispatch) => {
  try {
    dispatch({type: BLOQUEOSCOMMENT_TYPES.LOADING, payload: true})

    const res = await patchDataAPI(`user/${user._id}/bloqueocomment`, { bloquecomment: 'bloque-comment' }, auth.token);
    dispatch({
      type: BLOQUEOSCOMMENT_TYPES.BLOQUEADO,
      payload: { user, res: res.data }
    });   
    
    dispatch({type: BLOQUEOSCOMMENT_TYPES.LOADING, payload: false})
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg }
    });
  }
};

 