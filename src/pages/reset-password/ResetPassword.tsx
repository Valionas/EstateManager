import { motion } from 'framer-motion';

import { Row, Button, Form, Input, notification } from 'antd';

import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import './ResetPassword.css';

function ResetPassword() {
  const authentication = getAuth();

  const openWrongCredentialsNotification = (type) => {
    notification[type]({
      message: 'Oops something wrong...',
      description: 'Please check your email or password input',
    });
  };

  const onFinish = async (values) => {
    const { email } = values;

    try {
      await sendPasswordResetEmail(authentication, email);
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
            <Form.Item label={<span></span>}>
              <Button type="primary" htmlType="submit" className="submitBtn authSpan">
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </div>
    </motion.div>
  );
}

export default ResetPassword;
