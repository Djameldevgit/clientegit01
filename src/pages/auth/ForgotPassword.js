import React, { useState } from 'react';
import { Form, Input, Button, Alert, Row, Col, Typography, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import { isAccount } from '../../utils/validation/valid';
 
const initialState = {
  account: '',
  err: '',
  success: '',
};

const ForgotPassword = () => {
  const [data, setData] = useState(initialState);
  const { account, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: '', success: '' });
  };

  const forgotPassword = async () => {
    if (!isAccount(account)) {
      message.error("Adresse compte n'est pas valide.");
      return;
    }

    try {
      const res = await axios.post('/api/forgot', { account });
      setData({ ...data, err: '', success: res.data.msg });
    } catch (error) {
      const errorMsg = error.response?.data?.msg || "Une erreur est survenue.";
      setData({ ...data, err: errorMsg, success: '' });
      message.error(errorMsg);
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: '100vh',
        background: '#f5f5f5', // Fondo gris claro para destacar el formulario
        padding: '16px', // Espaciado interno
      }}
    >
      <Col
        xs={24}
        sm={16}
        md={8}
        style={{
          backgroundColor: '#ffffff', // Fondo blanco para el formulario
          padding: '24px', // Espaciado alrededor del formulario
          borderRadius: '8px', // Bordes redondeados
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', // Sombra para el formulario
        }}
      >
        <Typography.Title level={3} style={{ textAlign: 'center', marginBottom: '24px' }}>
          Mot de passe oublié ?
        </Typography.Title>

        {err && <Alert message={err} type="error" showIcon style={{ marginBottom: '16px' }} />}
        {success && <Alert message={success} type="success" showIcon style={{ marginBottom: '16px' }} />}

        <Form onFinish={forgotPassword}>
          <Form.Item
            label="Adresse e-mail"
            name="account"
            rules={[{ required: true, message: "Veuillez entrer votre adresse e-mail." }]}
          >
            <Input
              prefix={<MailOutlined />}
              type="account"
              placeholder="Entrez votre e-mail"
              value={account}
              onChange={handleChangeInput}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Vérifier votre e-mail
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default ForgotPassword;
