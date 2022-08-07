import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../store/slices/authSlice';

import { Col, Row, Button, Checkbox, Form, Input } from 'antd';
import { Space, Table, Tag } from 'antd';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

import './Register.css';

function Register() {
    const dispatch = useDispatch();
    const authentication = getAuth();
    const navigate = useNavigate();
    const [rents, setRents] = useState();

    const onFinish = async (values) => {
        const { email, password, repeatPassword } = values;
        if (password !== repeatPassword) {
            alert('Passwords are not equal');
        } else {
            try {
                let user = await createUserWithEmailAndPassword(authentication, email, password);
                localStorage.setItem('Auth Token', user._tokenResponse.refreshToken);
                localStorage.setItem('userId', user.user.uid);
                localStorage.setItem('email', user.user.email);
                let currentUser = {
                    id: user.user.uid,
                    email: user.user.email
                }
                dispatch(authenticate(currentUser));
                navigate('/rents');
            } catch (error) {
                alert(error);
            }
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='registerContainer'>
            <Row justify='center'>
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
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                            {
                                type: 'email',
                                message: 'Email format is incorrect.'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                min: 6,
                                message: 'Password cannot be shorter than 6 symbols.'
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Repeat Password"
                        name="repeatPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                min: 6,
                                message: 'Password cannot be shorter than 6 symbols.'
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve()
                                    }

                                    return Promise.reject(new Error('The two passwords do not match!'))
                                }
                            })
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 10,
                            span: 14,
                        }}
                    >
                        <Button type="primary" htmlType="submit" className="submitBtn">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
        </div>
    )
}

export default Register