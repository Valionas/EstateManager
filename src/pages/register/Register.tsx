import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../store/slices/authSlice';

import { motion } from 'framer-motion';

import { Col, Row, Button, Checkbox, Form, Input, notification } from 'antd';
import { Space, Table, Tag } from 'antd';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import './Register.css';
import React from 'react';

function Register() {
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
        <Row justify="center">
          <Form
            name="basic"
            labelCol={{
              span: 12,
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
              label={<span className="authLabel authSpan">Email</span>}
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  type: 'email',
                  message: 'Email format is incorrect.',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={<span className="authLabel authSpan">Password</span>}
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  min: 6,
                  message: 'Password cannot be shorter than 6 symbols.',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label={<span className="authLabel authSpan">Repeat Password</span>}
              name="repeatPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  min: 6,
                  message: 'Password cannot be shorter than 6 symbols.',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item label={<span></span>}>
              <Button type="primary" htmlType="submit" className="submitBtn">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </div>
    </motion.div>
  );
}

export default Register;
