import { GLOBALTYPES } from './globalTypes';
import { getDataAPI ,postDataAPI} from '../../utils/fetchData';
import { isPhone } from '../../utils/validation/valid';
 import validRegister from './../../utils/validation/validRegister';
 
export const login = (data) => async (dispatch) => {
  try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
      const res = await postDataAPI('login', data)
      dispatch({ 
          type: GLOBALTYPES.AUTH, 
          payload: {
              token: res.data.access_token,
              user: res.data.user
          } 
      })

      localStorage.setItem("firstLogin", true)
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

//Cuando el token de acceso está próximo a expirar o ha expirado, el cliente activa la acción refreshToken, que envía automáticamente una solicitud al servidor para renovar el token de acceso utilizando el token de actualización almacenado en una cookie en el navegador del usuario.
// Action pour rafraîchir le token
export const refreshToken = () => async (dispatch) => {//sta acción refreshToken se encarga de renovar el token de acceso utilizando el token de actualización almacenado en una cookie en el navegador, si el usuario ha iniciado sesión previamente (marcado por "firstLogin" en el almacenamiento local). Esto ayuda a mantener al usuario autenticado y a garantizar que puedan seguir accediendo a recursos protegidos de la aplicación sin necesidad de volver a iniciar sesión manualmente.
//mientras el token de actualización esté vigente, el cliente puede usar la acción refreshToken para renovar automáticamente el token de acceso sin requerir que el usuario vuelva a iniciar sesión manualmente.
  const firstLogin = localStorage.getItem("firstLogin")
     if(firstLogin){
         dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
 
         try {
             const res = await  getDataAPI('/refresh_token')
       
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
  const check = validRegister(data);
  if (check.errLength > 0) {
    return dispatch({
      type: GLOBALTYPES.ALERT,
      payload: check.errMsg.map((msg) => ({ error: msg })),
    });
  }

  try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPI('register', data);
   
   
      dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { success: res.data.msg },
      });
 

  } catch (err) {
      dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {
              error: err.response?.data?.msg || 'Une erreur est survenue. Veuillez réessayer.',
          },
      });
  }
};
 
/*
export const register = (data) => async (dispatch) => {
  const check = validRegister(data)
  if(check.errLength > 0)
  return dispatch({type: GLOBALTYPES.ALERT, payload: check.errMsg})

  try {
      dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})

      const res = await postDataAPI('register', data)
       
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
 */
// Action pour se connecter avec SMS
export const loginSMS = (phone) => async (dispatch) => {
  if (!isPhone(phone)) {
    return dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        errors: 'Le format du numéro de téléphone est incorrect.',
      },
    });
  }

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPI('login_sms', { phone });

    if (res.data && res.data.valid) {
      verifySMS(phone, dispatch);
    } else {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          errors: 'Le numéro de téléphone n\'est pas valide pour la connexion.',
        },
      });
    }
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        errors: err.response?.data?.msg || 'Une erreur est survenue.',
      },
    });
  }
};
 
// Action pour vérifier le SMS
export const verifySMS = async (phone, dispatch) => {
  const code = prompt('Veuillez entrer le code reçu par SMS');
  if (!code) {
    return dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        errors: 'Un code est nécessaire pour continuer.',
      },
    });
  }

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPI('sms_verify', { phone, code });

    if (res.data) {
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.msg },
      });

      localStorage.setItem('logged', 'devat-channel');
    } else {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          errors: 'Échec de la vérification.',
        },
      });
    }
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        errors: err.response?.data?.msg || 'Une erreur est survenue.',
      },
    });
  }
};

// Action pour se connecter avec Google
export const googleLogin = (id_token) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPI('google_login', { id_token });

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: res.data,
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.msg },
    });

    localStorage.setItem('logged', 'devat-channel');
  } catch (err) {
    const errorMessage = err.response?.data?.msg || 'Impossible de se connecter. Veuillez réessayer.';
    dispatch({
      type: 'ALERT',
      payload: { errors: errorMessage },
    });
  }
};

// Action pour se déconnecter
export const logout = () => async (dispatch) => {
  try {
      localStorage.removeItem('firstLogin');
      await postDataAPI('logout');
      window.location.href = "/login";
  } catch (err) {
      dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {
              error: err.response?.data?.msg || 'Une erreur est survenue.',
          },
      });
  }
};


