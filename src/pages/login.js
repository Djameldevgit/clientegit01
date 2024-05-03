import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout, Typography, Row, Col } from 'antd';
import LoginPass from '../components/auth/LoginPass';
import LoginSMS from '../components/auth/LoginSMS';
import SocialLogin from '../components/auth/SocialLogin'
const { Content } = Layout;
const { Title, Text } = Typography;

const Login = () => {
  const [sms, setSms] = useState(false);
  const history = useHistory();
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    if (auth.access_token) {
      const url = history.location.search.replace('?', '/');
      history.push(url);
    }
  }, [auth.access_token, history]);

  return (
    <Layout className="auth_page"  >
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
       
          <Content
            className="auth_box"
            style={{
              padding: '20px',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', // Sombra para el contenedor
              textAlign: 'center', // Centra el contenido
            }}
          >
            <Title level={3} className="text-uppercase mb-4">
              Connexion
            </Title>
            <div className='mb-2'> 
              <SocialLogin />
              </div> 
           

            {sms ? <LoginSMS /> : <LoginPass />}

            <Row gutter={16} className="my-2 text-primary" style={{ cursor: 'pointer' }}>
              <Col span={12}>
                <Link to="/forgot_password">Mot de passe oublié ?</Link>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }} onClick={() => setSms(!sms)}>
                {sms ? 'Se connecter avec un mot de passe' : 'Se connecter avec un SMS'}
              </Col>
            </Row>

            <Text>
              Vous n'avez pas de compte?{' '}
              <Link to={`/register${history.location.search}`} style={{ color: 'crimson' }}>
                Inscrivez-vous maintenant
              </Link>
            </Text>
          </Content>
       
      </Row>
    </Layout>
  );
};

export default Login;
