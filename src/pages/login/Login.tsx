import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { authenticate } from '../../store/slices/authSlice';

import { motion } from 'framer-motion';

import { Col, Row, Button, Checkbox, Form, Input, notification } from 'antd';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { useTranslation } from 'react-i18next';
import './Login.css';

function Login() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authentication = getAuth();
  const navigate = useNavigate();

  const [rents, setRents] = useState();

  const openWrongCredentialsNotification = (type) => {
    notification[type]({
      message: `${t('auth_something_wrong')}`,
      description: `${t('auth_error_description')}`,
    });
  };

  const onFinish = async (values) => {
    const { email, password } = values;

    try {
      let user = await signInWithEmailAndPassword(authentication, email, password);
      let tokenResult = await user.user.getIdTokenResult();
      localStorage.setItem('Auth Token', JSON.stringify(tokenResult.token));
      localStorage.setItem('userId', user.user.uid);
      localStorage.setItem('email', user.user.email ? user.user.email : '');
      let currentUser = {
        id: user.user.uid,
        email: user.user.email,
      };
      dispatch(authenticate(currentUser));
      navigate('/rents');
    } catch (error) {
      openWrongCredentialsNotification('error');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <div className="authContainer">
        <Row justify="center" className="formRow">
          <Form
            name="basic"
            labelCol={{
              span: 10,
            }}
            wrapperCol={{
              span: 14,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label={<span className="authLabel authSpan">{t('email')}</span>}
              name="email"
              rules={[
                {
                  required: true,
                  message: `${t('missing_email_error')}`,
                },
                {
                  type: 'email',
                  message: `${t('wrong_email_format')}`,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={<span className="authLabel authSpan">{t('password')}</span>}
              name="password"
              rules={[
                {
                  required: true,
                  message: `${t('missing_password_error')}`,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item label={<span></span>}>
              <Button type="primary" htmlType="submit" className="submitBtn authSpan">
                {t('login_menu_label')}
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </div>
    </motion.div>
  );
}

export default Login;
