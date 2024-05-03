import { patchDataAPI  } from "../../../utils/fetchData";
import { GLOBALTYPES  } from '../globalTypes'
export const ROLES_TYPES = { 
  USER_ROLENOIDANTIFIE:'USER_ROLENOIDANTIFIE',
  USER_ROLE: 'USER_ROLE',
  SUPERUSER_ROLE: 'SUPERUSER_ROLE',
  MODERADOR_ROLE:'MODERADOR_ROLE',
  ADMIN_ROLE:'ADMIN_ROLE',
 

}

export const roleusernoidentificado = (user, auth) => async (dispatch) => {
  try {
    const res = await patchDataAPI(`user/${user._id}/roleusernoidantificado`, { role: 'Utilisateur-No-authentifié' }, auth.token);
   
 
    dispatch({
      type: ROLES_TYPES.USER_ROLENOIDANTIFIE,
      payload: { user, res: res.data }
    });   
 

  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg }
    });
  }
};
 
export const roleuserautenticado = (user, auth) => async (dispatch) => {
  try {
    const res = await patchDataAPI(`user/${user._id}/roleuser`, { role: 'user' }, auth.token);
    dispatch({
      type: ROLES_TYPES.USER_ROLE,
      payload: { user, res: res.data }
    });   
    

  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg }
    });
  }
};

export const rolesuperuser = (user, auth) => async (dispatch) => {
  try {
    const res = await patchDataAPI(`user/${user._id}/rolesuperuser`, { role: 'superuser' }, auth.token);
    console.log(res.data)
   
    dispatch({
      type: ROLES_TYPES.SUPERUSER_ROLE,
      payload: { user, res: res.data }
    });
    
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg }
    });
  }
};

export const rolemoderador = (user, auth) => async (dispatch) => {
  try {
    const res = await patchDataAPI(`user/${user._id}/rolemoderador`, { role: 'moderador' }, auth.token);
     
    dispatch({
      type: ROLES_TYPES.MODERADOR_ROLE,
      payload: { user, res: res.data }
    });
   
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg }
    });
  }
};
export const roleadmin = (user, auth) => async (dispatch) => {
  try {
    const res = await patchDataAPI(`user/${user._id}/roleadmin`, { role: 'admin' }, auth.token);
     
    dispatch({
      type: ROLES_TYPES.ADMIN_ROLE,
      payload: { user, res: res.data }
    });
   
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg }
    });
  }
};

 