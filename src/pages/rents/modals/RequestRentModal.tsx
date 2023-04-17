import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  closeRequestRentModal,
  setCurrentRent,
  setUpdatePage,
} from '../../../store/slices/rentSlice';

import { AiOutlineUpload } from 'react-icons/ai';

import { Space, Table, Tag, Row, Modal, Button, Form, Input, Select, Upload } from 'antd';

import {
  addRequest,
  getRentRequestById,
  updateRequest,
} from '../../../services/rent-requests-service';
import { addMessage, updateMessage } from '../../../services/messages-service';
import { updateRent } from '../../../services/rents-service';
import { ReduxState } from '../../../store';
import React from 'react';
import RentRequest from '../../../models/rents/RentRequest';
import Message from '../../../models/messages/Message';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
function RequestRentModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isOpened = useSelector((state: ReduxState) => state.rent.isOpenedRequestRentModal);
  const currentUser = useSelector((state: ReduxState) => state.auth.currentUser);
  const currentRent = useSelector((state: ReduxState) => state.rent.currentRent);
  const currentRentRequest = useSelector((state: ReduxState) => state.rent.currentRentRequest);

  const [fields, setFields] = useState<{ name: string[]; value: any }[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentRentRequest) {
      setFields([
        {
          name: ['message'],
          value: currentRentRequest.message,
        },
      ]);
    }
  }, [currentRentRequest]);

  const onCancelHandler = () => {
    dispatch(closeRequestRentModal());
  };

  const onFinish = async (values) => {
    if (!currentRentRequest && currentRent) {
      //Generate request for rent owner
      let requestObject: RentRequest = {
        rentId: currentRent.id,
        image: currentRent.image,
        rentName: currentRent.name,
        location: currentRent.location,
        renter: currentUser.email!,
        rent: Number(currentRent.rent),
        message: values.message,
        date: format(new Date(), 'dd-mm-yyyy HH:mm'),
        owner: currentRent.owner,
      };

      //Generate message for renter
      let messageObject: Message = {
        relatedObjectId: currentRent.id,
        image: currentRent.image,
        name: currentRent.name,
        location: currentRent.location,
        receiver: currentRent.owner,
        sender: currentUser.email!,
        rent: Number(currentRent.rent),
        type: 'rent',
        date: format(new Date(), 'dd-mm-yyyy HH:mm'),
        message: values.message,
        status: 'Pending',
      };

      let updatedRent = { ...currentRent };
      let copyArr = [...updatedRent.applicants];
      copyArr.push(currentUser.email!);
      updatedRent.applicants = copyArr;

      try {
        const result = await addRequest(requestObject);
        messageObject.relatedOfferId = result.id;
        await addMessage(messageObject);
        await updateRent(updatedRent, updatedRent.id);
        dispatch(setUpdatePage());
        dispatch(setCurrentRent({}));
        dispatch(closeRequestRentModal());
        form.resetFields();
      } catch (err) {
        console.log(err);
      }
    } else {
      let currentMessage = { ...currentRentRequest };
      currentMessage.message = values.message;
      try {
        await updateMessage(currentMessage, currentMessage.id);
        let rentRequestToUpdate = await getRentRequestById(currentMessage.relatedOfferId);
        if (rentRequestToUpdate) {
          rentRequestToUpdate.message = values.message;
          await updateRequest(rentRequestToUpdate, rentRequestToUpdate.id);
          dispatch(setUpdatePage());
          dispatch(setCurrentRent({}));
          dispatch(closeRequestRentModal());
          form.resetFields();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title={t('rent_request_header')}
      visible={isOpened}
      onOk={() => form.submit()}
      onCancel={onCancelHandler}
    >
      <Form
        form={form}
        fields={fields}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={t('rent_request_modal_message')}
          name="message"
          rules={[
            {
              required: true,
              message: `${t('rent_request_message_required')}`,
            },
            {
              min: 10,
              message: `${t('rent_request_message_short')}`,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default RequestRentModal;
