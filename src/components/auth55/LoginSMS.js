import React from 'react';
import { useDispatch } from 'react-redux';
import { loginSMS } from '../../redux/actions/authAction';
import { Form, Input, Button } from 'antd';

const LoginSMS = () => {
  const dispatch = useDispatch(); // Obtenemos dispatch para enviar acciones

  const handleSubmit = (values) => {
 
    
    // Enviar la acción loginSMS con el número de teléfono
    dispatch(loginSMS(values.phone)); 
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Número de teléfono"
        name="phone"
        rules={[{ required: true, message: 'Por favor, ingresa tu número de teléfono.' }]}
      >
        <Input type="text" placeholder="+21357548548" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Iniciar sesión
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginSMS;
