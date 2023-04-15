import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { authenticate } from '../../store/slices/authSlice';

import { motion } from 'framer-motion';

import { Row, Button, Form, Input, notification } from 'antd';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import './Register.css';
import { useTranslation } from 'react-i18next';

function Register() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authentication = getAuth();
  const navigate = useNavigate();
  const [rents, setRents] = useState();

  const userAlreadyExists = (type) => {
    notification[type]({
      message: 'Oops something wrong...',
      description: 'Someone is already using this email, please try a different one',
    });
  };

  const onFinish = async (values) => {
    const { email, password, repeatPassword } = values;
    if (password !== repeatPassword) {
      alert('Passwords are not equal');
    } else {
      try {
        let user = await createUserWithEmailAndPassword(authentication, email, password);
        localStorage.setItem('Auth Token', JSON.stringify(user.user.getIdToken()));
        localStorage.setItem('userId', user.user.uid);
        localStorage.setItem('email', user.user.email ? user.user.email : '');
        let currentUser = {
          id: user.user.uid,
          email: user.user.email,
        };
        dispatch(authenticate(currentUser));
        navigate('/rents');
      } catch (error) {
        userAlreadyExists('error');
      }
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
              span: 13,
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
                {
                  min: 6,
                  message: `${t('password_length_error')}`,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label={<span className="authLabel authSpan">{t('repeat_password')}</span>}
              name="repeatPassword"
              rules={[
                {
                  required: true,
                  message: `${t('missing_password_error')}`,
                },
                {
                  min: 6,
                  message: `${t('password_length_error')}`,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error(`${t('passwords_miss_match')}`));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item label={<span></span>}>
              <Button type="primary" htmlType="submit" className="submitBtn">
                {t('register_menu_label')}
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </div>
    </motion.div>
  );
}

export default Register;
