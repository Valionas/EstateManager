import React from 'react';
import { useEffect, useState } from 'react';

import { Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
var update = false;

export const showConfirmationModal = (message, onResponse) => {
  update = !update; //FORCE MODAL RENDER

  const response = (answer) => {
    onResponse(answer);
  };

  import('react-dom').then(({ default: ReactDOM }) => {
    ReactDOM.render(
      <ConfirmationModal update={update} response={response} message={message} />,
      document.getElementById('confirmation-modal')
    );
  });
};

function ConfirmationModal(props) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, [props.update]);

  const handleOk = () => {
    setShowModal(false);
    props.response(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    props.response(false);
  };

  return (
    <Modal
      open={showModal}
      title={t('confirmation')}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
      ]}
    >
      <p>{props.message}</p>
    </Modal>
  );
}

export default ConfirmationModal;
