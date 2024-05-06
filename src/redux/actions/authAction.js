import { GLOBALTYPES } from './globalTypes';
import { postDataAPI } from '../../utils/fetchData';
 
import { isPhone } from '../../utils/validation/valid';
 import validRegister from './../../utils/validation/validRegister';

import axios from 'axios';

 
// Acción para el inicio de sesión
export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPI('login', data);

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });

    localStorage.setItem('firstLogin', true);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response?.data?.msg || 'An error occurred.',
      },
    });
  }
};

// Acción para refrescar el token
export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem('firstLogin');
  if (firstLogin) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    try {
      const res = await postDataAPI('refresh_token');

      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response?.data?.msg || 'An error occurred.',
        },
      });
    }
  }
};

// Acción para registrar un usuario
export const register = (userRegister) => async (dispatch) => {
  const check = validRegister(userRegister);

  if (check.errLength > 0) {
    return dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: check.errMsg,
      },
    });
  }

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await axios.post('/register', userRegister);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response?.data?.msg || 'An error occurred.',
      },
    });
  }
};

// Acción para iniciar sesión con SMS
// Acción para iniciar sesión con SMS
export const loginSMS = (phone) => async (dispatch) => {
  if (!isPhone(phone)) {
    return dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        errors: 'El formato del número de teléfono es incorrecto.',
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
          errors: 'El número de teléfono no es válido para iniciar sesión.',
        },
      });
    }
  } catch (err) {
    const errorMsg = (err?.response?.data?.msg) || 'Ocurrió un error.';
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        errors: errorMsg,
      },
    });
  }
};

    

// Acción para verificar SMS
export const verifySMS = async (phone, dispatch) => {
  const code = prompt('Introduce el código que recibiste por SMS');
  if (!code) {
    return dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        errors: 'Se requiere un código para continuar.',
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
        payload: {
          success: res.data.msg,
        },
      });

      localStorage.setItem('logged', 'devat-channel');
    } else {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          errors: 'Verificación fallida.',
        },
      });
    }
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        errors: err.response?.data?.msg || 'Ocurrió un error.',
      },
    });
  }
};


// Acción para iniciar sesión con Google
// Corrected version
 
export const googleLogin = (id_token) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPI('google_login', { id_token });

    dispatch({ type: GLOBALTYPES.AUTH, payload: res.data });

    dispatch({type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });

    localStorage.setItem('logged', 'devat-channel');

  } catch (err) {
    const errorMessage = err.response?.data?.msg || 'An error occurred.';
    dispatch({ type: 'ALERT', payload: { errors: errorMessage } });
  }
};


// Acción para cerrar sesión
export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('firstLogin');
    localStorage.removeItem('logged');

    await postDataAPI('logout');

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: null,
        user: null,
      },
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: 'You have logged out successfully.',
      },
    });
  } catch (err) {
    const errorMessage = (err?.response?.data?.msg) || 'Ocurrió un error.';
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        errors: errorMessage,
      },
    });
  }
};

