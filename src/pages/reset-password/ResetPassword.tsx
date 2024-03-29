import { motion } from 'framer-motion';

import { Row, Button, Form, Input, notification } from 'antd';

import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import './ResetPassword.css';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const { t } = useTranslation();
  const authentication = getAuth();
  const navigate = useNavigate();
  const openWrongCredentialsNotification = (type) => {
    notification[type]({
      message: `${t('auth_something_wrong')}`,
      description: `${t('auth_error_email_description')}`,
    });
  };

  const onFinish = async (values) => {
    const { email } = values;

    try {
      await sendPasswordResetEmail(authentication, email);
      notification['success']({
        message: `${t('reset_pass_message')}`,
        description: `${t('reset_pass_description')}`,
      });
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
            <Form.Item label={<span></span>}>
              <Button type="primary" htmlType="submit" className="submitBtn authSpan">
                {t('reset_pass_menu_label')}
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </div>
    </motion.div>
  );
}

export default ResetPassword;
