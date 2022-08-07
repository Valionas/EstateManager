import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../store/slices/authSlice';

import { Col, Row, Button, Checkbox, Form, Input } from 'antd';
import { Space, Table, Tag } from 'antd';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import './Login.css';

function Login() {
    const dispatch = useDispatch();
    const authentication = getAuth();
    const navigate = useNavigate();

    const [rents, setRents] = useState();

    const onFinish = async (values) => {
        const { email, password } = values;

        try {
            let user = await signInWithEmailAndPassword(authentication, email, password);
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

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='loginContainer'>
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
                        <Button type="primary" htmlType="submit" className='submitBtn'>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
        </div>
    )
}

export default Login