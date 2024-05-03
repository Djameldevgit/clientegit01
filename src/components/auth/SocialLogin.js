import React from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
 
import { Button, Space } from 'antd';
 import { googleLogin } from '../../redux/actions/authAction';
 
const SocialLogin = () => {
  const dispatch = useDispatch();

  const onGoogleSuccess = (googleUser) => {
    const id_token = googleUser.getAuthResponse().id_token;
    dispatch(googleLogin(id_token));
  };

   

  return (
    <Space direction="vertical" size="middle">
      {/* Google Login con render personalizado */}
      <Button
    type="primary"
    style={{
      width: '100%',
      padding: '10px', // Padding estándar
      fontSize: '20px', // Tamaño de fuente más grande
      textAlign: 'center',
      lineHeight: '20px', // Controlar la altura de línea para centrar el texto
      display: 'flex', // Usar flex para alinear verticalmente
      alignItems: 'center', // Alinear verticalmente
      justifyContent: 'center', // Alinear horizontalmente
    }}
  >
        <GoogleLogin
          clientId="15506177091-ufhqvm86uq4417pum6f4tsa1670j6v43.apps.googleusercontent.com"
          onSuccess={onGoogleSuccess}
          render={(renderProps) => (
            <span onClick={renderProps.onClick}>
              Iniciar sesión con Google
            </span>
          )}
        />
      </Button>

     
      
    </Space>
  );
};

export default SocialLogin;
